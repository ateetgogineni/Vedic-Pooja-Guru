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
import { useTranslation } from '@/lib/i18n';
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
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const { signInWithPassword, signUpWithPassword, continueAsGuest } = useAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!isSupabaseConfigured) {
      Alert.alert(t('auth.backendNotConnectedTitle'), t('auth.backendNotConnectedBody'));
      continueAsGuest();
      finishOnboarding(navigation);
      return;
    }
    if (!email || !password) {
      Alert.alert(t('auth.missingInfoTitle'), t('auth.missingInfoBody'));
      return;
    }
    setLoading(true);
    const { error } = mode === 'signIn' ? await signInWithPassword(email, password) : await signUpWithPassword(email, password);
    setLoading(false);
    if (error) {
      Alert.alert(t(mode === 'signIn' ? 'auth.couldNotSignIn' : 'auth.couldNotSignUp'), error);
      return;
    }
    if (mode === 'signUp') {
      Alert.alert(t('auth.checkInboxTitle'), t('auth.checkInboxBody'));
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
          Vedic Pooja Guru
        </AppText>
      </View>

      <View style={styles.welcomeBlock}>
        <AppText variant="headlineLgMobile" center>
          {t('auth.namaste')}
        </AppText>
        <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
          {t('auth.welcomeBack')}
        </AppText>
      </View>

      <Card style={{ gap: Spacing.stackMd }}>
        <TextField
          label={t('auth.email')}
          placeholder={t('auth.enterEmail')}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label={t('auth.password')}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button label={t(mode === 'signIn' ? 'auth.signIn' : 'auth.createAccount')} onPress={submit} loading={loading} />
        <AppText variant="bodyMd" color="onSurfaceVariant" center>
          {t(mode === 'signIn' ? 'auth.newHere' : 'auth.alreadyHaveAccount')}
          <AppText
            variant="bodyMd"
            color="primaryContainer"
            onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
          >
            {t(mode === 'signIn' ? 'auth.createAccount' : 'auth.signIn')}
          </AppText>
        </AppText>
      </Card>

      <View style={styles.dividerRow}>
        <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
        <AppText variant="labelSm" color="onSurfaceVariant">
          {t('auth.or')}
        </AppText>
        <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
      </View>

      <View style={{ gap: Spacing.gutter }}>
        <Button
          label={t('auth.continueWithGoogle')}
          variant="secondary"
          icon="account-circle"
          onPress={() => Alert.alert(t('common.comingSoon'), t('auth.googleComingSoonBody'))}
        />
        <Button label={t('auth.continueAsGuest')} variant="text" onPress={guest} />
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
