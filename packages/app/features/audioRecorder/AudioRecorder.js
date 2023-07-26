import React, { useState, useRef, useEffect} from 'react';
import { Button, Text, View, TextInput} from 'react-native';
import { Audio } from 'expo-av';
import { Configuration, OpenAIApi } from 'openai';
import axios from "axios";

// utils
import { getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick, handleGetTranscriptWithUri, handleGetTranscriptObject } from 'app/audioRecording/index';

export default function AudioRecorder() {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI,
  });

  const openai = new OpenAIApi(configuration);

  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  // new
  const [audioDuration, setAudioDuration] = useState(0);
  const startTimeRef = useRef(null);

  // new
  const [newMessage, setMesssage] = useState(null);

  // Might be able to need this. Else remove it later on.
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

  const handleStartRecording = async () => {
    await console.log("setRecordings", setRecordings);
    await startRecording(Audio, startTimeRef, setRecording, recordings,  setRecordings);

  };

  const handleStopRecording = async () => {
    await stopRecording(setRecording, startTimeRef, recording, recordings, setRecordings);
  }

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
           <Button
            style={{ backgroundColor: 'red' }}
            onPress={() => handleGetTranscript(recordingLine)}
            title="Get Transcript"
          />
        </View>
      );
    });
  };

  function splitInput(input, chunkSize) {
    const chunks = [];
    let i = 0;
    while (i < input.length) {
      chunks.push(input.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return chunks;
  }

  const handleGetTranscript = async (audio) => {
    console.log("starting handleGetTranscript");
    const transcript = await handleGetTranscriptWithUri(audio);

    // const promptPrefix = ` 
    //   Today I went from a walk from San Francisco California, USA to El Salvador. 
    //   I burned 350 calories and drank water. 
    //   Overall, I feel happy and unstressed.
    // `;

    const objTranscript = await handleGetTranscriptObject(transcript);
  
    await console.log('string:', objTranscript);
    await console.log("PointA: ", objTranscript.pointA);
    await console.log("PointB: ", objTranscript.pointB);
    await console.log("Calories: ", objTranscript.calories);
    await console.log("mood: ", objTranscript.drankWater);

    await setMesssage(objTranscript);
  };

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? handleStopRecording : handleStartRecording}
      />
      <Text>Duration: {`${getDurationFormatted(audioDuration)}`}</Text>
      {getRecordingLines()}

      {newMessage ? 
        <View>
          <Text>Transcription: {newMessage.pointA}</Text>
          <View>
            <Text>Point A</Text>
            <TextInput
              placeholder="Point A"
              value={newMessage.pointA}
              onChangeText={() => alert(newMessage.pointA)}
            />
          </View>
           <View>
          
          <Text>Point B</Text>
          <TextInput
            placeholder="Point B"
            value={newMessage.pointB ? newMessage.pointB : ''}
            onChangeText={() => alert(newMessage.pointB)}
          />
          </View>
          <View>
          <Text>Mood</Text>
          {newMessage.mood.length > 0 ?
            <>
              {newMessage.mood.map((item, index) => (
                <TextInput
                  index={index}
                  placeholder="Mood"
                  value={item}
                  onChangeText={() => alert(item)}
                />
              ))}
            </>
          : null}
          
          </View>
          <View>
          <Text>Point Calories:</Text>
          <TextInput
            placeholder="Calories"
            value={`${newMessage.calories}`}
            onChangeText={() => alert(newMessage.calories)}
          />
          </View>
          <Text>Drank Wanter: {newMessage.drankWater? 'true': 'false'}</Text>
        </View>
      :<Text>No Transcript</Text>}
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

//   // new 
//   const [audioDuration, setAudioDuration] = useState(0);
//   const startTimeRef = useRef(null);

//   // old
//   // const [audioBlob, setAudioBlob] = useState(null);
//   // const audioRef = useRef(null);
//   // const mediaRecorderRef = useRef(null);

//   const handleStartRecording = async () => {
//     await startRecording(startTimeRef, setRecording, recordings, setRecordings);
//   };

//   const handleStopRecording = async () => {
//     await stopRecording(setRecording);
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

//     // <View>
//     //   <Button
//     //     onPress={recording ? handleStopRecording : handleStartRecording}
//     //     title={recording ? 'Stop Recording' : 'Start Recording'}
//     //   />

//     //   <Text>Recordings: {recordings.length}</Text>

//     //   {recording && <Text>Duration: {getDurationFormatted(audioDuration)}</Text>}
//     //   {getRecordingLines()}
//     // </View>

//     <View style={{ backgroundColor: 'red' }}>
//       <Button
//         title={recording ? 'Stop Recording' : 'Start Recording'}
//         onPress={recording ? handleStopRecording : handleStartRecording}
//       />
//       <Text>Duration: {`${getDurationFormatted(audioDuration)}`}</Text>
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


// {
//   "duration": "00:00:02", 
//   "file": "file:///var/mobile/Containers/Data/Application/C915C898-277E-4677-88AC-778B79366D37/Library/Caches/ExponentExperienceData/%2540umartinez%252Fsolito-nativewind/AV/recording-A4318775-8ACA-4CAD-A395-04328E13AF29.caf", 
//   "sound": {
//     "_coalesceStatusUpdatesInMillis": 100, 
//     "_errorCallback": [Function anonymous], 
//     "_eventEmitter": {
//       "_eventEmitter": [NativeEventEmitter], 
//       "_listenerCount": 3, 
//       "_nativeModule": [Object]
//       }, 
//       "_internalErrorCallback": [Function anonymous], 
//       "_internalMetadataUpdateCallback": [Function anonymous], 
//       "_internalStatusUpdateCallback": [Function anonymous], 
//       "_key": 0, 
//       "_lastStatusUpdate": null, 
//       "_lastStatusUpdateTime": null, 
//       "_loaded": true, "_loading": false, 
//       "_onAudioSampleReceived": null, 
//       "_onMetadataUpdate": null, 
//       "_onPlaybackStatusUpdate": null, 
//       "_subscriptions": [[Object], [Object], [Object]], 
//       "getStatusAsync": [Function anonymous]
//     }
//   }