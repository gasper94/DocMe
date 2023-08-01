import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { ScrollView } from 'react-native-gesture-handler';
import Calendar from '../home/Calendar'
import { Button, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

// Components
import AudioRecorder from '../audioRecorder/AudioRecorder';
import { Button as RecordingButton} from "../../components/Button/index";
import { StylessButton } from 'app/components/StylessButton/StylessButton';
import Input from 'app/components/Input/input';

// assets
import ExclamationCircle from "../../../assets/Icons/exclamation/exclamation"
import { SafeAreaView } from 'moti';

// COLORS
import COLORS from "../../design/const";

const { useParam } = createParam<{ id: string }>()

export function ActivityScreen(
  onFocus = () => {},
  ...props
) {

  const [email, setEmail] = useState('');
  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id')



  return (
    <SafeAreaView
      style={{backgroundColor: 'white', flex: 1}}  
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>Register</Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>Enter Your Details to Register</Text>
        <View style={{marginVertical: 20}}>
          
            <Input 
              placeholder="Enter your email address"
              iconName="icon" 
              label="Email"
              // error={"Input Email"}
            />
        </View>
      </ScrollView>
    </SafeAreaView>

    


    // <View style={styles.outer}>
    //   <View >
    //   </View>

    //   <View style={styles.container} className='bg-yellow-100'>
    //     <View className="flex justify-center items-center flew-row w-full h-auto bg-red-200">
    //       <H1 className='mb-12'>Log Physical Activity</H1>

    //       <View className="flex flex-row  p-2 bg-gray-400 w-96 border-round h-auto p-4">
    //         <ExclamationCircle/>
    //         <Text className='mt-0.5'>Record yourself reading the following text outloud.</Text>
    //       </View>


    //       <View>
    //       <A className='text-xl mb-1'>Script</A>
    //       <Text className='w-96 text-base text-left'>
    //         Today, I went for a walk from <Text style={{ fontWeight: 'bold' }}>[Point  A]</Text> to <Text style={{ fontWeight: 'bold' }}>[Point  B]</Text>.
    //         I burned <Text style={{ fontWeight: 'bold' }}>[Number of Calories]</Text> Calories and <Text style={{ fontWeight: 'bold' }}>[drank water]</Text>. Overall, I feel <Text style={{ fontWeight: 'bold' }}>[How you feel]</Text>.
    //       </Text>
    //       </View>


    //       <View className='mt-8 mb-8'>
    //         <A className='text-xl mb-1'>Example</A>
    //         <Text className='w-96 text-base text-left'>
    //           Today, I went for a walk from <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>San Francisco California USA</Text> to <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>El Salvador</Text>.
    //           I burned <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>350 calories</Text> and <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>drank water</Text>. Overall, I feel <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>happy and relax</Text>.
    //         </Text>
    //       </View>

    //       <AudioRecorder />

    //       <View className='flex flex-row gap-4 m-4'>
    //         <TextLink className='mt-4' href="/">Cancel</TextLink>
    //         <TextLink className='mt-4' href="/">Next Step</TextLink>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  )

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'COLORS.white',
    flex: 1,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    // marginHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  textEdit: {
    height: 40, 
    borderColor: 'grey', 
    backgroundColor: 'white',
    borderWidth: 1
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   outer: {
//     flex: 1,
//   },
//   // input: {
//   //   width: '100%',
//   //   height: 40,
//   //   borderColor: 'gray',
//   //   borderWidth: 1,
//   //   paddingHorizontal: 8,
//   //   marginBottom: 12,
//   // },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginBottom: 12,
//   },
//   inputIcon: {
//     marginRight: 1,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     paddingHorizontal: 8,
//   },
//   button: {
//     backgroundColor: 'blue',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });



{/* <View style={styles.container}>
          <View style={styles.inputContainer}>
            <ExclamationCircle />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={(text) => {}}
              value={"hello"}
            />
          </View>
        </View> */}