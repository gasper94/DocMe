import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from '../../features/login_page/screen'
import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/screen'
import { ActivityScreen } from '../../features/activity/screen'
import { ActivityFormScreen } from '../../features/form/screen'
import { SavedActivities } from '../../features/savedActivities/SavedActivities'

const Stack = createNativeStackNavigator<{
  login: undefined
  home: undefined
  'user-detail': undefined
  'user-activity': undefined
  'user-form': undefined
  'saved-activities': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the navigation bar
      }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
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
      <Stack.Screen
        name="user-form"
        component={ActivityFormScreen}
        options={{
          title: 'Form',
        }}
      />

      <Stack.Screen
        name="saved-activities"
        component={SavedActivities}
        options={{
          title: 'Form',
        }}
      />
    </Stack.Navigator>
  )
}
