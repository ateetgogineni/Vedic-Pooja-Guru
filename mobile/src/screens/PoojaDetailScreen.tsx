import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById, localize } from '@/data/poojas';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

const PREVIEW_COUNT = 5;

export function PoojaDetailScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('PoojaDetail').params;
  const pooja = getPoojaById(id);
  const [showAllItems, setShowAllItems] = useState(false);

  if (!pooja) {
    return (
      <Screen edges={['top', 'bottom']}>
        <TopBar />
        <View style={styles.notFound}>
          <AppText variant="bodyLg">{t('poojaDetail.notFound')}</AppText>
        </View>
      </Screen>
    );
  }

  const hasContent = pooja.items.length > 0 && pooja.steps.length > 0;
  const previewItems = pooja.items.slice(0, PREVIEW_COUNT);
  const remaining = pooja.items.length - previewItems.length;

  const notReady = () => Alert.alert(t('common.comingSoon'), t('poojaDetail.comingSoonBody', { name: localize(pooja.name, languageCode) }));

  return (
    <Screen scroll edges={['top', 'bottom']} contentStyle={{ paddingBottom: 140 }}>
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
              label={t('poojaDetail.seeAuspiciousTiming')}
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
                <Icon name="inventory-2" color={colors.primary} size={20} /> {t('poojaDetail.whatYouNeed')}
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
                <Pressable style={styles.itemPreview} onPress={() => setShowAllItems(true)}>
                  <View style={[styles.itemCircle, styles.dashed, { borderColor: colors.primaryContainer, backgroundColor: colors.surfaceContainerHighest }]}>
                    <AppText variant="labelSm" color="primaryContainer" style={{ fontWeight: '700' }}>
                      +{remaining}
                    </AppText>
                  </View>
                  <AppText variant="labelSm" color="primaryContainer" center numberOfLines={1}>
                    {t('poojaDetail.more')}
                  </AppText>
                </Pressable>
              ) : null}
            </View>
          </Card>
        ) : (
          <Card style={{ marginTop: Spacing.stackLg, alignItems: 'center' }}>
            <AppText variant="bodyMd" color="onSurfaceVariant" center>
              {t('poojaDetail.fullContentComingSoon', { name: localize(pooja.name, languageCode) })}
            </AppText>
          </Card>
        )}
      </View>

      <View style={[styles.actions, { backgroundColor: colors.background, borderTopColor: colors.surfaceContainer }]}>
        <Button
          label={t('poojaDetail.planThisPooja')}
          variant="secondary"
          icon="calendar-month"
          onPress={() => (hasContent ? navigation.navigate('Headcount', { id: pooja.id }) : notReady())}
          fullWidth={false}
          style={{ flex: 1 }}
        />
        <Button
          label={t('poojaDetail.startNow')}
          icon="play-arrow"
          onPress={() => (hasContent ? navigation.navigate('Walkthrough', { id: pooja.id }) : notReady())}
          fullWidth={false}
          style={{ flex: 1 }}
        />
      </View>

      <Modal visible={showAllItems} animationType="slide" transparent onRequestClose={() => setShowAllItems(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalSheet, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <AppText variant="headlineMd">{t('poojaDetail.whatYouNeed')}</AppText>
              <Pressable onPress={() => setShowAllItems(false)} hitSlop={8}>
                <Icon name="close" color={colors.onSurfaceVariant} size={24} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.modalList}>
              {pooja.items.map((item) => (
                <View key={item.key} style={[styles.modalRow, { borderColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.modalIconWrap, { backgroundColor: colors.warmIvory, borderColor: colors.outlineVariant }]}>
                    <Icon name={item.icon} color={colors.primary} size={20} />
                  </View>
                  <AppText variant="bodyMd">{localize(item.name, languageCode)}</AppText>
                </View>
              ))}
            </ScrollView>
            <Button label={t('poojaDetail.close')} variant="secondary" onPress={() => setShowAllItems(false)} />
          </View>
        </View>
      </Modal>
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
  dashed: { borderStyle: 'dashed', borderWidth: 2 },
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
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    maxHeight: '75%',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.marginMobile,
    gap: Spacing.stackMd,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalList: { gap: Spacing.stackSm },
  modalRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  modalIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
