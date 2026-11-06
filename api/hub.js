// Vercel serverless function: /api/hub
// Fetches rainfall/weather from Open-Meteo (free, no key) for Udakishunganj and the upstream
// Koshi catchment in eastern Nepal, and returns a compact JSON with an indicative rain-based flood watch.
// Cached at the edge so Open-Meteo is called at most about once every 15 minutes.

const LOCAL = { lat: 25.62, lon: 86.87 };
const UPSTREAM = [
  { name: 'Dharan / Sunsari belt', lat: 26.8, lon: 87.28 },
  { name: 'Sankhuwasabha hills', lat: 27.35, lon: 87.2 }
];

const sum = (a) => a.reduce((x, y) => x + (Number(y) || 0), 0);

module.exports = async (req, res) => {
  try {
    const lats = [LOCAL.lat].concat(UPSTREAM.map((p) => p.lat)).join(',');
    const lons = [LOCAL.lon].concat(UPSTREAM.map((p) => p.lon)).join(',');
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + lats + '&longitude=' + lons +
      '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max' +
      '&timezone=Asia%2FKolkata&past_days=3&forecast_days=8';
    const r = await fetch(url);
    if (!r.ok) throw new Error('upstream ' + r.status);
    const data = await r.json();
    const arr = Array.isArray(data) ? data : [data];
    const local = arr[0];
    const days = local.daily.time;
    // index of today: match the local current date (robust to API offsets), fall back to 3 past days
    const ti = days.indexOf(String(local.current.time).slice(0, 10));
    const t0 = ti >= 3 ? ti : 3;
    const localNext3 = sum(local.daily.precipitation_sum.slice(t0, t0 + 3));
    const localPast3 = sum(local.daily.precipitation_sum.slice(t0 - 3, t0));
    const up = arr.slice(1).map((d, i) => ({
      name: UPSTREAM[i].name,
      past3: Math.round(sum(d.daily.precipitation_sum.slice(t0 - 3, t0))),
      next3: Math.round(sum(d.daily.precipitation_sum.slice(t0, t0 + 3)))
    }));
    const upMax = Math.max.apply(null, up.map((u) => u.past3 + u.next3).concat([0]));
    // Indicative heuristic (NOT an official warning).
    let level = 'low';
    if (upMax >= 150 || localNext3 >= 80) level = 'high';
    else if (upMax >= 70 || localNext3 >= 40) level = 'moderate';

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({
      updated: local.current.time,
      current: local.current,
      daily: {
        time: days.slice(t0, t0 + 7),
        code: local.daily.weather_code.slice(t0, t0 + 7),
        tmax: local.daily.temperature_2m_max.slice(t0, t0 + 7),
        tmin: local.daily.temperature_2m_min.slice(t0, t0 + 7),
        rain: local.daily.precipitation_sum.slice(t0, t0 + 7),
        prob: local.daily.precipitation_probability_max.slice(t0, t0 + 7)
      },
      watch: {
        level: level,
        localPast3: Math.round(localPast3),
        localNext3: Math.round(localNext3),
        upstream: up
      }
    });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(502).json({ error: 'data_unavailable' });
  }
};
