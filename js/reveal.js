/* Scroll reveals, text-scramble headings, hidden-room morph, clip-path reveals */
(function () {
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- Scroll reveal (fade up) --- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (rm.matches) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      reveals.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* --- Clip-path iris reveals --- */
  var clips = document.querySelectorAll('.clip-reveal');
  if (clips.length) {
    if (rm.matches) {
      clips.forEach(function (el) { el.classList.add('revealed'); });
    } else {
      var clipObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            clipObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      clips.forEach(function (el) { clipObserver.observe(el); });
    }
  }

  /* --- Text scramble for headings --- */
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  var scrambles = document.querySelectorAll('.scramble-heading');

  function wrapWords(el) {
    var text = el.textContent;
    if (el.getAttribute('data-scramble-ready')) return;
    el.setAttribute('data-scramble-ready', '1');
    el.innerHTML = '';
    var words = text.split(/(\s+)/);
    words.forEach(function (part) {
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
      } else {
        var span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'nowrap';
        span.textContent = part;
        span.setAttribute('data-word', part);
        el.appendChild(span);
      }
    });
  }

  function scrambleText(el) {
    var wordSpans = el.querySelectorAll('[data-word]');
    wordSpans.forEach(function (span) {
      var original = span.getAttribute('data-word');
      var iterations = 0;
      var maxIterations = original.length * 2;
      var interval = setInterval(function () {
        var display = '';
        for (var i = 0; i < original.length; i++) {
          if (i < iterations / 2) {
            display += original[i];
          } else {
            display += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        span.textContent = display;
        iterations++;
        if (iterations > maxIterations) {
          clearInterval(interval);
          span.textContent = original;
        }
      }, 25);
    });
  }

  if (scrambles.length) {
    scrambles.forEach(function (el) { wrapWords(el); });
    if (rm.matches) {
      /* no-op: text stays as-is */
    } else {
      var scrambleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            scrambleText(entry.target);
            scrambleObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      scrambles.forEach(function (el) { scrambleObserver.observe(el); });
    }
  }

  /* --- Hidden Room scroll morph --- */
  var roomMorph = document.querySelector('.room-morph');
  if (roomMorph) {
    var photoLayer = roomMorph.querySelector('.room-morph__layer--photo');
    var blueprintLayer = roomMorph.querySelector('.room-morph__layer--blueprint');

    if (photoLayer && blueprintLayer) {
      if (rm.matches) {
        photoLayer.style.opacity = '1';
        blueprintLayer.style.opacity = '0';
      } else {
        var ticking = false;
        window.addEventListener('scroll', function () {
          if (!ticking) {
            requestAnimationFrame(function () {
              var rect = roomMorph.getBoundingClientRect();
              var vh = window.innerHeight;
              var total = rect.height - vh;
              var progress = total > 0 ? -rect.top / total : 0;
              progress = Math.max(0, Math.min(1, progress));
              photoLayer.style.opacity = (1 - progress).toString();
              blueprintLayer.style.opacity = progress.toString();
              ticking = false;
            });
            ticking = true;
          }
        }, { passive: true });
      }
    }
  }

  /* --- Room tabs --- */
  var tabBtns = document.querySelectorAll('.room-tabs__btn');
  var tabPanels = document.querySelectorAll('.room-tabs__panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.querySelector('.room-tabs__panel[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  /* --- Hero letter reveal --- */
  var letters = document.querySelectorAll('.hero__title .letter');
  if (letters.length) {
    if (rm.matches) {
      letters.forEach(function (l) { l.style.opacity = '1'; l.style.filter = 'none'; l.style.transform = 'none'; });
    } else {
      letters.forEach(function (l, i) {
        l.style.animationDelay = (i * 0.045) + 's';
        l.classList.add('revealed');
      });
    }
  }

  /* --- Scroll progress candle --- */
  var progressTrack = document.querySelector('.scroll-progress__track');
  var progressFlame = document.querySelector('.scroll-progress__flame');
  if (progressTrack) {
    var updateProgress = function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressTrack.style.height = pct + '%';
      if (progressFlame) {
        progressFlame.style.display = pct > 0.5 ? 'block' : 'none';
      }
    };

    if (rm.matches) {
      progressTrack.style.display = 'none';
    } else {
      window.addEventListener('scroll', function () {
        requestAnimationFrame(updateProgress);
      }, { passive: true });
      updateProgress();
    }
  }
})();
