import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById } from '@/data/poojas';
import { useAppTheme } from '@/lib/theme-context';
import * as tts from '@/lib/tts';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function WalkthroughScreen() {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('Walkthrough').params;
  const pooja = getPoojaById(id);
  const [stepIndex, setStepIndex] = useState(0);
  const [muted, setMuted] = useState(false);

  const step = pooja?.steps[stepIndex];

  useEffect(() => {
    if (!step || muted) return;
    tts.speak(`${step.title}. ${step.instruction}`);
    return () => tts.stop();
  }, [step, muted]);

  useEffect(() => () => tts.stop(), []);

  if (!pooja || !step) return null;

  const total = pooja.steps.length;
  const progress = (stepIndex + 1) / total;

  const goNext = () => setStepIndex((i) => Math.min(total - 1, i + 1));
  const goPrev = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.iconBtn}>
            <Icon name="arrow-back" color={colors.primary} size={26} />
          </Pressable>
          <AppText variant="labelSm" color="outline">
            Step {stepIndex + 1} of {total}
          </AppText>
          <Pressable onPress={() => setMuted((m) => !m)} hitSlop={8} style={styles.iconBtn}>
            <Icon name={muted ? 'volume-off' : 'volume-up'} color={colors.primary} size={24} />
          </Pressable>
        </View>
        <View style={[styles.track, { backgroundColor: colors.surfaceContainer }]}>
          <View style={[styles.trackFill, { width: `${progress * 100}%`, backgroundColor: colors.muhuratAmber }]} />
        </View>
      </View>

      <View style={styles.main}>
        <View style={[styles.illustration, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}>
          <Icon name="local-fire-department" size={80} color={colors.muhuratAmber} />
        </View>
        <AppText variant="headlineLgMobile" center style={{ marginTop: Spacing.stackLg }}>
          {step.title}
        </AppText>
        <AppText variant="bodyLg" color="onSurfaceVariant" center style={{ marginTop: Spacing.stackSm }}>
          {step.instruction}
        </AppText>
        {step.mantra ? (
          <View style={[styles.mantraBox, { backgroundColor: colors.surfaceContainer, borderColor: colors.surfaceContainerHigh }]}>
            <AppText variant="mantraDisplay" color="secondary" center>
              {step.mantra}
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.navRow}>
          <Pressable
            onPress={goPrev}
            disabled={stepIndex === 0}
            style={[styles.navBtn, styles.navBtnOutline, { borderColor: colors.primaryContainer, opacity: stepIndex === 0 ? 0.4 : 1 }]}
          >
            <Icon name="arrow-back" color={colors.primaryContainer} size={20} />
            <AppText variant="labelSm" color="primaryContainer">
              Previous
            </AppText>
          </Pressable>
          <Pressable
            onPress={stepIndex === total - 1 ? () => navigation.goBack() : goNext}
            style={[styles.navBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <AppText variant="labelSm" style={{ color: colors.onPrimary }}>
              {stepIndex === total - 1 ? 'Finish' : 'Next Step'}
            </AppText>
            <Icon name="arrow-forward" color={colors.onPrimary} size={20} />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Chat', { id: pooja.id, step: step.title })}
        style={[styles.fab, { backgroundColor: colors.primaryContainer }]}
      >
        <Icon name="mic" color={colors.onPrimary} size={26} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.marginMobile, paddingTop: 8, gap: Spacing.gutter },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: { padding: 8 },
  track: { height: 3, borderRadius: 2, overflow: 'hidden' },
  trackFill: { height: '100%', borderRadius: 2 },
  main: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.marginMobile },
  illustration: {
    width: 240,
    height: 240,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mantraBox: { marginTop: Spacing.stackMd, padding: Spacing.gutter, borderRadius: Radius.lg, borderWidth: 1, alignSelf: 'stretch' },
  footer: { padding: Spacing.marginMobile },
  navRow: { flexDirection: 'row', gap: Spacing.gutter },
  navBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: Radius.lg },
  navBtnOutline: { borderWidth: 2 },
  fab: {
    position: 'absolute',
    right: Spacing.marginMobile,
    bottom: 110,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
