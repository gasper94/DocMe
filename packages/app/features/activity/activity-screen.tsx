import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { ScrollView } from 'react-native-gesture-handler';
import Calendar from '../home/Calendar'
import { Button, StyleSheet } from 'react-native';
import { useState } from 'react';

// Components
import { Button as DocMeButton} from "../../components/Button/index";
import { StylessButton } from 'app/components/StylessButton/StylessButton';

const { useParam } = createParam<{ id: string }>()

export function ActivityScreen() {

  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id')

  return (
    <View style={styles.outer}>
      <View >
      <NavigationScreen />
      </View>
      <View style={styles.container} className='bg-pink-100'>

        {/* Content Component */}
        <View className="flex justify-center items-center flew-row w-full h-auto gap-8">
          <H1>Log physical Activity</H1>

          <View className='flex flex-row justify-center items-center'>
            <StylessButton handleOnPress={() => console.log("Press Example")}>Example</StylessButton>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'black', height: 15, marginHorizontal: 10 }} />
             <StylessButton handleOnPress={() => console.log("Press Checklist")}>Checklist</StylessButton>
          </View>




          {exampleOne ?
            <Text className='w-80 text-lg text-justify'>
              Today I went for a walk from <Text style={{ fontWeight: 'bold' }}>San Francisco, California, USA</Text> to <Text style={{ fontWeight: 'bold' }}>El Salvador</Text>.
              I burned <Text style={{ fontWeight: 'bold' }}>350 calories</Text> and <Text style={{ fontWeight: 'bold' }}>drank water</Text>. Overall, I feel <Text style={{ fontWeight: 'bold' }}>happy and relax</Text>.
            </Text>
          :
            <Text className='w-80 text-lg text-justify'>
              Today I went for a walk from <Text style={{ fontWeight: 'bold' }}>[Point A]</Text> to <Text style={{ fontWeight: 'bold' }}>[Point B]</Text>.
              I burned <Text style={{ fontWeight: 'bold' }}>[Number of Calories]</Text> Calories and <Text style={{ fontWeight: 'bold' }}>[drank water]</Text>. Overall, I feel <Text style={{ fontWeight: 'bold' }}>[How you feel]</Text>.
            </Text>
          }

         
          <DocMeButton style={{backgroundColor: 'pink'}}>Hey</DocMeButton>

          <Button title="Start Recording Should go here!" onPress={() => console.log('Button pressed!')} />
          
          <TextLink href="/">👈 Go Home</TextLink>
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
