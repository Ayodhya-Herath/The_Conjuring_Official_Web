/* Jump-scare flash — triggers once when the "I'M SORRY MOMMY" section enters view */
(function () {
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm.matches) return;

  var trigger = document.querySelector('.room-mommy');
  var flash = document.querySelector('.jump-flash');
  if (!trigger || !flash) return;

  var fired = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !fired) {
        fired = true;
        flash.classList.add('active');
        setTimeout(function () {
          flash.classList.remove('active');
        }, 180);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(trigger);
})();
