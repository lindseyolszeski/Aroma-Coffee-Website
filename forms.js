// Wires the contact form to FormSubmit (https://formsubmit.co) — a free
// email-relay service that needs no API key, just an inbox to deliver to.
// IMPORTANT: confirm CONTACT_EMAIL below is the right inbox before launch
// (it was inferred from a conversation, not confirmed directly). The first
// submission after any change here will land a "confirm this form" email
// from FormSubmit — click it once to activate delivery.
var CONTACT_EMAIL = 'aromacoffeesc@gmail.com';

var contactForm = document.querySelector('form[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('.form-submit');
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      // Honeypot: real visitors never fill the hidden "company" field.
      if (contactForm.querySelector('input[name="company"]').value) {
        btn.textContent = 'Message sent — thank you!';
        return;
      }
      var res = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: contactForm.querySelector('input[name="name"]').value,
          email: contactForm.querySelector('input[name="email"]').value,
          message: contactForm.querySelector('textarea[name="message"]').value,
          _subject: 'New message from the Aroma Coffee website',
        }),
      });
      if (!res.ok) throw new Error('contact failed: ' + res.status);
      btn.textContent = 'Message sent — thank you!';
      btn.style.background = 'var(--leather-deep)';
      contactForm.reset();
    } catch (err) {
      btn.disabled = false;
      btn.textContent = original;
      alert('Something went wrong — please email us directly at ' + CONTACT_EMAIL);
    }
  });
}
