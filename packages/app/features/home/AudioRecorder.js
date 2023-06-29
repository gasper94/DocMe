// import React, { useState } from 'react';
// import { Button, Text, View } from 'react-native';
// import { Audio } from 'expo-av';
// import * as Sharing from 'expo-sharing';
// import { StatusBar } from 'expo-status-bar';

// // utils
// import { startRecording, stopRecording } from 'app/audioRecording/index';

// export default function AudioRecorder() {
//   const [recording, setRecording] = useState();
//   const [recordings, setRecordings] = useState([]);
//   const [message, setMessage] = useState('');

//   // const startRecording = async () => {
//   //   try {
//   //     const permission = await Audio.requestPermissionsAsync();

//   //     if (permission.status === 'granted') {
//   //       await Audio.setAudioModeAsync({
//   //         allowsRecordingIOS: true,
//   //         playsInSilentModeIOS: true,
//   //       });

//   //       const { recording } = await Audio.Recording.createAsync(
//   //         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//   //       );

//   //       setRecording(recording);
//   //     } else {
//   //       setMessage('Please grant permission to the app to access the microphone');
//   //     }
//   //   } catch (err) {
//   //     console.error('Failed to start recording', err);
//   //   }
//   // };

//     const handleStartRecording = async () => {
//       await startRecording(Audio, setRecording);
//     };

//   // const stopRecording = async () => {
//   //   setRecording(undefined);
//   //   await recording.stopAndUnloadAsync();

//   //   const { sound, status } = await recording.createNewLoadedSoundAsync();
//   //   const updatedRecordings = [
//   //     ...recordings,
//   //     {
//   //       sound: sound,
//   //       duration: getDurationFormatted(status.durationMillis),
//   //       file: recording.getURI(),
//   //     },
//   //   ];

//   //   setRecordings(updatedRecordings);
//   // };

//   const handleStopRecording = async () => {
//     await stopRecording(setRecording, recording, recordings, setRecordings);
//   }

//   // const getDurationFormatted = (millis) => {
//   //   const minutes = millis / 1000 / 60;
//   //   const minutesDisplay = Math.floor(minutes);
//   //   const seconds = Math.round((minutes - minutesDisplay) * 60);
//   //   const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
//   //   return `${minutesDisplay}:${secondsDisplay}`;
//   // };

//   const getRecordingLines = () => {
//     return recordings.map((recordingLine, index) => {
//       return (
//         <View key={index} style={{ backgroundColor: 'purple' }}>
//           <Text>
//             Recording {index + 1} - {recordingLine.duration}
//           </Text>
//           <Button
//             style={{ backgroundColor: 'red' }}
//             onPress={() => recordingLine.sound.replayAsync()}
//             title="Play"
//           />
//           <Button
//             style={{ backgroundColor: 'blue' }}
//             onPress={() => Sharing.shareAsync(recordingLine.file)}
//             title="Share"
//           />
//         </View>
//       );
//     });
//   };

//   return (
//     <View style={{ backgroundColor: 'red' }}>
//       <Button
//         title={recording ? 'Stop Recording' : 'Start Recording'}
//         onPress={recording ? handleStopRecording : handleStartRecording}
//       />
//       {getRecordingLines()}
//       <StatusBar style="auto" />
//     </View>
//   );
// }














// Web logic
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
// import * as SpeechRecognition from 'expo-speech-recognition';

// utils
import {getAudio, getDurationFormatted, startRecording , stopRecording} from "../../audioRecording/index";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const startTimeRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);


  // const formatTime = (timeInSeconds) => {
  //   const pad = (value) => (value < 10 ? `0${value}` : value);
  //   const hours = Math.floor(timeInSeconds / 3600);
  //   const minutes = Math.floor((timeInSeconds % 3600) / 60);
  //   const seconds = Math.floor(timeInSeconds % 60);

  //   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  // };

  // const handleStartRecording = () => {
  //   console.log("about to start recording");
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then(stream => {
  //       console.log("stream started", stream);
  //       const mediaRecorder = new MediaRecorder(stream);
  //       mediaRecorderRef.current = mediaRecorder;
  //       const chunks = [];

  //       mediaRecorder.addEventListener('dataavailable', event => {
  //         chunks.push(event.data);
  //         console.log('Data available:', event.data);
  //       });

  //       mediaRecorder.addEventListener('stop', () => {
  //         const blob = new Blob(chunks, { type: 'audio/wav' });

  //         console.log("blob:", blob);
  //         setAudioBlob(blob);
  //       });

  //       mediaRecorder.start(1000);
  //       startTimeRef.current = Date.now();
  //       setRecording(true);
  //     })
  //     .catch(error => {
  //       console.error('Error accessing microphone:', error);
  //     });
  // };

    const handleStartRecording = async (event) => {
      await startRecording(event, mediaRecorderRef, setAudioBlobc, startTimeRef, isRecording);
    };

    const setAudioBlobc = async (blob) => {
      setAudioBlob(blob)
    }

    const isRecording = async (flag) => {
      setRecording(flag);
    }

    useEffect(() => {
      let interval;

      if (recording) {
        interval = setInterval(() => {
          const currentTime = (Date.now() - startTimeRef.current) / 1000;
          setAudioDuration(currentTime);
        }, 1000);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [recording]);


  // const handleStopRecording = () => {
  //   console.log("Stop recording");
  //   audioRef.current?.pause();
  //   setRecording(false);
  //   mediaRecorderRef.current?.stop();

  //   // const endTime = Date.now();
  //   // const duration = (endTime - startTimeRef.current) / 1000; // Convert to seconds
  //   // setAudioDuration(duration);
  //   // console.log("duration: " + duration);

  //   // Additional cleanup steps if required
  //   if (mediaRecorderRef.current?.stream) {
  //     const tracks = mediaRecorderRef.current.stream.getTracks();
  //     tracks.forEach(track => track.stop());
  //   }
  // };

  const handleStopRecording = async () => {
    await stopRecording(audioRef, isRecording, mediaRecorderRef, audioBlob, recordings, setRecordings);
  }

  // Can this bt handle on the component?
  const handlePlayAudio = () => {
    console.log("about to play audio", audioBlob);
    if (audioBlob ) {
      const audioURL = URL.createObjectURL(audioBlob);
      console.log("audioURL: " + audioURL);
       
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  const handlePlayAudioOnClick = (audioObj) => {
    console.log("about to play audio", audioObj);
    if (audioObj.blob) {
      const audioURL = URL.createObjectURL(audioObj.blob);
      console.log("audioURL: " + audioURL);
       
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      setAudioDuration(duration);
    }
  };

  const getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={{ backgroundColor: 'purple' }}>
          <Text>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => handlePlayAudioOnClick(recordingLine)}
            title="Play"
          >
            Play
          </button>
        </View>
      );
    });
  };


  return (
    // <View>
    //   <Text>Hello audio recorder</Text>
    //   <Button title="Get Audio" onPress={getAudio} />
    // </View>
    <div>
      <button onClick={recording ? handleStopRecording : handleStartRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={handlePlayAudio} disabled={!audioBlob}>
        Play Audio
      </button>

      {/* <audio ref={audioRef} controls /> */}
      <audio ref={audioRef} controls onLoadedMetadata={handleLoadedMetadata} />
      <div>Duration: {getDurationFormatted(audioDuration)}</div>
      {getRecordingLines()}
    </div>
  );
};

export default AudioRecorder;
