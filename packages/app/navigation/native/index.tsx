import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { ActivityScreen } from '../../features/activity/activity-screen';

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  'user-activity': {
    id: string
  }
}>()


export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the navigation bar
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="user-activity"
        component={ActivityScreen}
        options={{
          title: 'Activity',
        }}
      />
    </Stack.Navigator>
  )
}
