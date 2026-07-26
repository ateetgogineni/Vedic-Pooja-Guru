import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

const SLIDES = [
  { icon: 'auto-awesome', titleKey: 'onboarding.slide1Title', bodyKey: 'onboarding.slide1Body' },
  { icon: 'inventory-2', titleKey: 'onboarding.slide2Title', bodyKey: 'onboarding.slide2Body' },
  { icon: 'mic', titleKey: 'onboarding.slide3Title', bodyKey: 'onboarding.slide3Body' },
] as const;

export function OnboardingScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const next = () => {
    if (isLast) {
      navigation.navigate('Language');
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.skipRow}>
        <Pressable onPress={() => navigation.navigate('Language')}>
          <AppText variant="labelSm" color="onSurfaceVariant">
            {t('onboarding.skip')}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.center}>
        <View style={[styles.iconCircle, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}>
          <Icon name={slide.icon} size={56} color={colors.primaryContainer} />
        </View>
        <AppText variant="headlineLgMobile" center style={{ marginTop: Spacing.stackLg }}>
          {t(slide.titleKey)}
        </AppText>
        <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: Spacing.stackSm, maxWidth: 320 }}>
          {t(slide.bodyKey)}
        </AppText>
      </View>

      <View style={styles.dotsRow}>
        {SLIDES.map((s, i) => (
          <View
            key={s.titleKey}
            style={[
              styles.dot,
              { backgroundColor: i === index ? colors.primaryContainer : colors.surfaceContainerHigh, width: i === index ? 20 : 8 },
            ]}
          />
        ))}
      </View>

      <Button label={t(isLast ? 'onboarding.getStarted' : 'onboarding.next')} icon="arrow-forward" iconPosition="right" onPress={next} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Spacing.marginMobile, gap: Spacing.stackMd },
  skipRow: { alignItems: 'flex-end' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.stackMd },
  dot: { height: 8, borderRadius: 4 },
});
