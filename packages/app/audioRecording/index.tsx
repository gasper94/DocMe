import { MutableRefObject } from "react";

const startRecording = async (
    event: Event, 
    mediaRecorderRef: MutableRefObject<MediaRecorder | null>, 
    setAudioBlob, 
    startTimeRef, 
    setRecording,
    recordings, 
    audioBlob, 
    setRecordings
) => {
    alert("web about to start recording");

    await navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        console.log("stream started", stream);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks: BlobPart[] = [];


        mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
            chunks.push(event.data as BlobPart);
            console.log(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            handleAudioBlob(chunks, setAudioBlob, startTimeRef, recordings, audioBlob, setRecordings, mediaRecorderRef);
        });

        mediaRecorder.start(1000);
        startTimeRef.current = Date.now();
        setRecording(true);
    })
    .catch(error => {
        console.error('Error accessing microphone:', error);
    });
};

const stopRecording =  async (audioRef, setRecording, mediaRecorderRef, audioBlob, recordings, setRecordings) => {
    await console.log("Stop recording",{
        audioRef, 
        setRecording, 
        mediaRecorderRef, 
        audioBlob, 
        recordings, 
        setRecordings
    });
    await audioRef.current?.pause();
    await setRecording(false);
    await mediaRecorderRef.current?.stop();

};

const getDurationFormatted = (timeInSeconds) => {
    const pad = (value) => (value < 10 ? `0${value}` : value);
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const getAudio =  async () => {
    alert('web')
}

const handleAudioBlob = (chunks, setAudioBlob, startTimeRef, recordings, audioBlob, setRecordings, mediaRecorderRef) => {
    const duration = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(blob);

    const newObjectBlob = {
        blob: blob,
        audioURL: audioURL,
        duration: getDurationFormatted(duration)
    };

  // To do. Solve bug here. Looks like audioBlob is not being loaded yet.
    console.log("recordingssssssssssssssssssssss: audioBlob", blob);
    console.log("recordingssssssssssssssssssssss", recordings);
    if(newObjectBlob){
        // setRecordings([...recordings, audioBlob]);
        setRecordings(prevRecordings => [...prevRecordings, newObjectBlob]);
        console.log("recordingssssssssssssssssssssss", recordings);
    }
    // // const endTime = Date.now();
    // // const duration = (endTime - startTimeRef.current) / 1000; // Convert to seconds
    // // setAudioDuration(duration);
    // // console.log("duration: " + duration);

    // Additional cleanup steps if required
    if (mediaRecorderRef.current?.stream) {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach(track => track.stop());
    }

//   const newObjectBlob = {
//     blob: blob,
//     audioURL: audioURL,
//     duration: getDurationFormatted(duration)
//   };
//   setAudioBlob(newObjectBlob);
};

const handlePlayAudioOnClick = (audioObj) => {
    console.log("about to play audio", audioObj);
    if (audioObj.blob) {
      const audioURL = URL.createObjectURL(audioObj.blob);
      console.log("audioURL: " + audioURL);
       
      const mySound = new Audio(audioURL);
      mySound.play()
      // audioRef.current.src = audioURL;
      // audioRef.current.play();
    }
  };

export {getAudio, startRecording, stopRecording, getDurationFormatted, handlePlayAudioOnClick};