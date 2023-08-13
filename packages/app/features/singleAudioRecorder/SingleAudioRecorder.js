import React, { useState, useRef, useEffect} from 'react';
import { Button, Text, View, TextInput} from 'react-native';
import { Audio } from 'expo-av';
import { Configuration, OpenAIApi } from 'openai';
import axios from "axios";

// utils
import { getAudio, getDurationFormatted, startRecording, stopRecording, handlePlayAudioOnClick, handleGetTranscriptWithUri, handleGetTranscriptObject } from 'app/singleAudioRecording/index';

export default function SingleAudioRecorder({setTranscript, setTranscriptObject}) {
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

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? handleStopRecording : handleStartRecording}
      />
      <Text>Duration: {`${getDurationFormatted(audioDuration)}`}</Text>
      {getRecordingLines()}

      {/* {transcript ?
        <View>
          <Text>Transcript: {transcript}</Text>
        </View>
      :null} */}

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