(function () {
  var HI = document.documentElement.lang === 'hi';
  var T = function (hi, en) { return HI ? hi : en; };
  var $ = function (id) { return document.getElementById(id); };
  var today = new Date();
  var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  if ($('ac-ason') && !$('ac-ason').value) $('ac-ason').value = iso(today);
  function diff(dob, on) {
    var y = on.getFullYear() - dob.getFullYear(), m = on.getMonth() - dob.getMonth(), d = on.getDate() - dob.getDate();
    if (d < 0) { m--; d += new Date(on.getFullYear(), on.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    return [y, m, d];
  }
  function calc() {
    var dobV = $('ac-dob').value, onV = $('ac-ason').value;
    var max = parseFloat($('ac-max').value), rel = parseFloat($('ac-rel').value || '0');
    var out = $('ac-out');
    if (!dobV || !onV || isNaN(max)) { out.innerHTML = '<p class="chk-empty">' + T('जन्मतिथि, अधिकतम आयु और गणना की तारीख भरें।', 'Fill in date of birth, maximum age and the as-on date.') + '</p>'; return; }
    var dob = new Date(dobV + 'T00:00:00'), on = new Date(onV + 'T00:00:00');
    if (dob > on) { out.innerHTML = '<p class="hub-err">' + T('जन्मतिथि गणना की तारीख के बाद नहीं हो सकती।', 'Date of birth cannot be after the as-on date.') + '</p>'; return; }
    var age = diff(dob, on);
    var limitYears = max + (isNaN(rel) ? 0 : rel);
    var whole = Math.floor(limitYears), frac = limitYears - whole;
    var limitDate = new Date(on.getFullYear() - whole, on.getMonth() - Math.round(frac * 12), on.getDate());
    var ok = dob >= limitDate;
    var msg = T('गणना की तारीख पर आपकी आयु: ', 'Your age on the as-on date: ') + '<strong>' + age[0] + T(' वर्ष ', ' years ') + age[1] + T(' माह ', ' months ') + age[2] + T(' दिन', ' days') + '</strong><br>' +
      T('आपकी लागू अधिकतम सीमा (छूट सहित): ', 'Your applicable maximum limit (with relaxation): ') + '<strong>' + limitYears + T(' वर्ष', ' years') + '</strong><br>';
    out.innerHTML = '<div class="hub-level ' + (ok ? 'hub-low' : 'hub-high') + '">' + msg +
      (ok ? T('आयु के आधार पर आप पात्र दिखते हैं।', 'You appear age-eligible.') : T('आयु सीमा से अधिक दिखती है — विज्ञापन में छूट के नियम दोबारा जांचें।', 'You appear over the age limit — re-check the relaxation rules in the notification.')) + '</div>' +
      '<p class="hub-fine">' + T('यह सामान्य गणना है। हर भर्ती में आयु गणना की तारीख व छूट के नियम अलग हो सकते हैं — अंतिम निर्णय आधिकारिक विज्ञापन (नोटिफिकेशन) के अनुसार ही मान्य है।', 'This is a general calculation. Cut-off dates and relaxation rules differ for each recruitment — the official notification is final.') + '</p>';
    if (window.gtag) gtag('event', 'age_calc', { eligible: ok ? 1 : 0 });
  }
  ['ac-dob', 'ac-ason', 'ac-max', 'ac-rel'].forEach(function (id) { var e = $(id); if (e) { e.addEventListener('input', calc); e.addEventListener('change', calc); } });
  calc();
})();
