const startRecording = async (Audio, startTimeRef, setRecording) => {
     try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        startTimeRef.current = Date.now();

        setRecording(recording);
      } else {
        console.log('Please grant permission to the app to access the microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
};

const stopRecording = async (setRecording, startTimeRef, recording, recordings, setRecordings) => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const duration = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const updatedRecordings = [
      ...recordings,
      {
        sound: sound,
        duration: getDurationFormatted(duration),
        file: recording.getURI(),
      },
    ];

    setRecordings(updatedRecordings);
};

const getDurationFormatted = (timeInSeconds) => {
    const pad = (value) => (value < 10 ? `0${value}` : value);
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const getAudio = async () => {
    alert('native')
}

const handlePlayAudioOnClick = (recordingLine) => {
    alert("about to play audio");  
    recordingLine.sound.replayAsync()  
};

export {getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick};

