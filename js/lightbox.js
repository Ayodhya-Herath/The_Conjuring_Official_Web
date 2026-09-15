/* Gallery lightbox with touch swipe support */
(function () {
  var lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  var img = lightbox.querySelector('.lightbox__img');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  var nextBtn = lightbox.querySelector('.lightbox__nav--next');
  var items = document.querySelectorAll('.gallery-item');
  var srcs = [];
  var current = 0;
  var startX = 0;

  items.forEach(function (item, i) {
    var image = item.querySelector('img');
    if (image) srcs.push(image.src || image.getAttribute('data-src') || '');
    else srcs.push('');

    item.addEventListener('click', function () {
      current = i;
      show();
    });
  });

  function show() {
    if (srcs[current]) img.src = srcs[current];
    img.alt = 'Gallery image ' + (current + 1);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function next() { current = (current + 1) % srcs.length; show(); }
  function prev() { current = (current - 1 + srcs.length) % srcs.length; show(); }

  if (closeBtn) closeBtn.addEventListener('click', hide);
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  /* Touch swipe */
  lightbox.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next(); else prev();
    }
  });
})();
