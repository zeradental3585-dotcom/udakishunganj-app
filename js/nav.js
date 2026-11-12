document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.site');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close the menu if the viewport is resized back to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 640 && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
});

/* WhatsApp share button on every page (distribution) */
(function () {
  var hi = document.documentElement.lang === 'hi';
  var can = document.querySelector('link[rel="canonical"]');
  var url = can ? can.href : location.href;
  var msg = document.title.split(' | ')[0] + '\n' + url;
  var a = document.createElement('a');
  a.className = 'wa-fab';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  a.setAttribute('aria-label', hi ? 'WhatsApp पर शेयर करें' : 'Share on WhatsApp');
  a.textContent = hi ? 'WhatsApp पर शेयर करें' : 'Share on WhatsApp';
  a.addEventListener('click', function () { if (window.gtag) gtag('event', 'share_whatsapp', { page: location.pathname }); });
  document.body.appendChild(a);
})();

/* Engagement tracking: outbound official-portal clicks, scroll depth, key events */
(function () {
  if (!window.gtag) return;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !a.hostname || a.hostname === location.hostname) return;
    gtag('event', 'outbound_click', { link_domain: a.hostname, page: location.pathname });
    if (/\.(gov|nic)\.in$|\.ac\.in$/.test(a.hostname)) gtag('event', 'official_portal_click', { link_domain: a.hostname, page: location.pathname });
  });
  var marks = { 50: false, 90: false };
  window.addEventListener('scroll', function () {
    var h = document.documentElement, pct = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
    [50, 90].forEach(function (m) { if (!marks[m] && pct >= m) { marks[m] = true; gtag('event', 'scroll_depth', { percent: m, page: location.pathname }); } });
  }, { passive: true });
})();
