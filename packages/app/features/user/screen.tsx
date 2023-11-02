import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native'

// Components
import MultiStepForm from '../MultiStepForm/MultiStepForm'

export function UserDetailScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>Hello</Text>
      <Text>UserPage</Text>
      <TextLink href="/home">👈 Go Home</TextLink>
    </View>
  )
}
