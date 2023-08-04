import { DisplayItem } from 'app/testingInput';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

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

  const styles = StyleSheet.create({
    recordingButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 9999,
      backgroundColor: isPressed ? 'green' : 'pink',
      height: 164,
      width: 164,
      cursor: 'pointer',
    },
  });

  return (
    <View>
      <Text className='bg-red-100'>Hello there!</Text>
    </View>
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


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const submitForm = () => {
    // Process the form data
    alert(name + email + password);
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={{ display: 'flex', backgroundColor: 'pink', height: '100%'}}>
          {/* <View>
            <Text>Image section</Text>
          </View> */}
          <Text>IMAGE</Text>
          <DisplayItem />
          <Button title="Next" onPress={nextStep} />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text>Step 2</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Button title="Previous" onPress={previousStep} />
          <Button title="Next" onPress={nextStep} />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text>Step 3</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <Button title="Previous" onPress={previousStep} />
          <Button title="Submit" onPress={submitForm} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 52,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MultiStepForm;
