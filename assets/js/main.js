/* Bright Start Medical Training: site script.
   1. HHA class dates (edit COHORTS below; past classes hide themselves)
   2. Mobile menu and the Programs dropdown
   3. Simple forms (contact, CNA waitlist, group CPR request) */

(function () {
  'use strict';

  /* ---------- 1. HHA class dates ----------
     One line per cohort, copied from the School Catalogue (section 13).
     start/end are YYYY-MM-DD. A class disappears from the site the day it starts. */
  var COHORTS = [
    { start: '2026-11-30', end: '2026-12-18' },
    { start: '2026-12-28', end: '2027-01-19' },
    { start: '2027-01-25', end: '2027-02-12' },
    { start: '2027-02-22', end: '2027-03-12' },
    { start: '2027-03-22', end: '2027-04-09' },
    { start: '2027-04-19', end: '2027-05-07' },
    { start: '2027-05-17', end: '2027-06-07' },
    { start: '2027-06-14', end: '2027-07-06' },
    { start: '2027-07-12', end: '2027-07-30' },
    { start: '2027-08-09', end: '2027-08-27' },
    { start: '2027-09-07', end: '2027-09-27' },
    { start: '2027-10-04', end: '2027-10-25' },
    { start: '2027-11-01', end: '2027-11-22' },
    { start: '2027-11-29', end: '2027-12-17' }
  ];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function short(d) { return MONTHS[d.getMonth()] + ' ' + d.getDate(); }
  function range(c) {
    var a = parse(c.start), b = parse(c.end);
    if (a.getFullYear() === b.getFullYear()) return short(a) + ' to ' + short(b) + ', ' + b.getFullYear();
    return short(a) + ', ' + a.getFullYear() + ' to ' + short(b) + ', ' + b.getFullYear();
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }

  var today = new Date(); today.setHours(0, 0, 0, 0);
  var upcoming = COHORTS.filter(function (c) { return parse(c.start) > today; });

  // Lists: <ul data-cohorts="list" data-limit="3">
  document.querySelectorAll('[data-cohorts="list"]').forEach(function (el) {
    var limit = +el.getAttribute('data-limit') || upcoming.length;
    if (!upcoming.length) { el.innerHTML = '<li><strong>New dates coming soon</strong><span>Call 302-307-3939 to hear first.</span></li>'; return; }
    el.innerHTML = upcoming.slice(0, limit).map(function (c) {
      var a = parse(c.start), b = parse(c.end);
      var yrs = a.getFullYear() === b.getFullYear() ? a.getFullYear() : a.getFullYear() + ' to ' + b.getFullYear();
      return '<li><strong>' + short(a) + ' to ' + short(b) + '</strong><span>' + yrs + '</span></li>';
    }).join('');
  });

  // Table rows: <tbody data-cohorts="table">
  document.querySelectorAll('[data-cohorts="table"]').forEach(function (el) {
    if (!upcoming.length) return;
    el.innerHTML = upcoming.map(function (c) {
      var a = parse(c.start);
      return '<tr><td class="strong">' + esc(range(c)) + '</td><td>Starts ' + DAYS[a.getDay()] + '. Mon to Fri, 8:30 AM to 3:00 PM</td><td>Claymont Community Center</td></tr>';
    }).join('');
  });

  // Next start date text: <span data-cohorts="next">
  document.querySelectorAll('[data-cohorts="next"]').forEach(function (el) {
    if (!upcoming.length) return;
    var a = parse(upcoming[0].start);
    el.textContent = el.getAttribute('data-format') === 'short'
      ? DAYS[a.getDay()].slice(0, 3) + ', ' + short(a)
      : DAYS[a.getDay()] + ', ' + MONTHS_LONG[a.getMonth()] + ' ' + a.getDate();
  });

  // Photos: a box with data-photo shows that image as soon as the file exists.
  document.querySelectorAll('.ph[data-photo]').forEach(function (el) {
    var src = el.getAttribute('data-photo');
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = 'url("' + src + '")'; el.classList.add('has-photo'); };
    img.src = src;
  });

  /* ---------- 2. Menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.nav-sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (!li.contains(e.target)) { li.classList.remove('open'); li.querySelector('.nav-sub-toggle').setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.has-sub.open').forEach(function (li) { li.classList.remove('open'); li.querySelector('.nav-sub-toggle').setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- 3. Forms ----------
     Each form posts to the address in its data-endpoint attribute (for example a
     Formspree or Jotform form URL). Until one is set, the form tells the visitor
     to email or call instead, and offers a ready-made email with their answers. */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var endpoint = form.getAttribute('data-endpoint');
      var subject = form.getAttribute('data-subject') || 'Website message';

      if (endpoint) {
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('send failed');
            form.reset();
            show('Thank you. We received your message and will get back to you within 2 business days.');
          })
          .catch(function () { fallback(); });
      } else {
        fallback();
      }

      function fallback() {
        var lines = [];
        data.forEach(function (v, k) { lines.push(k + ': ' + v); });
        var href = 'mailto:info@brightstart-training.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
        show('Our online form is not connected yet, so nothing was sent. Please <a href="' + href + '">send these details by email</a> to info@brightstart-training.com, or call or text 302-307-3939.', true);
      }
    });
    function show(html, isHtml) {
      if (!status) return;
      status.hidden = false;
      if (isHtml) status.innerHTML = html; else status.textContent = html;
      status.focus();
    }
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
