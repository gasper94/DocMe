import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { createParam } from 'solito';
import { SafeAreaView } from 'moti';
import { NavigationScreen } from '../components/NavigationBar/NavigationBar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StylessButton } from 'app/components/StylessButton/StylessButton';
import Input from 'app/components/Input/input';
import { DisplayItem } from 'app/testingInput/index';
import COLORS from "../../design/const";


// Components
import AudioRecorder from '../audioRecorder/AudioRecorder';

const { useParam } = createParam<{ id: string }>();
const GOOGLE_API_KEY = process.env.GOOGLE_API;

export function ActivityScreen(onFocus = () => {}, ...props) {
  const [email, setEmail] = useState('');
  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id');

  const data = [
    // {
    //   placeholder: "Enter start place (point A)",
    //   iconName: "icon",
    //   label: "Start (point A)",
    // },
    // {
    //   placeholder: "Enter end place (point B)",
    //   iconName: "icon",
    //   label: "Finish (point B)",
    // },
    {
      placeholder: "Enter calories burned",
      iconName: "icon",
      label: "Calories Burned",
    },
    {
      placeholder: "Did you drink water?",
      iconName: "icon",
      label: "Drank water",
    },
    {
      placeholder: "How are you feeling?",
      iconName: "icon",
      label: "Mood",
    },
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
      <View className='flex w-full'>
        <NavigationScreen />
      </View>
  
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
              <DisplayItem label={"Start (point A)"}/>
              <DisplayItem label={"Start (point B)"}/>
            </View>
          </>
        }

        ListFooterComponent={
          <>
            <TouchableOpacity style={styles.button} onPress={() => alert("Ready to save form")}>
              <Text style={styles.buttonText}>Submit Activity</Text>
            </TouchableOpacity>
          </>
        }
      />
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActivityScreen;
