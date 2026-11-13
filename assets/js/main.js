// Kem Enon portfolio — small progressive enhancements. The site works without JS.
(function () {
  // Mobile menu
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero: gentle parallax that follows the pointer
  var bg = document.querySelector('.hero-bg');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (bg && !reduce && window.matchMedia('(pointer: fine)').matches) {
    var hero = bg.parentElement;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      bg.style.transform = 'translate(' + (x * -16) + 'px,' + (y * -12) + 'px) scale(1.02)';
    });
    hero.addEventListener('mouseleave', function () { bg.style.transform = ''; });
  }

  // Contact form: send without leaving the page
  var form = document.querySelector('#contact-form');
  if (form && window.fetch) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      btn.disabled = true;
      status.textContent = 'Sending…';
      fetch(form.getAttribute('data-ajax'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && String(res.j.success) !== 'false') {
            form.reset();
            status.textContent = 'Thanks! Your message is on its way.';
          } else {
            status.textContent = 'Sorry, that didn’t go through. Please email me directly.';
          }
        })
        .catch(function () { status.textContent = 'Sorry, that didn’t go through. Please email me directly.'; })
        .then(function () { btn.disabled = false; });
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
