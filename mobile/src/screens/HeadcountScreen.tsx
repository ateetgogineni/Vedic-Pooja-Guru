import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ToggleRow } from '@/components/ui/toggle-row';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById, localize } from '@/data/poojas';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/lib/i18n';
import { loadPlanningOptions, savePlanningOptions } from '@/lib/plan-store';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function HeadcountScreen() {
  const { colors } = useAppTheme();
  const { user } = useAuth();
  const { t, languageCode } = useTranslation();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('Headcount').params;
  const pooja = getPoojaById(id);

  const [headcount, setHeadcount] = useState(2);
  const [includeChildren, setIncludeChildren] = useState(false);
  const [extendedFamily, setExtendedFamily] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!pooja) return;
    loadPlanningOptions(user?.id ?? null, pooja.id).then((saved) => {
      if (saved) {
        setHeadcount(saved.headcount);
        setIncludeChildren(saved.includeChildren);
        setExtendedFamily(saved.extendedFamily);
      }
    });
  }, [pooja, user?.id]);

  if (!pooja) return null;

  const onCalculate = async () => {
    setSaving(true);
    await savePlanningOptions(user?.id ?? null, pooja.id, { headcount, includeChildren, extendedFamily });
    setSaving(false);
    navigation.navigate('Checklist', { id: pooja.id });
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="headlineLgMobile" color="primary" center>
            {t('headcount.title')}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            {t('headcount.subtitle', { name: localize(pooja.name, languageCode) })}
          </AppText>
        </View>

        <View style={[styles.stepperCard, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}>
          <Pressable
            onPress={() => setHeadcount((c) => Math.max(1, c - 1))}
            style={[styles.stepperBtn, { backgroundColor: colors.warmIvory, borderColor: colors.primary }]}
          >
            <Icon name="remove" color={colors.primary} size={24} />
          </Pressable>
          <View style={styles.stepperValue}>
            <AppText variant="mantraDisplay" color="primary" style={{ fontSize: 40 }}>
              {headcount}
            </AppText>
            <AppText variant="labelSm" color="onSurfaceVariant" style={{ marginTop: 4 }}>
              {t('headcount.participants')}
            </AppText>
          </View>
          <Pressable
            onPress={() => setHeadcount((c) => Math.min(50, c + 1))}
            style={[styles.stepperBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <Icon name="add" color={colors.onPrimary} size={24} />
          </Pressable>
        </View>

        <View>
          <ToggleRow
            icon="human-child"
            title={t('headcount.includeChildren')}
            subtitle={t('headcount.includeChildrenSubtitle')}
            value={includeChildren}
            onChange={setIncludeChildren}
          />
          <ToggleRow
            icon="diversity-3"
            title={t('headcount.extendedFamily')}
            subtitle={t('headcount.extendedFamilySubtitle')}
            value={extendedFamily}
            onChange={setExtendedFamily}
          />
        </View>

        <View style={{ flex: 1 }} />
        <Button label={t('headcount.calculateItems')} onPress={onCalculate} loading={saving} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Spacing.marginMobile, gap: Spacing.stackLg },
  header: {},
  stepperCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.stackMd,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperBtn: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  stepperValue: { alignItems: 'center' },
});
