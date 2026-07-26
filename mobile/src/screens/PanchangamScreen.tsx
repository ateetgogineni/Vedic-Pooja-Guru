import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

const DETAILS = [
  { icon: 'wb-sunny', label: 'Tithi', value: 'Dashami (Shukla Paksha)' },
  { icon: 'nights-stay', label: 'Nakshatra', value: 'Rohini' },
  { icon: 'wb-twilight', label: 'Sunrise', value: '06:12 AM' },
  { icon: 'brightness-3', label: 'Sunset', value: '06:48 PM' },
];

export function PanchangamScreen() {
  const { colors } = useAppTheme();
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Vidhi
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <AppText variant="headlineLgMobile">Today&apos;s Panchangam</AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
            {today}
          </AppText>
        </View>

        <View style={[styles.muhuratCard, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}>
          <Icon name="wb-twilight" color={colors.muhuratAmber} size={32} />
          <AppText variant="labelSm" color="primary" style={{ marginTop: 8, letterSpacing: 1 }}>
            AUSPICIOUS MUHURAT
          </AppText>
          <AppText variant="headlineMd" style={{ marginTop: 4 }}>
            06:45 AM — 08:30 AM
          </AppText>
        </View>

        <View style={{ gap: Spacing.stackSm }}>
          {DETAILS.map((d) => (
            <View key={d.label} style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.surfaceContainerHigh }]}>
              <Icon name={d.icon} color={colors.primary} size={22} />
              <AppText variant="bodyMd" color="onSurfaceVariant" style={{ flex: 1 }}>
                {d.label}
              </AppText>
              <AppText variant="bodyMd" style={{ fontWeight: '600' }}>
                {d.value}
              </AppText>
            </View>
          ))}
        </View>

        <AppText variant="labelSm" color="onSurfaceVariant" center>
          Sample data for this prototype — full panchangam with location-aware calculations lands in a later phase.
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd, paddingBottom: 48 },
  muhuratCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.stackMd, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.gutter },
});
