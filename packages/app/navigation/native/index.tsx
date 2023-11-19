import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from '../../features/login/screen'
import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/screen'
import { ActivityScreen } from '../../features/activity/screen'
import { ActivityFormScreen } from '../../features/form/screen'
import { SavedActivities } from '../../features/savedActivities/SavedActivities'
import { ActivityForm } from '../../features/activity-form/screen'

const Stack = createNativeStackNavigator<{
  login: undefined
  home: undefined
  'user-detail': undefined
  'user-activity': undefined
  'user-form': undefined
  'saved-activities': undefined
  formx: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Hide the navigation bar
      }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="activity-form"
        component={ActivityForm}
        options={{
          title: 'Form',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="user-form"
        component={ActivityFormScreen}
        options={{
          title: 'Form',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="saved-activities"
        component={SavedActivities}
        options={{
          title: 'Form',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}
