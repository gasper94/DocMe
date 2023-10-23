import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'

//
import { Text } from 'app/design/typography'

// State Management
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
// import { SupabaseProvider } from '../store/context/supabase/SupabaseProvider'

// Supabase

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    // <SupabaseProvider>
    <ReduxProvider store={store}>
      <SafeArea>
        <NavigationProvider>{children}</NavigationProvider>
      </SafeArea>
    </ReduxProvider>
    // </SupabaseProvider>

    // <SupabaseProvider>
    //   <Text>Hello entry point</Text>
    // </SupabaseProvider>
  )
}
