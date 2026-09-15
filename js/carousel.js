/* Character turntable carousel with touch swipe */
(function () {
  var carousels = document.querySelectorAll('.carousel');
  var LABELS = ['Front', 'Full Body', 'Side', 'Close-Up', 'Back'];

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');
    var label = carousel.querySelector('.carousel__label');
    var dotsContainer = carousel.parentElement.querySelector('.carousel__dots');
    var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel__dot') : [];
    var slideCount = slides.length;
    var currentIndex = 0;
    var startX = 0;
    var isDragging = false;
    var autoInterval = null;

    function goTo(index) {
      currentIndex = ((index % slideCount) + slideCount) % slideCount;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      if (label) label.textContent = LABELS[currentIndex] || '';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); pauseAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); pauseAuto(); });

    /* Touch swipe */
    carousel.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', function (e) {
      /* prevent vertical scroll when swiping horizontally */
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var endX = e.changedTouches[0].clientX;
      var delta = endX - startX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next(); else prev();
        pauseAuto();
      }
    });

    /* Mouse drag */
    carousel.addEventListener('mousedown', function (e) {
      startX = e.clientX;
      isDragging = true;
      e.preventDefault();
    });

    carousel.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next(); else prev();
        pauseAuto();
      }
    });

    carousel.addEventListener('mouseleave', function () { isDragging = false; });

    /* Auto-advance */
    function startAuto() {
      autoInterval = setInterval(next, 4500);
    }

    function pauseAuto() {
      clearInterval(autoInterval);
      setTimeout(startAuto, 6000);
    }

    var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!rm.matches) startAuto();

    /* Keyboard */
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Character angle carousel');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); pauseAuto(); }
      if (e.key === 'ArrowRight') { next(); pauseAuto(); }
    });

    goTo(0);
  });
})();
