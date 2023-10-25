import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'
import { Text } from 'app/design/typography'

// State Management
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'

// Supabase
import { SupabaseProvider } from '../auth/supabase/index'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SafeArea>
        <NavigationProvider>
          <SupabaseProvider>
            <>{children}</>
          </SupabaseProvider>
        </NavigationProvider>
      </SafeArea>
    </ReduxProvider>
  )
}
