import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity, View, StyleSheet, FlatList, Button } from 'react-native';
import { createParam } from 'solito';
import { SafeAreaView, ScrollView } from 'moti';
import { NavigationScreen } from '../components/NavigationBar/NavigationBar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StylessButton } from 'app/components/StylessButton/StylessButton';
import Input from 'app/components/Input/input';
import { DisplayItem } from 'app/testingInput/index';
import COLORS from '../../design/const';
import AudioRecorder from '../audioRecorder/AudioRecorder';
import { A, H1 } from 'app/design/typography';
import { ExclamationCircle } from '@nandorojo/heroicons/24/outline';

interface Transcript {
  calories?: number;
  pointA?: string;
  pointB?: string;
  mood?: string[];
  drankWater?: boolean;
  // Add other properties related to the transcript if needed
  // For example: pointA: string, pointB: string, drankWater: boolean, etc.
}

const { useParam } = createParam<{ id: string }>();
const GOOGLE_API_KEY = process.env.GOOGLE_API;

export function ActivityScreen(onFocus = () => {}, ...props) {
  const [email, setEmail] = useState('');
  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id');
  const [currentStep, setCurrentStep] = useState(1); // Start with the first step

  const [pointAFlag, setPointAFlag] = useState(false);
  const [pointBFlag, setPointBFlag] = useState(false);
  const [calories, setCalories] = useState<Number | null>(null);
  const [pointA, setPointA] = useState<String | null>(null);
  const [pointB, setPointB] = useState<String | null>(null);
  const [mood, setMood] = useState<String[] | null>(null);
  const [drankWater, setDrankwater] = useState<boolean | null>(null);

  // Audio Recording Transcript
  const [transcript, setTranscript] = useState(null);
  const [transcriptObject, setTranscriptObject] = useState<Transcript | null>(null);

  useEffect(() => {
    if(transcriptObject){
      console.log("Activity-screen:", transcriptObject);
      console.log("Activity-screen:", transcriptObject.calories);
    }

    if (transcriptObject && transcriptObject.calories) {
      setCalories(transcriptObject.calories);
    }

    if (transcriptObject && transcriptObject.pointA) {
      setPointA(transcriptObject.pointA);
    }

    if (transcriptObject && transcriptObject.pointB) {
      setPointB(transcriptObject.pointB);
    }

    if (transcriptObject && transcriptObject.mood) {
      setMood(transcriptObject.mood);
    }

    if (transcriptObject && transcriptObject.drankWater) {
      setDrankwater(transcriptObject.drankWater);
    }

    // await console.log("PointA: ", transcriptObject.pointA);
    // await console.log("PointB: ", transcriptObject.pointB);
    // await console.log("mood: ", transcriptObject.drankWater);

  },[transcriptObject]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);

    console.log("transcriptObject:", transcriptObject);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const data = [
    // {
    //   placeholder: 'Enter calories burned',
    //   iconName: 'icon',
    //   label: 'Calories Burned',
    // },
    // {
    //   placeholder: 'Did you drink water?',
    //   iconName: 'icon',
    //   label: 'Drank water',
    // },
    // {
    //   placeholder: 'How are you feeling?',
    //   iconName: 'icon',
    //   label: 'Mood',
    // },
  ];

  const renderItem = ({ item }) => (
    <Input
      placeholder={item.placeholder}
      iconName={item.iconName}
      label={item.label}
      error={undefined}
      password={undefined}
    />
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View className="flex w-full">
        <NavigationScreen />
      </View>
        
      {currentStep === 1 && (
            <View className="flex justify-center items-center flew-row w-full h-auto bg-red-200 mt-12">
            <H1 className='mb-12'>Log Physical Activity</H1>
            <View className="flex flex-row  p-2 bg-gray-400 w-96 border-round h-auto p-4">
              <ExclamationCircle/>
              <Text className='mt-0.5'>Record yourself reading the following text outloud.</Text>
            </View>

            {transcript ?
              <View>
                <A className='text-xl mb-1 mt-4'>Your Script</A>
                <Text className='w-96 text-base text-left'>
                  {transcript}
                </Text>
              </View>
            :
            <>
            <View>
              <A className='text-xl mb-1 mt-4'>Script</A>
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
            </>
            }
            <AudioRecorder setTranscript={setTranscript} setTranscriptObject={setTranscriptObject}/>
              {transcript ?
                <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              :null}
            </View>
      )}

      {currentStep === 2 && (
        <View style={{ backgroundColor: 'white', height: '100%' }}>

          <FlatList
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{
              paddingTop: 10,
              paddingHorizontal: 20,
            }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Register</Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter Your Details to Register</Text>

                <View style={{marginTop: 20}}>
                  <DisplayItem label={"Start (point A)"} currentLocation={pointA}/>
                  <DisplayItem label={"Start (point B)"} currentLocation={pointB}/>
                  <Input
                    placeholder={'Enter Calories'}
                    iconName={'icon'}
                    label={"Calories burned"}
                    value={calories}
                    error={undefined}
                    password={undefined}
                  />
                  <Text>{`Calories: ${calories}`}</Text>
                  <View style={{display: 'flex', flexDirection: 'row', }}>
                    <View style={{display: 'flex', justifyContent: 'center', flex: 1,}}>
                      <Input
                        placeholder={'Enter Mood'}
                        iconName={'icon'}
                        label={"Mood"}
                        value={null}
                        error={undefined}
                        password={undefined}
                      />
                    </View>
                    <View style={{display: 'flex', justifyContent: 'center', width: '25%', paddingTop: 16}}>
                      {/* <Button title='Hello there!' /> */}
                      <TouchableOpacity style={styles.buttonx} onPress={() => alert("Ready to save form")}>
                        <Text style={styles.buttonText}>add</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Text>Mood:</Text>
                    {mood && mood.length > 1 ? (
                      mood.map((item, index) => (
                        <View >
                          <Text key={index}>{item}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>Empty</Text>
                    )}
                  </View>
                  <Input
                    placeholder={'Did you drink water?'}
                    iconName={'icon'}
                    label={"Did you drink water?"}
                    value={drankWater}
                    error={undefined}
                    password={undefined}
                  />
                  <Text>{`Drank Water: ${drankWater}`}</Text>
                </View>
              </>
            }

            ListFooterComponent={
              <>
                <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => alert("Ready to save form")}>
                  <Text style={styles.buttonText}>Submit Activity</Text>
                </TouchableOpacity>
              </>
            }
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonx: {
    backgroundColor: COLORS.blue,
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    marginLeft: 12,
  },
});

export default ActivityScreen;
