'use client'

import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View, Button, ScrollView } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { SolitoImage } from 'solito/image'
import { TextInput } from 'react-native'
import Calendar from './Calendar'
import { useEffect, useReducer } from 'react'
import {
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
// import { HeroOutline, HeroSolid, HeroSolid20 } from '@nandorojo/heroicons'
import RightIcon from '../../../assets/Icons/right/Right'
import XMenu from './Xmenu'
import React, { useState } from 'react'

import { SafeAreaView } from 'moti'
// import { ScrollView } from 'react-native-gesture-handler'

import AssetExample from './Asset.jsx'

// Components
import DistanceCalculator from './DistanceCalculator'
import AudioRecorder from '../audioRecorder/AudioRecorder'
import GenerateCV from '../extractData/extractData'
import LongPressButton from './components/RecordingButton/RecordingButton'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'

// Interfaces
import { RootState } from '../../store/store'

// State Management
import { useSelector } from 'react-redux'

import { useRouter } from 'solito/router'

const RedBox = () => {
  return (
    <View className="w-full bg-red-300">
      <Text>Box</Text>
    </View>
  )
}

// const Card = () => {
//   return (
//     <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//       <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
//         <img
//           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
//           alt="image"
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
//           startups
//         </h6>
//         <h4 className="text-blue-gray-900 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
//           Lyft launching cross-platform service this week
//         </h4>
//         <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
//           Like so many organizations these days, Autodesk is a company in
//           transition. It was until recently a traditional boxed software company
//           selling licenses. Yet its own business model disruption is only part
//           of the story
//         </p>
//         <a className="inline-block" href="#">
//           <button
//             className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             type="button"
//           >
//             Learn More
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke-width="2"
//               stroke="currentColor"
//               aria-hidden="true"
//               className="h-4 w-4"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//               ></path>
//             </svg>
//           </button>
//         </a>
//       </div>
//     </div>
//   )
// }

const Card = () => {
  return (
    <View style={stylex.cardContainer}>
      <View style={stylex.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          }}
          style={stylex.image}
        />
      </View>
      <View style={stylex.contentContainer}>
        <Text style={stylex.category}>startups</Text>
        <Text style={stylex.title}>
          Lyft launching cross-platform service this week
        </Text>
        <Text style={stylex.description}>
          Like so many organizations these days, Autodesk is a company in
          transition. It was until recently a traditional boxed software company
          selling licenses. Yet its own business model disruption is only part
          of the story.
        </Text>
        <TouchableOpacity style={stylex.button}>
          <Text style={stylex.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const stylex = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    margin: 16,
  },
  imageContainer: {
    width: '40%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  category: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4', // Pink color
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    borderRadius: 20,
    padding: 12,
  },
  buttonText: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
})

export default Card

