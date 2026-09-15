/* Magnetic hover on buttons — desktop only */
(function () {
  var mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || rm.matches) return;

  var wraps = document.querySelectorAll('.magnetic-wrap');
  var RADIUS = 60;
  var STRENGTH = 0.3;

  wraps.forEach(function (wrap) {
    wrap.addEventListener('mousemove', function (e) {
      var rect = wrap.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS) {
        var tx = dx * STRENGTH;
        var ty = dy * STRENGTH;
        wrap.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
      }
    });

    wrap.addEventListener('mouseleave', function () {
      wrap.style.transform = 'translate(0, 0)';
    });
  });
})();
