import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'

//
import { Text } from 'app/design/typography'

// State Management
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import { SupabaseProvider } from '../store/context/supabase/SupabaseProvider'

// Supabase

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SafeArea>
        <SupabaseProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </SupabaseProvider>
      </SafeArea>
    </ReduxProvider>

    // <SupabaseProvider>
    //   <Text>Hello entry point</Text>
    // </SupabaseProvider>
  )
}
