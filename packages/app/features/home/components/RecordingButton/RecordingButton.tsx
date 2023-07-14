import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { A, H1, P, Text, TextLink } from 'app/design/typography'

const LongPressButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  let timerId;

  const handlePressIn = () => {
    // timerId = setTimeout(() => {
      // Perform long press action here
      setIsPressed(true);
    // }, 500); // Adjust the duration as needed
  };

  const handlePressOut = () => {
    // clearTimeout(timerId);
    if (isPressed) {
      // Perform release action here
      setIsPressed(false);
    }
  };

  return (
    <Text className='bg-red-100'>Long Press Button!</Text>

    // <View className='flex justify-center items-center bg-red-300 h-full'>
    //     <Text>{`${isPressed ? 'Recording...': 'Ready to record'}`}</Text>
    //     <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
    //     <View className=' flex justify-center items-center h-32 w-32 rounded-full' style={styles.recordingButton}>
    //         <Text style={{ color: 'white' }}>Press and Hold</Text>
    //     </View>
    //     </TouchableWithoutFeedback>
    // </View>
  );
};

export default LongPressButton;