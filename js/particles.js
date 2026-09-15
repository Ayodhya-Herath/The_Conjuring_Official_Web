/* Floating dust-mote / ember particles — pure vanilla JS canvas */
(function () {
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm.matches) return;

  var canvases = document.querySelectorAll('.particle-canvas');
  if (!canvases.length) return;

  canvases.forEach(function (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = -9999, mouseY = -9999;
    var PARTICLE_COUNT = 60;
    var raf;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 200 + 100,
        maxLife: 0
      };
    }

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        var p = createParticle();
        p.maxLife = p.life;
        particles.push(p);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        if (p.life <= 0 || p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) {
          particles[i] = createParticle();
          particles[i].maxLife = particles[i].life;
          p = particles[i];
        }

        var lifeRatio = p.life / p.maxLife;
        var alpha = p.opacity * (lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : lifeRatio < 0.2 ? lifeRatio / 0.2 : 1);

        var dx = p.x - mouseX;
        var dy = p.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          alpha = Math.min(1, alpha + (1 - dist / 150) * 0.5);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 200, 130, ' + alpha + ')';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer) {
      document.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
    }

    window.addEventListener('resize', resize);
    init();
    draw();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!raf) draw();
        } else {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    }, { threshold: 0 });

    observer.observe(canvas);
  });
})();
