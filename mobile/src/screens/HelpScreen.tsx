import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

const FAQS = [
  {
    q: 'How do I start a new pooja ritual?',
    a: 'Navigate to the Library tab and browse through the available poojas. Once you select a ritual, review the required materials before tapping "Start Now" or "Plan This Pooja" to enter the guided experience.',
  },
  {
    q: 'What do I do if I miss a step during the guided ritual?',
    a: 'During any guided ritual, use the "Previous" button at the bottom of the screen to go back as many steps as needed without losing your overall progress.',
  },
  {
    q: 'Can I use the app offline?',
    a: 'Pooja content and your saved checklist work offline once loaded. The AI assistant and account sync require an active internet connection.',
  },
];

export function HelpScreen() {
  const { colors } = useAppTheme();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const filtered = FAQS.filter(
    (f) => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View>
          <AppText variant="headlineLgMobile" center>
            Help & Support
          </AppText>
          <AppText variant="bodyLg" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            Find answers to common questions about your spiritual journey or reach out for guidance.
          </AppText>
        </View>

        <TextField placeholder="Search for answers…" value={query} onChangeText={setQuery} />

        <View>
          <AppText variant="headlineMd" style={{ marginBottom: Spacing.gutter }}>
            Frequently Asked Questions
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
            Need more guidance?
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 4, marginBottom: Spacing.gutter }}>
            Our dedicated spiritual guides and technical support team are here to assist you.
          </AppText>
          <Button
            label="Contact Support"
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
