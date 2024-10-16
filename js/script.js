document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("radio-stream");
  const playPauseButton = document.querySelector('[name="play-pause"]');
  const playPauseButtonIcon = playPauseButton.querySelector("i.fas");
  const volumeControl = document.getElementById("volume-control");
  const volumeButton = document.querySelector('[name="mute"]');
  const volumeButtonIcon = volumeButton.querySelector("i.fas");
  const currentlyPlaying = document.getElementById("current-song");

  const radioButtons = document.querySelectorAll('input[type="radio"]');

  // https://gist.github.com/JV-conseil/7063daeadf0041cb845d0ec22f8c418f
  // https://github.com/angelodlfrtr/radiotray
  // Define the radio station streams
  const radioStreams = {
    "france-info": "https://icecast.radiofrance.fr/franceinfo-hifi.aac?id=radiofrance",
    "fip": "https://icecast.radiofrance.fr/fip-hifi.aac?id=radiofrance",
    "rfi": "https://rfimonde64k.ice.infomaniak.ch/rfimonde-64.mp3",
    // 'france-culture': 'https://icecast.radiofrance.fr/franceculture-hifi.aac?id=radiofrance3'
  };

  let isPlaying = false;
  let currentVolume = 0.5;
  // Function to update the audio source based on the selected radio button
  function updateAudioSource() {
    const selectedRadioButton = document.querySelector(
      'input[type="radio"]:checked',
    );
    if (selectedRadioButton) {
      audio.src = radioStreams[selectedRadioButton.value];
      if (!isPlaying) {
        playPauseButton.click();
      } else {
        audio.play();
      }
    }
  }

  // Add event listeners to the radio buttons
  radioButtons.forEach((button) => {
    button.addEventListener("change", updateAudioSource);
  });

  // Initialize the audio source with the default selected radio button
  updateAudioSource();

  // Play/Pause button event listener
  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playPauseButtonIcon.classList.remove("fa-pause");
      playPauseButtonIcon.classList.add("fa-play");
      isPlaying = false;
    } else {
      audio.play();
      playPauseButtonIcon.classList.remove("fa-play");
      playPauseButtonIcon.classList.add("fa-pause");
      isPlaying = true;
    }
  });

  // Volume control event listener
  volumeControl.addEventListener("input", () => {
    const volume = parseFloat(volumeControl.value);
    audio.volume = currentVolume = volume;
    adjustVolumeIcon(volume);
  });

  volumeButton.addEventListener("click", () => {
    if (audio.volume > 0) {
      adjustVolumeIcon(0);
      audio.volume = 0;
      volumeControl.value = 0;
    } else {
      adjustVolumeIcon(currentVolume);
      audio.volume = currentVolume;
      volumeControl.value = currentVolume;
    }
  });

  // Function to adjust the volume icon
  function adjustVolumeIcon(volume) {
    if (volume === 0) {
      volumeButtonIcon.classList.remove("fa-volume-down");
      volumeButtonIcon.classList.add("fa-volume-off");
    } else {
      volumeButtonIcon.classList.remove("fa-volume-off");
      volumeButtonIcon.classList.add("fa-volume-down");
    }
  }

  // Fetch currently playing song information (if available)
  // This example assumes a simple JSON endpoint
  // function fetchCurrentlyPlaying() {
  //     // Replace with actual endpoint URL
  //     fetch('https://example.com/currently-playing')
  //         .then(response => response.json())
  //         .then(data => currentlyPlaying.innerText = data.currentSong);
  // }

  // Optional: Fetch currently playing song information at intervals
  // let fetchInterval = setInterval(fetchCurrentlyPlaying, 3000);
});
