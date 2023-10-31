import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Alert, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'moti'
import { Input } from 'hammerjs'
import { TextInput } from 'react-native-gesture-handler'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Auth
import { useSupabase } from '../../auth/supabase/useSupabase'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please enter at least 8 character.')
    .max(64, 'Please enter fewer than 64 characters.'),
})

export function Login() {
  const { isTest, signInWithPassword, LoggedInUser, signOut } = useSupabase()

  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [email, setEmail] = useState<String | null>('')
  const [password, setPassword] = useState<String | null>('')

  const alertRef = React.useRef<any>(null)

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors: isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleEmailInput = (text) => {
    setEmail(text)
  }

  const handlePasswordInput = (text) => {
    setPassword(text)
  }

  const handleLogin = async () => {
    const data = await LoggedInUser()
    setCurrentUser(data)
    console.log('data:', isTest, ':', data)
  }

  const handleSignOut = async () => {
    await signOut()
    setCurrentUser(null)
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // console.log(data.email, data.password)
      await signInWithPassword(data.email, data.password)
    } catch (error: Error | any) {
      alertRef.current?.showAlert({
        variant: 'destructive',
        title: 'Error',
        message: error.message,
      })
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>is test:</Text>

      <Text>{`${JSON.stringify(currentUser)}`}</Text>

      <Button title="get user" onPress={handleLogin} />
      <Button title="signout" onPress={handleSignOut} />
      {/* <TextInput
        style={{ width: 200, borderWidth: 1, padding: 8 }}
        placeholder="Enter Email"
        value={`${email}`}
        onChangeText={handleEmailInput}
      /> */}

      {/* <TextInput
        style={{ width: 200, borderWidth: 1, padding: 8 }}
        placeholder="Email"
        value={'Ulises'}
        onChangeText={() => {}}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
      /> */}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ width: 200, borderWidth: 1, padding: 8 }}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              trigger('email')
              onBlur()
            }}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
          />
        )}
      />

      {/* <TextInput
          style={{ width: 200, borderWidth: 1, padding: 8 }}
          placeholder="Enter Password"
          value={`${password}`}
          onChangeText={handlePasswordInput}
        /> */}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ width: 200, borderWidth: 1, padding: 8 }}
            placeholder="Enter Password"
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              trigger('password')
              onBlur()
            }}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      {/* <Button title="Log in" onPress={handleLogin} /> */}

      <Text>This is the Login Page</Text>
      <TextLink href="/home">👈 Go Home</TextLink>
    </View>
  )
}
