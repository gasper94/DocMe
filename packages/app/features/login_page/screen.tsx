import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Alert, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'moti'
import { Input } from 'hammerjs'
import { TextInput } from 'react-native-gesture-handler'

// import React, { useState } from 'react';

// Components

export function Login() {
  const [email, setEmail] = useState<String | null>('')
  const [password, setPassword] = useState<String | null>('')

  const alertRef = React.useRef<any>(null)

  const handleEmailInput = (text) => {
    setEmail(text)
  }

  const handlePasswordInput = (text) => {
    setPassword(text)
  }

  const handleLogin = () => {
    alert(
      JSON.stringify({
        email: email,
        password: password,
      })
    )
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        {`${JSON.stringify({
          email: email,
          password: password,
        })}`}
      </Text>

      <TextInput
        style={{ width: 200, borderWidth: 1, padding: 8 }}
        placeholder="Enter Email"
        value={`${email}`}
        onChangeText={handleEmailInput}
      />
      <TextInput
        style={{ width: 200, borderWidth: 1, padding: 8 }}
        placeholder="Enter Password"
        value={`${password}`}
        onChangeText={handlePasswordInput}
      />
      <Button title="Log in" onPress={handleLogin} />

      <Text>This is the Login Page</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
