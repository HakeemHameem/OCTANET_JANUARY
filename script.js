// JavaScript for Custom Music Player Controls
var audio = document.getElementById('audio-element');
var playlistItems = document.querySelectorAll('#playlist li');
var tracks = [
  'path-to-your-first-song.mp3',
  'path-to-your-second-song.mp3',
  'path-to-your-third-song.mp3',
  // ...add more tracks here
];

function togglePlayPause() {
  if (audio.paused) {
      audio.play();
      updatePlayPauseButton(true);
  } else {
      audio.pause();
      updatePlayPauseButton(false);
  }
}

function updatePlayPauseButton(isPlaying) {
  var playPauseButton = document.getElementById('play-pause');
  playPauseButton.innerText = isPlaying ? 'Pause' : 'Play';
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  changeTrack(tracks[currentTrackIndex], playlistItems[currentTrackIndex]);
}

function playPreviousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  changeTrack(tracks[currentTrackIndex], playlistItems[currentTrackIndex]);
}

function changeTrack(source, element) {
  audio.src = source;
  audio.play();
  updatePlayPauseButton(true);
  updatePlaylistHighlight(element);
}

function updatePlaylistHighlight(element) {
  if (element) {
      playlistItems.forEach(li => li.classList.remove('playing'));
      element.classList.add('playing');
  }
}

audio.addEventListener('ended', playNextTrack);

audio.addEventListener('timeupdate', function() {
  var progressBar = document.getElementById('progress');
  var percentage = Math.floor((100 / audio.duration) * audio.currentTime);
  progressBar.style.width = percentage + '%';
});

// Adding click event listeners to playlist items
playlistItems.forEach((item, index) => {
  item.addEventListener('click', function() {
      currentTrackIndex = index;
      changeTrack(tracks[currentTrackIndex], this);
  });
});