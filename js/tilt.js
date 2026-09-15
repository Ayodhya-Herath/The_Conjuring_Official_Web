/* 3D tilt on cards — desktop only, capped rotation */
(function () {
  var mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || rm.matches) return;

  var cards = document.querySelectorAll('.tilt-card');
  var MAX_ROTATION = 8;

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateY = ((x - centerX) / centerX) * MAX_ROTATION;
      var rotateX = ((centerY - y) / centerY) * MAX_ROTATION;
      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });
})();
