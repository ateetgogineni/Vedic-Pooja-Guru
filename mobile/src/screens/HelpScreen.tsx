import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';

const FAQ_KEYS = [
  { qKey: 'help.faq1Q', aKey: 'help.faq1A' },
  { qKey: 'help.faq2Q', aKey: 'help.faq2A' },
  { qKey: 'help.faq3Q', aKey: 'help.faq3A' },
] as const;

export function HelpScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const FAQS = FAQ_KEYS.map(({ qKey, aKey }) => ({ q: t(qKey), a: t(aKey) }));
  const filtered = FAQS.filter(
    (f) => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View>
          <AppText variant="headlineLgMobile" center>
            {t('help.title')}
          </AppText>
          <AppText variant="bodyLg" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            {t('help.subtitle')}
          </AppText>
        </View>

        <TextField placeholder={t('help.searchPlaceholder')} value={query} onChangeText={setQuery} />

        <View>
          <AppText variant="headlineMd" style={{ marginBottom: Spacing.gutter }}>
            {t('help.faqTitle')}
          </AppText>
          <View style={{ gap: Spacing.gutter }}>
            {filtered.map((faq, i) => {
              const open = expanded === i;
              return (
                <View key={faq.q} style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                  <Pressable onPress={() => setExpanded(open ? null : i)} style={styles.faqHeader}>
                    <AppText variant="bodyLg" style={{ flex: 1, fontWeight: '600' }}>
                      {faq.q}
                    </AppText>
                    <Icon name={open ? 'expand-less' : 'expand-more'} color={colors.primary} size={22} />
                  </Pressable>
                  {open ? (
                    <AppText variant="bodyMd" color="onSurfaceVariant" style={styles.faqBody}>
                      {faq.a}
                    </AppText>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.supportCard, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}>
          <View style={[styles.supportIcon, { backgroundColor: colors.surfaceContainer }]}>
            <Icon name="support-agent" color={colors.primary} size={28} />
          </View>
          <AppText variant="headlineMd" center>
            {t('help.needMoreGuidance')}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 4, marginBottom: Spacing.gutter }}>
            {t('help.supportBody')}
          </AppText>
          <Button
            label={t('help.contactSupport')}
            fullWidth={false}
            onPress={() => Linking.openURL('mailto:support@vedicvidhi.app')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.marginMobile, gap: Spacing.stackLg, paddingBottom: 48 },
  faqCard: { borderRadius: Radius.xl, borderWidth: 1, overflow: 'hidden' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, padding: Spacing.gutter },
  faqBody: { paddingHorizontal: Spacing.gutter, paddingBottom: Spacing.gutter },
  supportCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.stackMd, alignItems: 'center' },
  supportIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.gutter },
});
