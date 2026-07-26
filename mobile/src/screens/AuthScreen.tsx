import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth-context';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, type AppNavigation } from '@/navigation/hooks';

const ONBOARDING_KEY = 'vedic-vidhi.onboarding-complete';

async function finishOnboarding(navigation: AppNavigation) {
  await AsyncStorage.setItem(ONBOARDING_KEY, '1');
  navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
}

export function AuthScreen() {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();
  const { signInWithPassword, signUpWithPassword, continueAsGuest } = useAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!isSupabaseConfigured) {
      Alert.alert(
        'Backend not connected yet',
        'The database has not been set up yet. Run schema.sql in Supabase and add the project URL/key to mobile/.env — see mobile/README.md. Continuing as guest for now.',
      );
      continueAsGuest();
      finishOnboarding(navigation);
      return;
    }
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter both an email and a password.');
      return;
    }
    setLoading(true);
    const { error } = mode === 'signIn' ? await signInWithPassword(email, password) : await signUpWithPassword(email, password);
    setLoading(false);
    if (error) {
      Alert.alert(mode === 'signIn' ? 'Could not sign in' : 'Could not sign up', error);
      return;
    }
    if (mode === 'signUp') {
      Alert.alert('Check your inbox', 'Confirm your email if required, then sign in.');
      setMode('signIn');
      return;
    }
    finishOnboarding(navigation);
  };

  const guest = () => {
    continueAsGuest();
    finishOnboarding(navigation);
  };

  return (
    <Screen scroll contentStyle={styles.content} edges={['top', 'bottom']}>
      <View style={styles.logoBlock}>
        <AppText style={{ fontSize: 40 }}>🪔</AppText>
        <AppText variant="mantraDisplay" color="primary" center style={{ marginTop: 8 }}>
          Vedic Vidhi
        </AppText>
      </View>

      <View style={styles.welcomeBlock}>
        <AppText variant="headlineLgMobile" center>
          Namaste.
        </AppText>
        <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
          Welcome back to your sanctuary.
        </AppText>
      </View>

      <Card style={{ gap: Spacing.stackMd }}>
        <TextField
          label="Email"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button label={mode === 'signIn' ? 'Sign In' : 'Create Account'} onPress={submit} loading={loading} />
        <AppText variant="bodyMd" color="onSurfaceVariant" center>
          {mode === 'signIn' ? 'New here? ' : 'Already have an account? '}
          <AppText
            variant="bodyMd"
            color="primaryContainer"
            onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
          >
            {mode === 'signIn' ? 'Create Account' : 'Sign In'}
          </AppText>
        </AppText>
      </Card>

      <View style={styles.dividerRow}>
        <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
        <AppText variant="labelSm" color="onSurfaceVariant">
          OR
        </AppText>
        <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
      </View>

      <View style={{ gap: Spacing.gutter }}>
        <Button
          label="Continue with Google"
          variant="secondary"
          icon="account-circle"
          onPress={() => Alert.alert('Coming soon', 'Google sign-in will be available in a future update.')}
        />
        <Button label="Continue as Guest" variant="text" onPress={guest} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd, maxWidth: 420, alignSelf: 'center', width: '100%' },
  logoBlock: { alignItems: 'center', marginTop: Spacing.stackLg },
  welcomeBlock: { alignItems: 'center' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter },
  divider: { flex: 1, height: StyleSheet.hairlineWidth },
});
