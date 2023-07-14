import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { ScrollView } from 'react-native-gesture-handler';
import Calendar from '../home/Calendar'

const { useParam } = createParam<{ id: string }>()

export function ActivityScreen() {
  const [id] = useParam('id')

  return (
    // <View className="flex-1 items-center justify-center bg-blue-400">
      
    //   <View className='h-32 mb-4 bg-red-100'>
    //     <Text className='bg-red-100'>Activitx - {id}</Text>
    //   </View>
    //   <TextLink href="/">👈 Go Home</TextLink>
    // </View>
    <View className='flex-1 items-center justify-center p-3'>
      <View className='flex w-full'>
        <NavigationScreen />
      </View>
      <ScrollView>
        <View className='flex justify-center items-center flex-col'>
          <Calendar />
        </View>
      </ScrollView>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
