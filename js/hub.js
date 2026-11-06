(function () {
  var HI = document.documentElement.lang === 'hi';
  var T = function (hi, en) { return HI ? hi : en; };
  var $ = function (id) { return document.getElementById(id); };
  function wmo(c) {
    if (c === 0) return T('साफ आसमान', 'Clear sky');
    if (c <= 2) return T('आंशिक बादल', 'Partly cloudy');
    if (c === 3) return T('बादल छाए', 'Overcast');
    if (c === 45 || c === 48) return T('कोहरा', 'Fog');
    if (c >= 51 && c <= 57) return T('हल्की फुहार', 'Drizzle');
    if (c >= 61 && c <= 67) return T('बारिश', 'Rain');
    if (c >= 80 && c <= 82) return T('बौछारें', 'Showers');
    if (c >= 95) return T('आंधी-बिजली', 'Thunderstorm');
    return T('बदलता मौसम', 'Changing weather');
  }
  function day(iso, i) {
    if (i === 0) return T('आज', 'Today');
    if (i === 1) return T('कल', 'Tomorrow');
    var d = new Date(iso + 'T00:00:00');
    var hi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    var en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (HI ? hi : en)[d.getDay()] + ' ' + d.getDate();
  }
  function fail() {
    $('hub-now').innerHTML = '<p class="hub-err">' + T('लाइव डेटा अभी उपलब्ध नहीं है। कृपया कुछ देर बाद पुनः देखें, या नीचे दिए आधिकारिक स्रोत देखें।', 'Live data is unavailable right now. Please try again shortly, or use the official sources below.') + '</p>';
  }
  fetch('/api/hub').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
    var c = d.current;
    $('hub-now').innerHTML =
      '<div class="hub-temp">' + Math.round(c.temperature_2m) + '°C</div>' +
      '<div class="hub-cond"><strong>' + wmo(c.weather_code) + '</strong><br>' +
      T('नमी ', 'Humidity ') + c.relative_humidity_2m + '% &middot; ' + T('हवा ', 'Wind ') + Math.round(c.wind_speed_10m) + ' km/h<br>' +
      T('अभी बारिश: ', 'Rain now: ') + c.precipitation + ' mm</div>';
    var dd = d.daily, h = '';
    for (var i = 0; i < dd.time.length; i++) {
      var heavy = dd.rain[i] >= 20 ? ' hub-heavy' : (dd.rain[i] >= 5 ? ' hub-wet' : '');
      h += '<div class="hub-day' + heavy + '"><b>' + day(dd.time[i], i) + '</b><span>' + Math.round(dd.tmax[i]) + '° / ' + Math.round(dd.tmin[i]) + '°</span><span>' + wmo(dd.code[i]) + '</span><span class="hub-rain">' + Math.round(dd.rain[i] * 10) / 10 + ' mm &middot; ' + (dd.prob[i] == null ? '-' : dd.prob[i]) + '%</span></div>';
    }
    $('hub-days').innerHTML = h;
    var w = d.watch, lv = { low: [T('कम', 'LOW'), 'hub-low'], moderate: [T('मध्यम — सतर्क रहें', 'MODERATE — stay alert'), 'hub-mod'], high: [T('अधिक — सावधान', 'HIGH — be careful'), 'hub-high'] }[w.level];
    var rows = '<tr><td>' + T('उदाकिशुनगंज (स्थानीय)', 'Udakishunganj (local)') + '</td><td>' + w.localPast3 + ' mm</td><td>' + w.localNext3 + ' mm</td></tr>';
    w.upstream.forEach(function (u) { rows += '<tr><td>' + T('नेपाल ऊपरी क्षेत्र: ', 'Upstream Nepal: ') + u.name + '</td><td>' + u.past3 + ' mm</td><td>' + u.next3 + ' mm</td></tr>'; });
    $('hub-watch').innerHTML =
      '<div class="hub-level ' + lv[1] + '">' + T('बारिश आधारित बाढ़ जोखिम संकेत: ', 'Rain-based flood watch: ') + '<strong>' + lv[0] + '</strong></div>' +
      '<table class="compare"><thead><tr><th>' + T('क्षेत्र', 'Area') + '</th><th>' + T('पिछले 3 दिन', 'Past 3 days') + '</th><th>' + T('अगले 3 दिन', 'Next 3 days') + '</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<p class="hub-fine">' + T('यह केवल बारिश के पूर्वानुमान पर आधारित अनुमानित संकेत है, आधिकारिक बाढ़ चेतावनी नहीं। नदी का वास्तविक जलस्तर नीचे दिए आधिकारिक स्रोतों पर देखें।', 'This is an indicative signal based only on rainfall forecasts, not an official flood warning. Check actual river levels on the official sources below.') + '</p>';
    var n3 = w.localNext3, adv;
    if (n3 >= 40) adv = T('भारी बारिश संभव: कटी फसल, अनाज व पशुओं को ऊंची सुरक्षित जगह रखें, जरूरी कागजात वॉटरप्रूफ बैग में रखें, नदी किनारे न जाएं।', 'Heavy rain likely: move harvested crop, grain and livestock to high ground, keep documents in a waterproof bag, stay away from river banks.');
    else if (n3 >= 20) adv = T('अच्छी बारिश संभव: सिंचाई रोकें, खेत की जल-निकासी जांचें, अनाज व भूसा ढककर ऊंचाई पर रखें।', 'Good rain likely: pause irrigation, check field drainage, keep grain and fodder covered and raised.');
    else if (n3 >= 2) adv = T('हल्की बारिश संभव: कटी फसल ढककर रखें और छिड़काव टालें।', 'Light rain possible: cover harvested produce and postpone spraying.');
    else adv = T('अगले 3 दिन मौसम काफी सूखा: कटाई, सुखाई व छिड़काव के लिए अनुकूल।', 'Mostly dry for the next 3 days: good for harvesting, drying and spraying.');
    $('hub-farm').innerHTML = '<p>' + adv + '</p>';
    $('hub-stamp').textContent = T('अपडेट: ', 'Updated: ') + String(d.updated).replace('T', ' ') + ' IST';
    if (window.gtag) gtag('event', 'hub_view', { level: w.level });
  }).catch(fail);
})();
