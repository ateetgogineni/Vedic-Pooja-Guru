import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTranslation } from '@/lib/i18n';
import { getSamplePanchangam } from '@/lib/panchangam-sample';
import { useAppTheme } from '@/lib/theme-context';

const WEEKDAY_KEYS = ['panchangam.sun', 'panchangam.mon', 'panchangam.tue', 'panchangam.wed', 'panchangam.thu', 'panchangam.fri', 'panchangam.sat'] as const;

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildMonthGrid(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function PanchangamScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);

  const monthLabel = today.toLocaleDateString(languageCode === 'te' ? 'te-IN' : undefined, { month: 'long', year: 'numeric' });
  const selectedLabel = selectedDate.toLocaleDateString(languageCode === 'te' ? 'te-IN' : undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const weeks = useMemo(() => buildMonthGrid(today), [today]);
  const p = useMemo(() => getSamplePanchangam(selectedDate), [selectedDate]);

  const DETAILS = [
    { icon: 'wb-sunny', label: t('panchangam.tithi'), value: `${p.tithi} (${p.paksha})` },
    { icon: 'nights-stay', label: t('panchangam.nakshatra'), value: p.nakshatra },
    { icon: 'wb-twilight', label: t('panchangam.sunrise'), value: p.sunrise },
    { icon: 'brightness-3', label: t('panchangam.sunset'), value: p.sunset },
  ];

  const KALAMS = [
    { label: t('panchangam.auspiciousMuhurat'), value: p.auspiciousMuhurat, good: true },
    { label: t('home.durmuhurat'), value: p.durmuhurat, good: false },
    { label: t('panchangam.rahuKalam'), value: p.rahuKalam, good: false },
    { label: t('panchangam.yamagandam'), value: p.yamagandam, good: false },
    { label: t('panchangam.gulikaKalam'), value: p.gulikaKalam, good: false },
    { label: t('panchangam.varjyam'), value: p.varjyam, good: false },
  ];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Pooja Guru
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <AppText variant="headlineLgMobile">{t('panchangam.title')}</AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
            {selectedLabel}
          </AppText>
        </View>

        <View style={[styles.calendarCard, { backgroundColor: colors.surface, borderColor: colors.surfaceContainerHigh }]}>
          <AppText variant="headlineMd" center style={{ marginBottom: Spacing.gutter }}>
            {monthLabel}
          </AppText>
          <View style={styles.weekRow}>
            {WEEKDAY_KEYS.map((key) => (
              <AppText key={key} variant="labelSm" color="onSurfaceVariant" style={styles.dayCell}>
                {t(key)}
              </AppText>
            ))}
          </View>
          {weeks.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((day, di) => {
                if (!day) return <View key={di} style={styles.dayCell} />;
                const cellDate = new Date(today.getFullYear(), today.getMonth(), day);
                const isToday = isSameDay(cellDate, today);
                const isSelected = isSameDay(cellDate, selectedDate);
                return (
                  <Pressable key={di} style={styles.dayCell} onPress={() => setSelectedDate(cellDate)}>
                    <View
                      style={[
                        styles.dayCircle,
                        isToday && { backgroundColor: colors.primaryContainer },
                        !isToday && isSelected && { borderWidth: 2, borderColor: colors.primaryContainer },
                      ]}
                    >
                      <AppText variant="bodyMd" style={isToday ? { color: colors.onPrimary, fontWeight: '700' } : undefined}>
                        {day}
                      </AppText>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={{ gap: Spacing.stackSm }}>
          {KALAMS.map((k) => (
            <View
              key={k.label}
              style={[
                styles.kalamRow,
                k.good
                  ? { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }
                  : { backgroundColor: colors.errorContainer, borderColor: colors.error },
              ]}
            >
              <Icon name={k.good ? 'wb-twilight' : 'block'} color={k.good ? colors.muhuratAmber : colors.error} size={20} />
              <View style={{ flex: 1 }}>
                <AppText variant="labelSm" style={{ color: k.good ? colors.onSurfaceVariant : colors.onErrorContainer }}>
                  {k.label}
                </AppText>
                <AppText variant="bodyMd" style={{ fontWeight: '600', color: k.good ? undefined : colors.onErrorContainer }}>
                  {k.value}
                </AppText>
              </View>
            </View>
          ))}
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
          {t('panchangam.disclaimer')}
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd, paddingBottom: 48 },
  calendarCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter },
  weekRow: { flexDirection: 'row' },
  dayCell: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  dayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  kalamRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.gutter },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.gutter },
});
