import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/lib/auth-context';
import { PrefsProvider } from '@/lib/prefs-context';
import { AppThemeProvider } from '@/lib/theme-context';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <AuthProvider>
            <PrefsProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </PrefsProvider>
          </AuthProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