export function HomeScreen() {
  const router = useRouter()

  // State Management
  const activity = useSelector((state: RootState) => state.activities.activity)
  const processingActivity = useSelector(
    (state: RootState) => state.activities.processingActivity
  )

  const [visible, toggle] = useReducer((s) => !s, true)
  const [isHovered, setIsHovered] = useState(false)

  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const buttonStyle = {
    backgroundColor: isPressed ? 'blue' : 'red',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleSingOut = () => {
    alert('signout')
  }

  return (
    // <View className="flex-1 items-center justify-center p-3">
    //   <View className="flex w-full">
    //     <NavigationScreen />
    //   </View>

    //   {/* <View>
    //   <AudioRecorder />
    //   <DistanceCalculator />
    // </View> */}
    //   <ScrollView style={{ paddingTop: 20 }}>
    //     <View className="flex flex-col items-center justify-center">
    //       <Calendar />
    //     </View>
    //     {/* <Text>{`Key: ${key}`}</Text> */}
    //   </ScrollView>

    //   <Text>{activity.length}</Text>

    //   {/* <View
    //     style={[styles.container, isHovered && styles.containerHovered]}
    //     onMouseEnter={handleMouseEnter}
    //     onMouseLeave={handleMouseLeave}
    //   >
    //     <TouchableHighlight
    //       onPressIn={handlePressIn}
    //       onPressOut={handlePressOut}
    //       style={[styles.button, isHovered && styles.buttonHovered]}
    //       underlayColor="red"
    //     >
    //       <Text style={styles.buttonText}>Hover Me2</Text>
    //     </TouchableHighlight>
    //   </View> */}

    //   {/* This bellow is a touchable button */}
    //   {/* <TouchableWithoutFeedback
    //       onPress={() => console.log('Button clicked!')}
    //       onPressIn={handlePressIn}
    //       onPressOut={handlePressOut}
    //     >
    //     <View style={buttonStyle}>
    //       <Text>Button</Text>
    //     </View>
    //   </TouchableWithoutFeedback> */}

    //   <Row className="space-x-8">
    //     <MotiLink
    //       href="/user/xxx"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         User
    //       </Text>
    //     </MotiLink>
    //     {/*
    //     <MotiLink
    //       href="/activity/xxx"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Add Activity
    //       </Text>
    //     </MotiLink> */}

    //     <MotiLink
    //       href="/login"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Go to Login
    //       </Text>
    //     </MotiLink>

    //     {/* <MotiLink
    //       href="/saved-activities"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Saved Activities
    //       </Text>
    //     </MotiLink> */}
    //   </Row>
    // </View>

    // // Second View
    // <View className="flex-1 items-center justify-center p-3">
    //   <View className="flex w-full">
    //     <NavigationScreen />
    //   </View>

    //   <Text>Hello there</Text>
    //   <MotiLink
    //     href="/login"
    //     animate={({ hovered, pressed }) => {
    //       'worklet'

    //       return {
    //         scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //         rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //       }
    //     }}
    //     transition={{
    //       type: 'timing',
    //       duration: 150,
    //     }}
    //     style={undefined}
    //     onLayout={undefined}
    //   >
    //     <Text selectable={false} className="text-base font-bold">
    //       Go to Login
    //     </Text>
    //   </MotiLink>
    // </View>

    <View className="flex-1 items-center justify-center">
      <View className="fixed top-0 z-50 flex w-full">
        <NavigationScreen />
      </View>

      {/* <View>
      <AudioRecorder />
      <DistanceCalculator />
    </View> */}

      {/* <View className="flex w-full">
    </View> */}

      {/* <ScrollView >
        <Text>Hello there!</Text>
      </ScrollView> */}

      <ScrollView
        // style={{ margin: 0 }}
        className="z-40 flex h-screen w-full min-[320px]:mt-0 sm:bg-red-100 min-[640px]:pt-20"
      >
        {/* <View className="flex flex-col items-center justify-center">
          <Calendar />
        </View>
        <View className="flex flex-col items-center justify-center">
          <Calendar />
        </View>
        <View className="flex flex-col items-center justify-center">
          <Calendar />
        </View> */}

        {/* <View className="bg-pink-200">
          <Text>Hello there!</Text>
        </View> */}

        <View className="flew-col h-full flex-1 items-center justify-center bg-purple-200">
          {/* <View>
            <Card />
            <Card />
          </View> */}
          <View className="flex w-full justify-center bg-purple-500 min-[320px]:flex-col md:flex-row">
            <View className="min-w-96 max-w-96 h-auto w-auto min-[320px]:bg-purple-300 min-[640px]:bg-green-100">
              <View className=" mt-4 flex h-80 w-96 items-center justify-center">
                <Calendar />
              </View>
            </View>
            <View className="h-auto max-w-xl bg-blue-100 min-[320px]:w-full">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
            <View className="min-w-96 block w-auto min-[320px]:hidden min-[640px]:block min-[640px]:bg-green-100">
              <View className="w-96">
                <Text>2</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <Text>{`Key: ${key}`}</Text> */}
      </ScrollView>

      {/* <Text>{activity.length}</Text> */}

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
    </View>
  )
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: 'yellow',
    // width: '100%',
    '@media (min-width: 600px)': {
      backgroundColor: 'red', // Change background color for screens with width > 320px
    },
  },

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
})
