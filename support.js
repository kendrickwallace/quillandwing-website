/* Quill & Wing — the Support dialog. Posts the letter to Formspree (no backend here). */
(function () {
  'use strict';
  var dialog = document.getElementById('support-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var form = document.getElementById('support-form');
  var sent = document.getElementById('support-sent');
  var error = document.getElementById('support-error');
  var submit = document.getElementById('support-submit');
  var email = document.getElementById('support-email');
  var replyto = document.getElementById('support-replyto');

  function open() {
    form.hidden = false;
    sent.hidden = true;
    error.hidden = true;
    dialog.showModal();
    var first = form.querySelector('input[name=name]');
    if (first) first.focus();
  }
  function close() { dialog.close(); }

  Array.prototype.forEach.call(document.querySelectorAll('[data-support]'), function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-support-close]'), function (b) {
    b.addEventListener('click', close);
  });
  // A click on the dimmed backdrop closes the dialog; Escape already does.
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

  // The privacy policy: the footer link opens it as a window here; the same text
  // lives at privacy.html for anyone who needs a plain URL (or has no JavaScript).
  var privacy = document.getElementById('privacy-dialog');
  if (privacy && typeof privacy.showModal === 'function') {
    var openPrivacy = function () { privacy.showModal(); privacy.querySelector('.support-inner').scrollTop = 0; };
    Array.prototype.forEach.call(document.querySelectorAll('[data-privacy]'), function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); openPrivacy(); });
    });
    Array.prototype.forEach.call(privacy.querySelectorAll('[data-dialog-close]'), function (b) {
      b.addEventListener('click', function () { privacy.close(); });
    });
    privacy.addEventListener('click', function (e) { if (e.target === privacy) privacy.close(); });
    if (location.hash === '#privacy') openPrivacy();
  }

  email.addEventListener('input', function () { replyto.value = email.value; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    error.hidden = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('formspree ' + res.status);
        form.reset();
        form.hidden = true;
        sent.hidden = false;
      })
      .catch(function () { error.hidden = false; })
      .then(function () {
        submit.disabled = false;
        submit.textContent = 'Send the letter';
      });
  });
})();
