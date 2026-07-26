import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { IconBadge } from '@/components/ui/icon-badge';
import { Radius, Spacing } from '@/constants/theme';
import { poojas } from '@/data/poojas';
import { useAuth } from '@/lib/auth-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

export function HomeScreen() {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();
  const { user, isGuest } = useAuth();
  const name = isGuest ? 'Guest' : user?.email?.split('@')[0] || 'Friend';

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Vidhi
        </AppText>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={[styles.avatar, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}
        >
          <Icon name="person" color={colors.primary} size={20} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ gap: 4 }}>
          <AppText variant="headlineLgMobile" style={{ textTransform: 'capitalize' }}>
            Namaste, {name}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant">
            Find peace in your daily practice. Here is your ritual guidance for today.
          </AppText>
        </View>

        <View style={styles.bentoRow}>
          <Pressable
            onPress={() => navigation.navigate('Panchangam')}
            style={[styles.panchangamCard, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}
          >
            <View style={styles.bentoTop}>
              <View>
                <AppText variant="labelSm" color="primary" style={{ marginBottom: 4 }}>
                  TODAY&apos;S PANCHANGAM
                </AppText>
                <AppText variant="headlineMd">Dashami Tithi</AppText>
                <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                  Shukla Paksha • Thursday
                </AppText>
              </View>
              <IconBadge icon="calendar-today" bg="surfaceContainerLowest" />
            </View>
            <View style={[styles.muhuratPill, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Icon name="wb-twilight" color={colors.muhuratAmber} size={20} />
              <View>
                <AppText variant="labelSm" color="onSurfaceVariant">
                  Auspicious Muhurat
                </AppText>
                <AppText variant="bodyMd">06:45 AM — 08:30 AM</AppText>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Chat', { id: 'ganesh-pooja' })}
            style={[styles.aiCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.surfaceContainerHigh }]}
          >
            <IconBadge icon="auto-awesome" bg="sacredGreen" color="onPrimary" />
            <View style={{ marginTop: 12 }}>
              <AppText variant="headlineMd">Ask Pandit AI</AppText>
              <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                Guidance on rituals, mantras, and traditions.
              </AppText>
              <View style={styles.startChat}>
                <AppText variant="labelSm" color="primary">
                  Start Chat
                </AppText>
                <Icon name="arrow-forward" color={colors.primary} size={16} />
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.quickRow}>
          <Pressable
            onPress={() => Alert.alert('Coming soon', 'Daily Puja guidance is on the roadmap for a future update.')}
            style={[styles.quickBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <Icon name="self-improvement" color={colors.onPrimary} size={20} />
            <AppText variant="bodyLg" style={{ color: colors.onPrimary, fontWeight: '600' }}>
              Start Daily Puja
            </AppText>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Coming soon', 'Guided meditation is on the roadmap for a future update.')}
            style={[styles.quickBtnOutline, { borderColor: colors.primaryContainer }]}
          >
            <Icon name="play-circle" color={colors.primary} size={20} />
            <AppText variant="bodyLg" color="primary" style={{ fontWeight: '600' }}>
              Continue Meditation
            </AppText>
          </Pressable>
        </View>

        <View style={{ gap: Spacing.gutter }}>
          <View style={styles.sectionHeader}>
            <AppText variant="headlineMd">Featured Poojas</AppText>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.gutter }}>
            {poojas.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => navigation.navigate('PoojaDetail', { id: p.id })}
                style={[styles.poojaCard, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}
              >
                <View style={[styles.poojaHero, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Icon name={p.icon} color={colors.primaryContainer} size={40} />
                </View>
                <View style={{ padding: Spacing.gutter, gap: 4 }}>
                  <AppText variant="labelSm" color="sacredGreen">
                    {p.tagline.toUpperCase()}
                  </AppText>
                  <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
                    {p.name}
                  </AppText>
                  <View style={styles.durationRow}>
                    <Icon name="schedule" color={colors.onSurfaceVariant} size={16} />
                    <AppText variant="bodyMd" color="onSurfaceVariant">
                      {p.durationLabel}
                    </AppText>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  content: { padding: Spacing.marginMobile, gap: Spacing.stackLg, paddingBottom: 48 },
  bentoRow: { gap: Spacing.gutter },
  panchangamCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter, gap: Spacing.stackMd },
  bentoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  muhuratPill: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.gutter },
  aiCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter },
  startChat: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
  quickRow: { flexDirection: 'row', gap: Spacing.gutter },
  quickBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: Radius.xl, paddingVertical: 16, paddingHorizontal: 12 },
  quickBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: Radius.xl, paddingVertical: 16, paddingHorizontal: 12, borderWidth: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  poojaCard: { width: 220, borderRadius: Radius.xl, borderWidth: 1, overflow: 'hidden' },
  poojaHero: { height: 110, alignItems: 'center', justifyContent: 'center' },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
