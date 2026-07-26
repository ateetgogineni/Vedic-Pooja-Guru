import { Alert, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById, localize } from '@/data/poojas';
import { usePrefs } from '@/lib/prefs-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function PoojaDetailScreen() {
  const { colors } = useAppTheme();
  const { languageCode } = usePrefs();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('PoojaDetail').params;
  const pooja = getPoojaById(id);

  if (!pooja) {
    return (
      <Screen edges={['top', 'bottom']}>
        <TopBar />
        <View style={styles.notFound}>
          <AppText variant="bodyLg">Pooja not found.</AppText>
        </View>
      </Screen>
    );
  }

  const hasContent = pooja.items.length > 0 && pooja.steps.length > 0;
  const previewItems = pooja.items.slice(0, 3);
  const remaining = pooja.items.length - previewItems.length;

  const notReady = () =>
    Alert.alert('Coming soon', `${localize(pooja.name, languageCode)} guidance is on the roadmap for a future update.`);

  return (
    <Screen scroll edges={['top']} contentStyle={{ paddingBottom: 140 }}>
      <TopBar />
      <View style={[styles.hero, { backgroundColor: colors.softSand }]}>
        <Icon name={pooja.icon} size={72} color={colors.primaryContainer} />
      </View>

      <View style={styles.body}>
        <AppText variant="headlineLgMobile" center>
          {localize(pooja.name, languageCode)}
        </AppText>
        <AppText variant="bodyLg" color="onSurfaceVariant" center style={{ marginTop: Spacing.stackSm }}>
          {localize(pooja.description, languageCode)}
        </AppText>

        <View style={styles.pillRow}>
          <View style={[styles.pill, { backgroundColor: colors.softSand, borderColor: colors.surfaceContainerHigh }]}>
            <Icon name="schedule" color={colors.primary} size={16} />
            <AppText variant="labelSm">{localize(pooja.durationLabel, languageCode)}</AppText>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.softSand, borderColor: colors.surfaceContainerHigh }]}>
            <Icon name="spa" color={colors.sacredGreen} size={16} />
            <AppText variant="labelSm">{localize(pooja.difficulty, languageCode)}</AppText>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.softSand, borderColor: colors.surfaceContainerHigh }]}>
            <Icon name="wb-twilight" color={colors.muhuratAmber} size={16} />
            <AppText variant="labelSm">{localize(pooja.timing, languageCode)}</AppText>
          </View>
        </View>

        {hasContent ? (
          <View style={{ alignItems: 'center', marginTop: Spacing.stackSm }}>
            <Button
              label="See auspicious timing"
              variant="text"
              icon="wb-twilight"
              fullWidth={false}
              onPress={() => navigation.navigate('Muhurat', { id: pooja.id })}
            />
          </View>
        ) : null}

        {hasContent ? (
          <Card style={{ marginTop: Spacing.stackLg }}>
            <View style={styles.needHeader}>
              <AppText variant="headlineMd" style={styles.needTitle}>
                <Icon name="inventory-2" color={colors.primary} size={20} /> What you&apos;ll need
              </AppText>
            </View>
            <View style={styles.itemGrid}>
              {previewItems.map((item) => (
                <View key={item.key} style={styles.itemPreview}>
                  <View style={[styles.itemCircle, { backgroundColor: colors.warmIvory, borderColor: colors.outlineVariant }]}>
                    <Icon name={item.icon} color={colors.primary} size={24} />
                  </View>
                  <AppText variant="labelSm" color="onSurfaceVariant" center numberOfLines={1}>
                    {localize(item.name, languageCode)}
                  </AppText>
                </View>
              ))}
              {remaining > 0 ? (
                <View style={styles.itemPreview}>
                  <View style={[styles.itemCircle, styles.dashed, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHighest }]}>
                    <AppText variant="labelSm" color="onSurfaceVariant">
                      +{remaining}
                    </AppText>
                  </View>
                  <AppText variant="labelSm" color="onSurfaceVariant">
                    More
                  </AppText>
                </View>
              ) : null}
            </View>
          </Card>
        ) : (
          <Card style={{ marginTop: Spacing.stackLg, alignItems: 'center' }}>
            <AppText variant="bodyMd" color="onSurfaceVariant" center>
              Full step-by-step content for {localize(pooja.name, languageCode)} is coming in a future update. Try
              Ganesh Pooja for the full experience.
            </AppText>
          </Card>
        )}
      </View>

      <View style={[styles.actions, { backgroundColor: colors.background, borderTopColor: colors.surfaceContainer }]}>
        <Button
          label="Plan This Pooja"
          variant="secondary"
          icon="calendar-month"
          onPress={() => (hasContent ? navigation.navigate('Headcount', { id: pooja.id }) : notReady())}
          fullWidth={false}
          style={{ flex: 1 }}
        />
        <Button
          label="Start Now"
          icon="play-arrow"
          onPress={() => (hasContent ? navigation.navigate('Walkthrough', { id: pooja.id }) : notReady())}
          fullWidth={false}
          style={{ flex: 1 }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 220, alignItems: 'center', justifyContent: 'center' },
  body: { padding: Spacing.marginMobile },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.gutter, justifyContent: 'center', marginTop: Spacing.stackMd },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1 },
  needHeader: { marginBottom: Spacing.gutter },
  needTitle: { flexDirection: 'row', alignItems: 'center' },
  itemGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.gutter },
  itemPreview: { width: 72, alignItems: 'center', gap: 6 },
  itemCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  dashed: { borderStyle: 'dashed' },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: Spacing.gutter,
    padding: Spacing.marginMobile,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
