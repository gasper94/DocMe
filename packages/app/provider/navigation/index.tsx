import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'login',
            screens: {
              home: 'home',
              login: 'login',
              'user-activity': 'activity/:id',
              'user-detail': 'user/:id',
              'user-form': 'form/:id',
              'saved-activities': 'saved-activities/',
              'activity-form': 'formx/:id',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
