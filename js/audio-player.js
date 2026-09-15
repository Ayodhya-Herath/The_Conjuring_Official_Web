/* Custom audio player controls */
(function () {
  var players = document.querySelectorAll('.audio-player');

  players.forEach(function (player) {
    var btn = player.querySelector('.audio-player__btn');
    var audio = player.querySelector('audio');
    var progressBar = player.querySelector('.audio-player__progress-bar');
    var progressWrap = player.querySelector('.audio-player__progress');
    var timeDisplay = player.querySelector('.audio-player__time');
    var playIcon = btn.querySelector('.play-icon');
    var pauseIcon = btn.querySelector('.pause-icon');
    var waveBars = player.querySelectorAll('.audio-player__wave-bar');

    function formatTime(s) {
      if (isNaN(s)) return '0:00';
      var m = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function updateUI() {
      if (!audio) return;
      var playing = !audio.paused;
      if (playIcon) playIcon.style.display = playing ? 'none' : 'block';
      if (pauseIcon) pauseIcon.style.display = playing ? 'flex' : 'none';

      if (progressBar && audio.duration) {
        progressBar.style.width = (audio.currentTime / audio.duration * 100) + '%';
      }

      if (timeDisplay) {
        timeDisplay.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
      }

      if (waveBars.length && playing) {
        waveBars.forEach(function (bar) {
          bar.style.height = (20 + Math.random() * 70) + '%';
        });
      }
    }

    if (!audio) return;

    btn.addEventListener('click', function () {
      /* Pause all other audio first */
      document.querySelectorAll('.audio-player audio').forEach(function (a) {
        if (a !== audio && !a.paused) a.pause();
      });

      if (audio.paused) {
        var playPromise = audio.play();
        if (playPromise) playPromise.catch(function () {});
      } else {
        audio.pause();
      }
      updateUI();
    });

    audio.addEventListener('timeupdate', updateUI);
    audio.addEventListener('play', updateUI);
    audio.addEventListener('pause', function () {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });
    audio.addEventListener('ended', function () {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (progressBar) progressBar.style.width = '0%';
    });

    if (progressWrap) {
      progressWrap.addEventListener('click', function (e) {
        var rect = progressWrap.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = pct * audio.duration;
      });
    }

    /* Init wave bars to static heights */
    waveBars.forEach(function (bar, i) {
      bar.style.height = (30 + 55 * Math.abs(Math.sin(i * 0.6 + 0.4))) + '%';
    });

    updateUI();
  });
})();
