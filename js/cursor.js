/* Flashlight cursor — desktop only */
(function () {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || rm.matches) return;

  const light = document.querySelector('.cursor-light');
  if (!light) return;

  document.addEventListener('mousemove', function (e) {
    light.style.left = e.clientX + 'px';
    light.style.top = e.clientY + 'px';
    light.classList.add('active');
  });

  document.addEventListener('mouseleave', function () {
    light.classList.remove('active');
  });
})();
