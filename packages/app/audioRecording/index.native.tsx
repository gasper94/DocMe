import * as FileSystem from 'expo-file-system';
import axios from "axios";
// import RNFetchBlob from 'react-native-fetch-blob';
// import RNFetchBlob from 'rn-fetch-blob';

const startRecording = async (
    Audio,
    startTimeRef, 
    setRecording,
    recordings,  
    setRecordings
) => {
     try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

         const recordingOptions = {
                android: {
                    extension: '.mp3', // Change the extension to the desired format (e.g., '.wav')
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
                },
                ios: {
                    extension: '.wav', // Change the extension to the desired format (e.g., '.mp3')
                    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    sampleRate: 44100, // Adjust the sample rate if needed
                    numberOfChannels: 2, // Adjust the number of channels if needed
                    bitRate: 128000, // Adjust the bit rate if needed
                    linearPCMBitDepth: 16, // Adjust the bit depth if needed
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            };

        const { recording } = await Audio.Recording.createAsync(recordingOptions);
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
    recordingLine.sound.replayAsync()  
};

const handleGetTranscriptWithUri = async (audio) => {
  console.log('handleGetTranscriptWithUri', audio);
  const response: any = await FileSystem.uploadAsync('http://10.0.0.141:3006/transcript', audio.file, {
      fieldName: 'file',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        "Authorization": `Bearer ${process.env.OPEN_AI}`,
      }
    });

    console.log("response:", response);

    const parsedData = JSON.parse(response.body);
    const extractedText = parsedData.text;

    console.log("extractedText:", extractedText);

    return extractedText;
};

const handleGetTranscriptObject = async (transcript) => {

    console.log("transcript:", transcript);
    // calll my endpoint
    try {
        const data = JSON.stringify({
            "promptText": transcript
        });

        const config:any = {
            method: 'post',
            url: 'http://10.0.0.141:3006/test',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config);
        // console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export {getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick, handleGetTranscriptWithUri, handleGetTranscriptObject};

