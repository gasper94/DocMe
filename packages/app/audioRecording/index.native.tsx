import * as FileSystem from 'expo-file-system';
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

    const audioFileUrl = recording.getURI()

    const response: any = await FileSystem.uploadAsync('http://10.0.0.140:3006/transcript', audioFileUrl, {
      fieldName: 'file',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        "Authorization": "Bearer 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",
      }
    });

    console.log('response-native: ' + JSON.stringify(response));
    console.log('response-native: ' + JSON.stringify(response.data));
    // const updatedRecordings = [
    //   ...recordings,
    //   {
    //     sound: sound,
    //     duration: getDurationFormatted(duration),
    //     file: recording.getURI(),
    //   },
    // ];

    // setRecordings(updatedRecordings);
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

const handleGetTranscriptWithUri = async (uri) => {
  console.log("file uri: " + uri);

  const fileInfo = await FileSystem.getInfoAsync(uri);
  if (!fileInfo.exists) {
    throw new Error('Audio file does not exist.');
  }

  // console.log("fileInfo:", fileInfo);

  // Convert the file to base64
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });


  console.log("base64Data:");
  return base64Data;
};

export {getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick, handleGetTranscriptWithUri};

