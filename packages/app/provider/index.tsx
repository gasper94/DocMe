import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'

// State Management
import { Provider as ReduxProvider } from 'react-redux';
import {store} from '../../store/store';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SafeArea>
        <NavigationProvider>{children}</NavigationProvider>
      </SafeArea>
    </ReduxProvider>
  )
}
