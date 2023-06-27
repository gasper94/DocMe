import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { MotiLink } from 'solito/moti'

import Calendar from './Calendar';
import { useEffect, useReducer } from 'react';
import { StyleSheet, Pressable, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
// import { HeroOutline, HeroSolid, HeroSolid20 } from '@nandorojo/heroicons'
import RightIcon from '../../../assets/Icons/right/Right';
import XMenu from './Xmenu';
import React, { useState } from 'react';

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
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <View className="flex-1 items-center justify-center p-3">

      {/* <SafeAreaView className="fixed top-0 left-0 right-0 flex-1">
        <View className="flex-1 relative bg-white">
          
            <View className="px-4 flex-row justify-between items-center bg-gray-300">
              <Text>Image</Text>
              <View className="flex-row items-center space-x-2">
              <Text className="text-base font-semibold">New York, NYC</Text>
              </View>
              <Text>Bell Icon</Text>
            </View>
        </View>
      </SafeAreaView> */}
      {/* <XMenu size={400} color="white" mode={visible ? 'menu' : 'x'} /> */}
      {/* <View
      style={[styles.container, isHovered && styles.containerHovered]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text style={styles.text}>Hover Me</Text>
    </View> */}

      <Calendar />
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


      {/* Navigation */}
      {/* <SafeAreaView className="flex-1"> */}
        {/* <View className="px-4 flex-row justify-between items-center bg-gray-300">
          <Text>Image</Text>
          <View className="flex-row items-center space-x-2">
          <Text className="text-base font-semibold">New York, NYC</Text>
          </View>
          <Text>Bell Icon</Text>
        </View> */}


        {/* <View className='gird grid-rows-4 grid-flow-col gap-4'>
           <Text>Hello</Text>
        </View> */}
      {/* </SafeAreaView> */}
      


        {/* <TouchableWithoutFeedback
          onPress={() => console.log('Button clicked!')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
        <View style={buttonStyle}>
          <Text>Button</Text>
        </View>
      </TouchableWithoutFeedback> */}

       {/* <Pressable onPress={toggle} style={styles.container}>
        <Text>Press to change Icon color</Text>
      </Pressable>
       */}
      {/* <RightIcon width={24} height={24} fill={visible ? 'red' : 'blue'} />  */}

      
       {/* <HeroOutline.Calendar height="24" width="24" color="#8A8F98" /> */}
      <H1>Welcome to Solito - Outsidewwy.</H1>
      <Text>Hello</Text>
      <RedBox />
      {/* <View className='bg-red-200 h-[32px] w-[32px]'>hey</View> */}
      
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P className="text-center">
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Fernando Rojo
          </A>
          .
        </P>
        <P className="text-center">
          NativeWind is made by{' '}
          <A
            href="https://twitter.com/mark__lawlor"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Mark Lawlor
          </A>
          .
        </P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <TextLink href="/user/fernando">Regular Link</TextLink>
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text selectable={false} className="text-base font-bold">
            Moti Link
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
