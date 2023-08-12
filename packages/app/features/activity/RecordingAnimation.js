import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const RecordingAnimation = () => {
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

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={{ marginTop: 20 }}
      >
        <Animated.View style={[{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'red' }, animatedStyle]}>
            {isRecording ?
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 40 }}>Recording</Text>
            :
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 40 }}>Record</Text>
            }
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default RecordingAnimation;
