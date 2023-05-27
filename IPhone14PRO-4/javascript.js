document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('playButton').addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      var audioPlayer = document.getElementById('audioPlayer');
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    });
  });