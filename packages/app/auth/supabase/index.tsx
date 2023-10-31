import 'react-native-url-polyfill/auto'
import React from 'react'

import { EmailOtpType, createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
// import { useSegments, useRouter } from 'expo-router'

import { SupabaseContext } from './SupabaseContext'

import { useRouter } from 'solito/router'

const supabaseUrl =
  process.env.NEXT_PUBLIC_PLATFORM === 'web'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : process.env.supabaseUrl

const supabaseKey =
  process.env.NEXT_PUBLIC_PLATFORM === 'web'
    ? process.env.NEXT_PUBLIC_SUPABASE_KEY
    : process.env.supabaseKey

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(isLoggedIn: boolean) {
  const router = useRouter()

  React.useEffect(() => {
    if (
      // If the user is not logged in and the initial segment is not anything in the auth group.
      !isLoggedIn
    ) {
      // Redirect to the sign-up page.
      router.replace('/login')
    } else if (isLoggedIn) {
      // Redirect away from the sign-up page.
      router.replace('/home')
    }
  }, [isLoggedIn])
}

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[]
}

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isTest, setIsTest] = React.useState<string>('This is a test - web')
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false)

  const supabase = createClient(
    supabaseUrl, // @ts-ignore
    supabaseKey, // @ts-ignore
    {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  )

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }

  const verifyOtp = async (
    email: string,
    token: string,
    type: EmailOtpType
  ) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    })
    if (error) throw error
    setLoggedIn(true)
  }

  const signInWithPassword = async (email: string, password: string) => {
    console.log(email, password)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    setLoggedIn(true)
  }

  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setLoggedIn(false)
  }

  const LoggedInUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data
  }

  const getSession = async (supabase) => {
    // console.log('supabase:', supabase)

    const result = await supabase.auth.getSession()
    console.log('results:', result)
    setLoggedIn(result.data.session !== null)
  }

  React.useEffect(() => {
    getSession(supabase)
    console.log('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  useProtectedRoute(isLoggedIn)

  return (
    <SupabaseContext.Provider
      value={{
        isTest,
        isLoggedIn,
        signInWithPassword,
        verifyOtp,
        signUp,
        resetPasswordForEmail,
        signOut,
        LoggedInUser,
        supabase,
      }}
    >
      {props.children}
    </SupabaseContext.Provider>
  )
}
