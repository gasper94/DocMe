import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

// utils
import { getAudio, startRecording, stopRecording, handlePlayAudioOnClick } from 'app/audioRecording/index';

export default function AudioRecorder() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState('');

  // const startRecording = async () => {
  //   try {
  //     const permission = await Audio.requestPermissionsAsync();

  //     if (permission.status === 'granted') {
  //       await Audio.setAudioModeAsync({
  //         allowsRecordingIOS: true,
  //         playsInSilentModeIOS: true,
  //       });

  //       const { recording } = await Audio.Recording.createAsync(
  //         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
  //       );

  //       setRecording(recording);
  //     } else {
  //       setMessage('Please grant permission to the app to access the microphone');
  //     }
  //   } catch (err) {
  //     console.error('Failed to start recording', err);
  //   }
  // };

    const handleStartRecording = async () => {
      await startRecording(Audio, setRecording);
    };

  // const stopRecording = async () => {
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();

  //   const { sound, status } = await recording.createNewLoadedSoundAsync();
  //   const updatedRecordings = [
  //     ...recordings,
  //     {
  //       sound: sound,
  //       duration: getDurationFormatted(status.durationMillis),
  //       file: recording.getURI(),
  //     },
  //   ];

  //   setRecordings(updatedRecordings);
  // };

  const handleStopRecording = async () => {
    await stopRecording(setRecording, recording, recordings, setRecordings);
  }

  // const getDurationFormatted = (millis) => {
  //   const minutes = millis / 1000 / 60;
  //   const minutesDisplay = Math.floor(minutes);
  //   const seconds = Math.round((minutes - minutesDisplay) * 60);
  //   const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
  //   return `${minutesDisplay}:${secondsDisplay}`;
  // };

  const getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={{ backgroundColor: 'purple' }}>
          <Text>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={{ backgroundColor: 'red' }}
            onPress={() => handlePlayAudioOnClick(recordingLine)}
            title="Play"
          />
        </View>
      );
    });
  };

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? handleStopRecording : handleStartRecording}
      />
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}


// Todo bug on Mobile, once that get solved merge two ui with extracted functionality.










// // Web logic
// import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useState, useRef, useEffect } from 'react';

// // utils
// import {getAudio, getDurationFormatted, startRecording , stopRecording, handlePlayAudioOnClick} from "../../audioRecording/index";

// const AudioRecorder = () => {
//   const [recording, setRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioDuration, setAudioDuration] = useState(0);
//   const startTimeRef = useRef(null);
//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);

//   const handleStartRecording = async (event) => {
//     await startRecording(event, mediaRecorderRef, setAudioBlob, startTimeRef, setRecording, recordings, audioBlob, setRecordings);
//   };

//   const handleStopRecording = async () => {
//     await stopRecording(audioRef, setRecording, mediaRecorderRef, audioBlob, recordings, setRecordings);
//   }
  
//   // Might be able to need this. Else remove it later on.
//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         const currentTime = (Date.now() - startTimeRef.current) / 1000;
//         setAudioDuration(currentTime);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [recording]);

//   const getRecordingLines = () => {
//     return recordings.map((recordingLine, index) => {
//       return (
//         <View key={index} style={{ backgroundColor: 'purple' }}>
//           <Text>
//             Recording {index + 1} - {recordingLine.duration}
//           </Text>
//           <Button
//             style={{ backgroundColor: 'red' }}
//             onPress={() => handlePlayAudioOnClick(recordingLine)}
//             title="Play"
//           >
//             Play
//           </Button>
//         </View>
//       );
//     });
//   };

//   return (

//     <View>
//       <Button
//         onPress={recording ? handleStopRecording : handleStartRecording}
//         title={recording ? 'Stop Recording' : 'Start Recording'}
//       />

//       <Text>Recordings: {recordings.length}</Text>

//       {recording && <Text>Duration: {getDurationFormatted(audioDuration)}</Text>}
//       {getRecordingLines()}
//     </View>

//     // <div>
//     //   <button onClick={recording ? handleStopRecording : handleStartRecording}>
//     //     {recording ? 'Stop Recording' : 'Start Recording'}
//     //   </button>

//     //   <div>Recordings: {recordings.length}</div>

//     //   {recording ? <div>Duration: {getDurationFormatted(audioDuration)}</div>:null}
//     //   {getRecordingLines()}
//     // </div>





//     // <View style={{ backgroundColor: 'red' }}>
//     //   <Button
//     //     title={recording ? 'Stop Recording' : 'Start Recording'}
//     //     onPress={recording ? handleStopRecording : handleStartRecording}
//     //   />
//     //   {getRecordingLines()}
//     //   <StatusBar style="auto" />
//     // </View>
//     // <View>
//     //   <Button onPress={recording ? handleStopRecording : handleStartRecording}>
//     //     {recording ? 'Stop Recording' : 'Start Recording'}
//     //   </Button>
//     //   <Button onPress={handlePlayAudio} disabled={!audioBlob}>
//     //     Play Audio
//     //   </Button>

//     //   <Text>Recordings: {recordings.length}</Text>

//     //   {/* <Audio ref={audioRef} onLoadedMetadata={handleLoadedMetadata} /> */}
//     //   <Text>Duration: {getDurationFormatted(audioDuration)}</Text>
//     //   {getRecordingLines()}
//     // </View>
//   );
// };

// export default AudioRecorder;




















// // import * as React from 'react';
// // import { Text, View, StyleSheet, Button } from 'react-native';
// // import { Audio } from 'expo-av';

// // export function AudioRecorder() {
// //   const [sound, setSound] = React.useState();

// //   async function playSound() {
// //     console.log('Loading Sound');
// //     const { sound } = await Audio.Sound.createAsync( require('./assets/Hello.mp3')
// //     );
// //     setSound(sound);

// //     console.log('Playing Sound');
// //     await sound.playAsync();
// //   }

// //   React.useEffect(() => {
// //     return sound
// //       ? () => {
// //           console.log('Unloading Sound');
// //           sound.unloadAsync();
// //         }
// //       : undefined;
// //   }, [sound]);

// //   return (
// //     <View style={styles.container}>
// //       <Button title="Play Sound" onPress={playSound} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     backgroundColor: '#ecf0f1',
// //     padding: 10,
// //   },
// // });

// // export default AudioRecorder;