import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

// import React, { useState } from 'react';

// Components

export function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>This is the Login Page</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
