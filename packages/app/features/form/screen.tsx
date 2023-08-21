import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';


// import React, { useState } from 'react';
import { Button } from 'react-native';


export function ActivityFormScreen() {
  // const [id] = useParam('id')

  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>UserPage- Form</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}

