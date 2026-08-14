/* Theme toggle + small page helpers. */
(function () {
  'use strict';

  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function stored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-theme') || 'light');

    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
      });
    }

    // Follow the system setting until the visitor picks a theme explicitly.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        if (!stored()) { apply(e.matches ? 'dark' : 'light'); }
      };
      if (mq.addEventListener) { mq.addEventListener('change', onChange); }
      else if (mq.addListener) { mq.addListener(onChange); }
    }

    // Current year in the footer.
    var year = document.getElementById('year');
    if (year) { year.textContent = new Date().getFullYear(); }

    // Mark the active nav item.
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav__links a').forEach(function (a) {
      if (a.getAttribute('href') === here) { a.setAttribute('aria-current', 'page'); }
    });
  });
})();
