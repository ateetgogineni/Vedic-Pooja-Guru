import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTheme } from '@/lib/theme-context';
import { TabNavigator } from '@/navigation/TabNavigator';
import type { RootStackParamList } from '@/navigation/types';
import { AuthScreen } from '@/screens/AuthScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { ChecklistScreen } from '@/screens/ChecklistScreen';
import { HeadcountScreen } from '@/screens/HeadcountScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { LanguageScreen } from '@/screens/LanguageScreen';
import { MuhuratScreen } from '@/screens/MuhuratScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { PoojaDetailScreen } from '@/screens/PoojaDetailScreen';
import { SplashScreen } from '@/screens/SplashScreen';
import { TraditionScreen } from '@/screens/TraditionScreen';
import { WalkthroughScreen } from '@/screens/WalkthroughScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Tradition" component={TraditionScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="PoojaDetail" component={PoojaDetailScreen} />
      <Stack.Screen name="Headcount" component={HeadcountScreen} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} />
      <Stack.Screen name="Muhurat" component={MuhuratScreen} />
      <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}
