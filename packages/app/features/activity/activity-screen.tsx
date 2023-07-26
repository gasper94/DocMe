import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { ScrollView } from 'react-native-gesture-handler';
import Calendar from '../home/Calendar'
import { Button, StyleSheet } from 'react-native';
import { useState } from 'react';

// Components
import AudioRecorder from '../audioRecorder/AudioRecorder';
import { Button as RecordingButton} from "../../components/Button/index";
import { StylessButton } from 'app/components/StylessButton/StylessButton';

// assets
import ExclamationCircle from "../../../assets/Icons/exclamation/exclamation"

const { useParam } = createParam<{ id: string }>()

export function ActivityScreen() {

  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id')

  return (
    <View style={styles.outer}>
      <View >
      {/* <NavigationScreen /> */}
      </View>
      <View style={styles.container} className='bg-yellow-100'>

        {/* Content Component */}
        <View className="flex justify-center items-center flew-row w-full h-auto bg-red-200">
          <H1 className='mb-12'>Log Physical Activity</H1>

          {/* <View className='flex flex-row justify-center items-center'>
            <StylessButton handleOnPress={() => console.log("Press Example")}>Example</StylessButton>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'black', height: 15, marginHorizontal: 10 }} />
             <StylessButton handleOnPress={() => console.log("Press Checklist")}>Checklist</StylessButton>
          </View> */}

          <View className="flex flex-row  p-2 bg-gray-400 w-96 border-round h-auto p-4">
            <ExclamationCircle/>
            <Text className='mt-0.5'>Record yourself reading the following text outloud.</Text>
          </View>


          <View>
          <A className='text-xl mb-1'>Script</A>
          <Text className='w-96 text-base text-left'>
            Today, I went for a walk from <Text style={{ fontWeight: 'bold' }}>[Point  A]</Text> to <Text style={{ fontWeight: 'bold' }}>[Point  B]</Text>.
            I burned <Text style={{ fontWeight: 'bold' }}>[Number of Calories]</Text> Calories and <Text style={{ fontWeight: 'bold' }}>[drank water]</Text>. Overall, I feel <Text style={{ fontWeight: 'bold' }}>[How you feel]</Text>.
          </Text>
          </View>


          <View className='mt-8 mb-8'>
            <A className='text-xl mb-1'>Example</A>
            <Text className='w-96 text-base text-left'>
              Today, I went for a walk from <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>San Francisco California USA</Text> to <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>El Salvador</Text>.
              I burned <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>350 calories</Text> and <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>drank water</Text>. Overall, I feel <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>happy and relax</Text>.
            </Text>
          </View>

         
          {/* <RecordingButton style={{backgroundColor: 'pink'}}>Record</RecordingButton> */}
          <AudioRecorder />

          <View className='flex flex-row gap-4 m-4'>
            <TextLink className='mt-4' href="/">Cancel</TextLink>
            <TextLink className='mt-4' href="/">Next Step</TextLink>
          </View>
        </View>
      </View>
    </View>
  )

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    flex: 1,
  },
});
