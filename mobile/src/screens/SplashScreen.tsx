import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

const ONBOARDING_KEY = 'vedic-vidhi.onboarding-complete';

export function SplashScreen() {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -10, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, [float]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const done = await AsyncStorage.getItem(ONBOARDING_KEY);
      navigation.reset({ index: 0, routes: [{ name: done ? 'Tabs' : 'Onboarding' }] });
    }, 1400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Screen edges={[]} style={{ backgroundColor: colors.warmIvory }} contentStyle={styles.content}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.logoCircle,
            { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.softSand, transform: [{ translateY: float }] },
          ]}
        >
          <AppText style={{ fontSize: 56 }}>🪔</AppText>
        </Animated.View>
        <View style={styles.textBlock}>
          <AppText variant="mantraDisplay" color="secondary" center>
            Vedic Vidhi
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8, opacity: 0.8 }}>
            Your Virtual Priest’s Assistant
          </AppText>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: colors.muhuratAmber }]} />
          <View style={[styles.dot, { backgroundColor: colors.muhuratAmber, opacity: 0.75 }]} />
          <View style={[styles.dot, { backgroundColor: colors.muhuratAmber, opacity: 0.5 }]} />
        </View>
        <AppText variant="labelSm" color="outline" style={{ marginTop: 12, letterSpacing: 2 }}>
          PREPARING SANCTUARY
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.marginMobile },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.stackMd },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { alignItems: 'center' },
  footer: { paddingBottom: 48, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
