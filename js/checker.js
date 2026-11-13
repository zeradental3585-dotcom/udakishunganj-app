(function () {
  var HI = document.documentElement.lang === 'hi';
  var A = HI ? '/articles/' : '/en/articles/';
  var Q = [
    ['farm', 'खेती की जमीन', 'Farmland', 'हमारे परिवार के नाम खेती की जमीन है', 'Our family owns farmland'],
    ['tenant', 'बटाईदार', 'Tenant farmer', 'मैं बटाई/किराये पर खेती करता/करती हूं', 'I farm on lease / sharecropping'],
    ['taxgov', 'आयकर/सरकारी नौकरी', 'Income tax / govt job', 'परिवार में कोई आयकर देता है या सरकारी कर्मचारी है', 'Someone in the family pays income tax or is a govt employee'],
    ['noration', 'राशन कार्ड नहीं', 'No ration card', 'हमारे पास बिहार का राशन कार्ड नहीं है', 'We do not have a Bihar ration card'],
    ['ration', 'राशन कार्ड है', 'Ration card', 'हमारे पास राशन कार्ड है', 'We have a ration card'],
    ['kutcha', 'कच्चा मकान', 'Kutcha house', 'गांव में कच्चा मकान है या घर नहीं है', 'We live in a kutcha house or have no house (rural)'],
    ['age60', '60+ आयु', 'Age 60+', 'परिवार में कोई 60 वर्ष या उससे अधिक का है', 'Someone in the family is 60 or older'],
    ['widow', 'विधवा', 'Widow', 'परिवार में विधवा महिला हैं', 'There is a widow in the family'],
    ['disabled', 'दिव्यांग', 'Disability', 'दिव्यांगता प्रमाण पत्र (40% या अधिक) है', 'Disability certificate (40% or more)'],
    ['girl', 'बेटी', 'Daughter', 'घर में बेटी है (जन्म से स्नातक तक की पढ़ाई)', 'We have a daughter (birth up to graduation)'],
    ['student', 'छात्र (SC/ST/OBC/EBC)', 'Student (SC/ST/OBC/EBC)', 'कक्षा 11 या उससे ऊपर का छात्र/छात्रा, वर्ग SC/ST/OBC/EBC', 'Student in class 11 or above, category SC/ST/OBC/EBC'],
    ['worker', 'असंगठित मजदूर', 'Unorganised worker', 'आयु 16-59, मजदूरी/ठेला/रिक्शा जैसा काम, EPFO/ESIC सदस्य नहीं', 'Age 16-59, daily wage/rickshaw type work, not in EPFO/ESIC'],
    ['rural', 'ग्रामीण वयस्क', 'Rural adult', 'मैं गांव में रहने वाला 18+ वयस्क हूं', 'I am an adult (18+) living in a village'],
    ['woman', 'महिला (18-60)', 'Woman (18-60)', 'मैं बिहार की 18 से 60 वर्ष की महिला हूं', 'I am a woman of Bihar aged 18 to 60'],
    ['lpg', 'एलपीजी नहीं', 'No LPG', 'हमारे घर में एलपीजी गैस कनेक्शन नहीं है', 'We do not have an LPG gas connection at home'],
    ['artisan', 'पारंपरिक कारीगर', 'Traditional artisan', 'मैं पारंपरिक कारीगर हूं (बढ़ई, लोहार, राजमिस्त्री, कुम्हार, मोची, दर्जी आदि)', 'I am a traditional artisan (carpenter, blacksmith, mason, potter, cobbler, tailor, etc.)'],
    ['construction', 'निर्माण मजदूर', 'Construction worker', 'मैं भवन/निर्माण कार्य का मजदूर हूं', 'I work as a building/construction worker'],
    ['power', 'घरेलू बिजली कनेक्शन', 'Home electricity', 'हमारे घर का अपने नाम पर घरेलू बिजली कनेक्शन है', 'We have a domestic electricity connection in our name'],
    ['house', 'अपना घर/छत', 'Own house with roof', 'अपना पक्का घर है जिसकी छत पर सोलर लग सकता है', 'We own a house whose roof can take solar panels']
  ];
  var D = {
    aadhaar: ['आधार कार्ड', 'Aadhaar card'],
    bank: ['बैंक पासबुक (आधार-लिंक्ड)', 'Bank passbook (Aadhaar-linked)'],
    mobile: ['आधार से लिंक मोबाइल नंबर', 'Aadhaar-linked mobile number'],
    land: ['जमीन का रिकॉर्ड (जमाबंदी/खाता-खेसरा)', 'Land record (jamabandi / khata-khesra)'],
    sow: ['बुवाई प्रमाण पत्र', 'Sowing certificate'],
    ration: ['राशन कार्ड', 'Ration card'],
    income: ['आय प्रमाण पत्र', 'Income certificate'],
    caste: ['जाति प्रमाण पत्र', 'Caste certificate'],
    resid: ['निवास प्रमाण पत्र', 'Residence certificate'],
    photo: ['पासपोर्ट साइज फोटो', 'Passport-size photo'],
    birth: ['जन्म प्रमाण पत्र (बेटी का)', "Daughter's birth certificate"],
    school: ['स्कूल/कॉलेज नामांकन प्रमाण', 'School/college enrolment proof'],
    marks: ['नवीनतम मार्कशीट', 'Latest marksheet'],
    death: ['पति का मृत्यु प्रमाण पत्र', "Husband's death certificate"],
    disab: ['दिव्यांगता प्रमाण पत्र', 'Disability certificate'],
    bill: ['बिजली बिल / उपभोक्ता नंबर', 'Electricity bill / consumer number']
  };
  var S = [
    { id: 'pmkisan', hi: 'पीएम किसान सम्मान निधि', en: 'PM Kisan Samman Nidhi', ben: ['₹6,000 प्रति वर्ष, तीन किस्तों में', '₹6,000 per year in three installments'], need: function (a) { return a.farm && !a.taxgov; }, docs: ['aadhaar', 'bank', 'mobile', 'land'], url: 'https://pmkisan.gov.in', page: 'pm-kisan-samman-nidhi-status-ekyc-udakishunganj-madhepura.html' },
    { id: 'pmfby', hi: 'प्रधानमंत्री फसल बीमा योजना', en: 'PM Fasal Bima Yojana', ben: ['बाढ़/सूखे से फसल नुकसान पर मुआवजा, किसान का प्रीमियम केवल 1.5%-5%', 'Crop-loss cover for flood/drought; farmer premium only 1.5%-5%'], need: function (a) { return a.farm || a.tenant; }, docs: ['aadhaar', 'bank', 'land', 'sow'], url: 'https://pmfby.gov.in', page: 'pradhan-mantri-fasal-bima-yojana-pmfby-madhepura-udakishunganj.html' },
    { id: 'ration', hi: 'नया राशन कार्ड', en: 'New ration card', ben: ['सस्ता राशन व अन्य योजनाओं की चाबी', 'Subsidised grain and the key to other schemes'], need: function (a) { return a.noration; }, docs: ['aadhaar', 'income', 'resid', 'photo'], url: 'https://epds.bihar.gov.in', page: 'bihar-ration-card-apply-online-udakishunganj-madhepura.html' },
    { id: 'ayushman', hi: 'आयुष्मान भारत (PMJAY)', en: 'Ayushman Bharat (PMJAY)', ben: ['प्रति परिवार प्रति वर्ष ₹5 लाख तक मुफ्त इलाज', 'Free treatment up to ₹5 lakh per family per year'], need: function (a) { return a.ration; }, docs: ['aadhaar', 'ration', 'mobile'], url: 'https://pmjay.gov.in', page: 'ayushman-bharat-pmjay-health-card-udakishunganj-madhepura.html' },
    { id: 'pmay', hi: 'पीएम आवास योजना (ग्रामीण)', en: 'PM Awas Yojana (Gramin)', ben: ['पक्का मकान बनाने के लिए सहायता (3 किस्तों में)', 'Financial help to build a pucca house (3 installments)'], need: function (a) { return a.kutcha; }, docs: ['aadhaar', 'bank', 'ration'], url: 'https://pmayg.nic.in', page: 'pm-awas-yojana-gramin-status-udakishunganj-madhepura.html', note: ['नया आवेदन सीधे पोर्टल पर नहीं होता — पंचायत के आवास सहायक से मिलें।', 'New applications are not made directly on the portal — meet the panchayat Awas Sahayak.'] },
    { id: 'pension', hi: 'सामाजिक सुरक्षा पेंशन (वृद्धजन/विधवा/दिव्यांग)', en: 'Social Security Pension (old age / widow / disability)', ben: ['₹1,100 प्रति माह सीधे बैंक खाते में', '₹1,100 per month directly in the bank account'], need: function (a) { return a.age60 || a.widow || a.disabled; }, docs: ['aadhaar', 'bank', 'resid'], extra: function (a) { var x = []; if (a.widow) x.push('death'); if (a.disabled) x.push('disab'); return x; }, url: 'https://sspmis.bihar.gov.in', page: 'bihar-old-age-widow-disability-pension-udakishunganj-madhepura.html' },
    { id: 'kanya', hi: 'मुख्यमंत्री कन्या उत्थान योजना', en: 'Mukhyamantri Kanya Utthan Yojana', ben: ['जन्म से स्नातक तक चरणबद्ध सहायता (स्नातक पर ₹25,000 तक)', 'Stage-wise help from birth to graduation (up to ₹25,000 at graduation)'], need: function (a) { return a.girl; }, docs: ['birth', 'school', 'bank', 'aadhaar'], url: 'https://edudbt.bih.nic.in', page: 'mukhyamantri-kanya-utthan-yojana-bihar-udakishunganj-madhepura.html' },
    { id: 'pms', hi: 'पोस्ट मैट्रिक छात्रवृत्ति', en: 'Post-Matric Scholarship', ben: ['ट्यूशन फीस व रखरखाव भत्ता', 'Tuition fee and maintenance allowance'], need: function (a) { return a.student; }, docs: ['aadhaar', 'bank', 'income', 'caste', 'marks'], url: 'https://pmsonline.bihar.gov.in', page: 'bihar-post-matric-scholarship-students-udakishunganj-madhepura.html', note: ['पहले scholarships.gov.in पर रजिस्ट्रेशन जरूरी; हर साल अंतिम तिथि तय होती है।', 'Register first at scholarships.gov.in; a deadline applies every year.'] },
    { id: 'eshram', hi: 'ई-श्रम कार्ड', en: 'e-Shram Card', ben: ['₹2 लाख तक दुर्घटना बीमा व कई योजनाओं से जुड़ाव', 'Accident cover up to ₹2 lakh and access to many schemes'], need: function (a) { return a.worker; }, docs: ['aadhaar', 'mobile', 'bank'], url: 'https://eshram.gov.in', page: 'e-shram-card-registration-unorganised-workers-udakishunganj-madhepura.html' },
    { id: 'mgnrega', hi: 'मनरेगा जॉब कार्ड', en: 'MGNREGA Job Card', ben: ['साल में 100 दिन तक का काम (मजदूरी सीधे खाते में)', 'Up to 100 days of work a year (wages paid to bank account)'], need: function (a) { return a.rural; }, docs: ['aadhaar', 'bank', 'photo', 'resid'], url: 'https://nrega.nic.in', page: 'mgnrega-job-card-apply-udakishunganj-madhepura.html' },
    { id: 'mmry', hi: 'मुख्यमंत्री महिला रोजगार योजना', en: 'Mukhyamantri Mahila Rojgar Yojana', ben: ['रोजगार शुरू करने के लिए ₹10,000 की शुरुआती सहायता', '₹10,000 starting grant to begin a livelihood'], need: function (a) { return a.woman; }, docs: ['aadhaar', 'bank', 'resid', 'photo'], url: 'https://www.brlps.in', page: 'mukhyamantri-mahila-rojgar-yojana-bihar-10000-apply-jeevika.html', note: ['आवेदन आमतौर पर जीविका समूह के जरिए; सही लिंक जीविका से लें।', 'Usually applied through a JEEViKA group; get the correct link from JEEViKA.'] },
    { id: 'ujjwala', hi: 'पीएम उज्ज्वला योजना (मुफ्त एलपीजी)', en: 'PM Ujjwala Yojana (free LPG)', ben: ['जमा-राशि रहित एलपीजी कनेक्शन (गरीब परिवार की महिला के नाम)', 'Deposit-free LPG connection (in the name of a woman from a poor household)'], need: function (a) { return a.woman && a.lpg; }, docs: ['aadhaar', 'ration', 'bank', 'photo'], url: 'https://www.pmuy.gov.in', page: 'pm-ujjwala-yojana-free-lpg-connection-apply-madhepura.html' },
    { id: 'labour', hi: 'बिहार लेबर कार्ड (BOCW)', en: 'Bihar Labour Card (BOCW)', ben: ['निर्माण मजदूरों के लिए कल्याण योजनाओं से जुड़ाव', 'Access to welfare schemes for construction workers'], need: function (a) { return a.construction; }, docs: ['aadhaar', 'photo', 'resid', 'bank'], url: 'https://bocw.bihar.gov.in', page: 'bihar-labour-card-bocw-registration-benefits-madhepura.html' },
    { id: 'vishwakarma', hi: 'पीएम विश्वकर्मा योजना', en: 'PM Vishwakarma Yojana', ben: ['₹15,000 टूलकिट ई-वाउचर, प्रशिक्षण वजीफा व ₹3 लाख तक सस्ता लोन', '₹15,000 toolkit e-voucher, training stipend and cheap loan up to ₹3 lakh'], need: function (a) { return a.artisan; }, docs: ['aadhaar', 'bank', 'mobile'], url: 'https://pmvishwakarma.gov.in', page: 'pm-vishwakarma-yojana-artisans-loan-toolkit-madhepura.html', note: ['पंजीकरण नजदीकी CSC से।', 'Register through a nearby CSC.'] },
    { id: 'dbtagri', hi: 'बिहार कृषि DBT पोर्टल (किसान पंजीकरण व अनुदान)', en: 'Bihar Agriculture DBT Portal (farmer registration & subsidies)', ben: ['कृषि यंत्र, इनपुट व अन्य अनुदान योजनाओं के लिए पंजीकरण', 'Registration for farm machinery, input and other subsidy schemes'], need: function (a) { return a.farm; }, docs: ['aadhaar', 'bank', 'land', 'mobile'], url: 'https://dbtagriculture.bihar.gov.in', page: 'bihar-dbt-agriculture-portal-farmer-registration-subsidy-madhepura.html' },
    { id: 'power', hi: '125 यूनिट मुफ्त बिजली', en: '125 units free electricity', ben: ['घरेलू उपभोक्ता को 125 यूनिट तक मुफ्त; आमतौर पर अलग आवेदन नहीं', 'Up to 125 free units for domestic consumers; usually no separate application'], need: function (a) { return a.power; }, docs: ['bill'], url: 'https://nbpdcl.co.in', page: 'bihar-125-unit-free-electricity-nbpdcl-zero-bill-madhepura.html' },
    { id: 'surya', hi: 'पीएम सूर्य घर (रूफटॉप सोलर)', en: 'PM Surya Ghar (rooftop solar)', ben: ['₹78,000 तक सब्सिडी, 300 यूनिट तक मुफ्त बिजली', 'Subsidy up to ₹78,000, up to 300 free units'], need: function (a) { return a.house; }, docs: ['aadhaar', 'bank', 'bill'], url: 'https://pmsuryaghar.gov.in', page: 'pm-surya-ghar-rooftop-solar-subsidy-bihar-udakishunganj-madhepura.html' }
  ];
  var L = function (p) { return HI ? p[0] : p[1]; };
  var form = document.getElementById('chk-form');
  var out = document.getElementById('chk-out');
  form.innerHTML = Q.map(function (q) {
    return '<label class="chk-opt"><input type="checkbox" value="' + q[0] + '"><span>' + (HI ? q[3] : q[4]) + '</span></label>';
  }).join('');
  var picked = {};
  function run() {
    var a = {};
    form.querySelectorAll('input').forEach(function (i) { a[i.value] = i.checked; });
    var hits = S.filter(function (s) { return s.need(a); });
    if (!Object.keys(a).some(function (k) { return a[k]; })) {
      out.innerHTML = '<p class="chk-empty">' + (HI ? 'ऊपर अपनी स्थिति चुनें — आपके लिए योजनाएं यहां दिखेंगी।' : 'Tick your situation above — matching schemes will appear here.') + '</p>';
      return;
    }
    var docs = [];
    hits.forEach(function (s) {
      (s.docs.concat(s.extra ? s.extra(a) : [])).forEach(function (d) { if (docs.indexOf(d) < 0) docs.push(d); });
    });
    var html = '<h2>' + (HI ? 'आपके लिए ' + hits.length + ' योजनाएं मिलीं' : hits.length + ' schemes may apply to you') + '</h2>';
    if (!hits.length) html += '<p>' + (HI ? 'कोई मेल नहीं मिला — कुछ और विकल्प चुनकर देखें।' : 'No match yet — try ticking more options.') + '</p>';
    hits.forEach(function (s) {
      html += '<div class="chk-card"><h3>' + L([s.hi, s.en]) + '</h3><p class="chk-ben">' + L(s.ben) + '</p>' +
        (s.note ? '<p class="chk-note">' + L(s.note) + '</p>' : '') +
        '<p><a href="' + A + s.page + '">' + (HI ? 'पूरा गाइड पढ़ें' : 'Read the full guide') + '</a> &middot; <a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + (HI ? 'आधिकारिक पोर्टल' : 'Official portal') + '</a></p></div>';
    });
    if (hits.length) {
      html += '<h2>' + (HI ? 'आपके जरूरी दस्तावेज़ (टिक करते जाएं)' : 'Your document checklist (tick as you collect)') + '</h2><ul class="chk-docs">' +
        docs.map(function (d) { return '<li><label><input type="checkbox"> ' + L(D[d]) + '</label></li>'; }).join('') + '</ul>';
      var names = hits.map(function (s) { return L([s.hi, s.en]); }).join(', ');
      var msg = (HI ? 'मेरे लिए ये सरकारी योजनाएं मिलीं: ' : 'Schemes I may qualify for: ') + names + '\n' + (HI ? 'आप भी चेक करें: ' : 'Check yours: ') + 'https://www.udakishunganj.com' + (HI ? '/yojana-checker.html' : '/en/yojana-checker.html');
      html += '<p class="chk-actions"><a class="chk-btn wa" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=' + encodeURIComponent(msg) + '">' + (HI ? 'WhatsApp पर शेयर करें' : 'Share on WhatsApp') + '</a> <button type="button" class="chk-btn" id="chk-print">' + (HI ? 'प्रिंट / PDF सेव' : 'Print / Save PDF') + '</button></p>';
    }
    out.innerHTML = html;
    var pb = document.getElementById('chk-print');
    if (pb) pb.onclick = function () { window.print(); };
    if (window.gtag) gtag('event', 'checker_result', { schemes: hits.length });
  }
  form.addEventListener('change', run);
  run();
})();
