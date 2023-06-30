const startRecording = async (Audio, setRecording) => {
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

    setRecording(recording);
    } else {
    console.error('Please grant permission to the app to access the microphone');
    }
} catch (err) {
    console.error('Failed to start recording', err);
}
};

const stopRecording = async (setRecording, recording, recordings, setRecordings) => {
    setRecording(undefined);
    recording.stopAndUnloadAsync();

    const { sound, status } = recording.createNewLoadedSoundAsync();
    const updatedRecordings = [
        ...recordings,
        {
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI(),
        },
    ];

    setRecordings(updatedRecordings);
};

const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
};

const getAudio = async () => {
    alert('native')
}

const handlePlayAudioOnClick = (audioObj) => {
    console.log("about to play audio");    
};

export {getAudio, startRecording, stopRecording};

