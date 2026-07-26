import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckboxRow } from '@/components/ui/checkbox-row';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Spacing } from '@/constants/theme';
import { CATEGORY_LABELS, calculateChecklist, getPoojaById, localize, type PlanningOptions } from '@/data/poojas';
import { useAuth } from '@/lib/auth-context';
import { loadChecklistState, loadPlanningOptions, saveChecklistState } from '@/lib/plan-store';
import { usePrefs } from '@/lib/prefs-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

const CATEGORY_ICONS: Record<string, string> = {
  'Flowers & Fruits': 'local-florist',
  'Core Pooja Items': 'flare',
  'Altar Setup': 'local-fire-department',
};

export function ChecklistScreen() {
  const { colors } = useAppTheme();
  const { user } = useAuth();
  const { languageCode } = usePrefs();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('Checklist').params;
  const pooja = getPoojaById(id);

  const [opts, setOpts] = useState<PlanningOptions | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pooja) return;
    (async () => {
      const savedOpts = (await loadPlanningOptions(user?.id ?? null, pooja.id)) ?? {
        headcount: 2,
        includeChildren: false,
        extendedFamily: false,
      };
      setOpts(savedOpts);
      const savedChecked = await loadChecklistState(user?.id ?? null, pooja.id);
      setChecked(savedChecked);
      setLoading(false);
    })();
  }, [pooja, user?.id]);

  const toggleItem = useCallback(
    (key: string) => {
      setChecked((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        if (pooja) saveChecklistState(user?.id ?? null, pooja.id, next);
        return next;
      });
    },
    [pooja, user?.id],
  );

  if (!pooja) return null;

  const groups = opts ? calculateChecklist(pooja, opts) : [];
  const totalItems = groups.reduce((sum, g) => sum + g.entries.length, 0);
  const checkedCount = groups.reduce((sum, g) => sum + g.entries.filter((e) => checked[e.item.key]).length, 0);

  return (
    <Screen scroll edges={['top']} contentStyle={{ paddingBottom: 140 }}>
      <TopBar />
      <View style={styles.content}>
        <View>
          <AppText variant="headlineLgMobile" color="primary">
            Checklist: {localize(pooja.name, languageCode)}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
            {loading
              ? 'Calculating quantities…'
              : `For ${opts?.headcount} participants. ${checkedCount} of ${totalItems} gathered.`}
          </AppText>
        </View>

        {groups.map((group) => (
          <Card key={group.category}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: colors.surfaceContainer }]}>
                <Icon name={CATEGORY_ICONS[group.category] ?? 'inventory-2'} color={colors.primary} size={20} />
              </View>
              <AppText variant="headlineMd">
                {localize(CATEGORY_LABELS[group.category] ?? { en: group.category }, languageCode)}
              </AppText>
            </View>
            <View style={{ gap: 4 }}>
              {group.entries.map(({ item, amount, unit }) => (
                <CheckboxRow
                  key={item.key}
                  title={localize(item.name, languageCode)}
                  subtitle={`${amount} ${unit}`}
                  checked={!!checked[item.key]}
                  onToggle={() => toggleItem(item.key)}
                />
              ))}
            </View>
          </Card>
        ))}
      </View>

      <View style={[styles.actions, { backgroundColor: colors.background }]}>
        <Button
          label="Start Pooja"
          icon="play-circle"
          iconPosition="right"
          onPress={() => navigation.navigate('Walkthrough', { id: pooja.id })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.marginMobile, gap: Spacing.gutter },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, marginBottom: Spacing.gutter },
  categoryIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  actions: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.marginMobile },
});
