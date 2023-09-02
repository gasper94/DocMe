import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Microphone } from '@nandorojo/heroicons/24/outline';


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

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handleStartRecording}
      >
        <Animated.View style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 70, height: 70, borderRadius: 50, backgroundColor: 'red' }, animatedStyle]}>
            {isRecording ?
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
};

export default RecordingAnimation;
