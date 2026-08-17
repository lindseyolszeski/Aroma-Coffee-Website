// Gentle scroll-reveal for section content. Elements get the .reveal class
// only when JS runs and the visitor allows motion, so content is never
// hidden if this script fails or reduced motion is preferred.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var selector = [
    '.section-head', '.card', '.phase-item', '.quote-block',
    '.pull-quote', '.img-wrap', '.two-col-img', '.form-box',
    '.impact-stat', '.mission-band-overlay > *', '.menu-item-card',
  ].join(', ');

  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  els.forEach(function (el) {
    var i = 0, sib = el;
    while ((sib = sib.previousElementSibling) && i < 5) {
      if (sib.classList.contains('reveal')) i++;
    }
    el.style.transitionDelay = (i * 70) + 'ms';
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
