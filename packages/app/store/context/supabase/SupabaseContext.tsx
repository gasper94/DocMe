import { createContext } from 'react'
import { EmailOtpType } from '@supabase/supabase-js'

type SupabaseContextProps = {
  isTest: string
  // isLoggedIn: boolean
  signUp: (email: string, password: string) => Promise<void>
  // verifyOtp: (email: string, token: string, type: EmailOtpType) => Promise<void>
  signInWithPassword: (email: string, password: string) => Promise<void>
  // resetPasswordForEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
  LoggedInUser: () => Promise<any>
  supabase: any
}

export const SupabaseContext = createContext<SupabaseContextProps>({
  isTest: '',
  // isLoggedIn: false,
  signUp: async () => {},
  // verifyOtp: async () => {},
  signInWithPassword: async () => {},
  // resetPasswordForEmail: async () => {},
  signOut: async () => {},
  LoggedInUser: async () => {},
  supabase: async () => {},
})
