'use client'

import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View, Button } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { SolitoImage } from 'solito/image'
import { TextInput } from 'react-native';
import Calendar from './Calendar';
import { useEffect, useReducer } from 'react';
import { Image, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
// import { HeroOutline, HeroSolid, HeroSolid20 } from '@nandorojo/heroicons'
import RightIcon from '../../../assets/Icons/right/Right';
import XMenu from './Xmenu';
import React, { useState } from 'react';

import { SafeAreaView } from 'moti';
import { ScrollView } from 'react-native-gesture-handler';

import AssetExample from "./Asset.jsx"

// Components
import DistanceCalculator from "./DistanceCalculator";
import AudioRecorder from '../audioRecorder/AudioRecorder';
import GenerateCV from "../extractData/extractData";
import LongPressButton from './components/RecordingButton/RecordingButton'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'

const RedBox = () => {
  return <View className='bg-red-300 w-full'>
    <Text>Box</Text>
  </View>
}

export function HomeScreen() {
  const [visible, toggle] = useReducer((s) => !s, true);
 const [isHovered, setIsHovered] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

   const buttonStyle = {
    backgroundColor: isPressed ? 'blue' : 'red',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer'
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <View className="flex-1 items-center justify-center p-3">

      <View className='flex w-full'>
        <NavigationScreen />
      </View>

    {/* <View>
      <AudioRecorder />
      <DistanceCalculator />
    </View> */}
    <ScrollView style={{paddingTop: 20}}>
      <View className='flex justify-center items-center flex-col'>
        <Calendar />
      </View>
    </ScrollView>
    
      {/* <View
        style={[styles.container, isHovered && styles.containerHovered]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <TouchableHighlight
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.button, isHovered && styles.buttonHovered]}
          underlayColor="red"
        >
          <Text style={styles.buttonText}>Hover Me2</Text>
        </TouchableHighlight>
      </View> */}

        {/* This bellow is a touchable button */}
        {/* <TouchableWithoutFeedback
          onPress={() => console.log('Button clicked!')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
        <View style={buttonStyle}>
          <Text>Button</Text>
        </View>
      </TouchableWithoutFeedback> */}
      
      <Row className="space-x-8">
        {/* <TextLink href="/user/fernando">Regular Link</TextLink>
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          } }
          transition={{
            type: 'timing',
            duration: 150,
          }} style={undefined} onLayout={undefined}        >
          <Text selectable={false} className="text-base font-bold">
            Moti Link
          </Text>
        </MotiLink> */}
        <MotiLink
          href="/activity/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          } }
          transition={{
            type: 'timing',
            duration: 150,
          }} style={undefined} onLayout={undefined}>
          <Text selectable={false} className="text-base font-bold">
            Add Activity
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 550,
    width: 550,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    height: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
     borderRadius: 5,
  },
  //  container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonHovered: {
    backgroundColor: 'red',
     borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerHovered: {
    backgroundColor: 'red',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
