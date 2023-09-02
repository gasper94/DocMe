import React, { useState, useRef, useEffect} from 'react';
import { Button, Text, View, TextInput, TouchableOpacity, Animated} from 'react-native';
import { Audio } from 'expo-av';
import { Configuration, OpenAIApi } from 'openai';
import { Microphone } from '@nandorojo/heroicons/24/outline';

// utils
import { getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick, handleGetTranscriptWithUri, handleGetTranscriptObject } from 'app/singleAudioRecording/index';

export default function SingleAudioRecorder({setTranscript, setTranscriptObject, startTimeRef, audioDuration, setAudioDuration}) {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI,
  });

  const openai = new OpenAIApi(configuration);

  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  // new
  // const [audioDuration, setAudioDuration] = useState(0);
  // const startTimeRef = useRef(null);

  // new
  const [newMessage, setMesssage] = useState(null);
  // const [transcript, setTranscript] = useState(null);

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

    // await 
    // await handleGetTranscript(recordings[0]);r
  }

  useEffect(() => {
    // console.log("recordings handle:", recordings[0]);
    if(recordings[0]){
      handleGetTranscript(recordings[0])
    }
  },[recordings])

  const getRecordingLines = () => {
    console.log("recordings:", recordings);
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
    console.log("starting handleGetTranscript", audio);
    const transcript = await handleGetTranscriptWithUri(audio);

    console.log("Transcript:", transcript);
    setTranscript(transcript);
    const objTranscript = await handleGetTranscriptObject(transcript);
    await setTranscriptObject(objTranscript);
    // await console.log('string:', objTranscript);
    // await console.log("PointA: ", objTranscript.pointA);
    // await console.log("PointB: ", objTranscript.pointB);
    // await console.log("Calories: ", objTranscript.calories);
    // await console.log("mood: ", objTranscript.drankWater);

    // await setMesssage(objTranscript);
  };

   const [isRecording, setIsRecording] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animationInterval;

    if (isRecording) {
      animateCircle(); // Start the animation
      animationInterval = setInterval(() => {
        scaleValue.stopAnimation();
        scaleValue.setValue(1);
        animateCircle();
      }, 1000);
    } else {
      clearInterval(animationInterval);
      scaleValue.stopAnimation();
      scaleValue.setValue(1);
    }

    return () => {
      clearInterval(animationInterval);
      scaleValue.stopAnimation();
      scaleValue.setValue(1);
    };
  }, [isRecording]);

  const animateCircle = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  const handleStartRecordingButton = () => {
    setIsRecording(!isRecording);
  }

  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
    //   <Button
    //     title={recording ? 'Stop Recording' : 'Start Recording'}
    //     onPress={recording ? handleStopRecording : handleStartRecording}
    //   />
    // </View>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={recording ? handleStopRecording : handleStartRecording}
      >
        <Animated.View style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 70, height: 70, borderRadius: 50, backgroundColor: 'red' }, animatedStyle]}>
            {recording ?
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Stop
            </Text>
            :
            <Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }}>
              <Microphone color={'white'}/>
            </Text>
            }
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}