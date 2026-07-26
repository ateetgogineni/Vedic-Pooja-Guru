import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { IconBadge } from '@/components/ui/icon-badge';
import { Radius, Spacing } from '@/constants/theme';
import { getSampleGuidance } from '@/data/astrology';
import { localize, poojas } from '@/data/poojas';
import { useAstrologyProfile } from '@/lib/astrology-context';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

export function HomeScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const navigation = useAppNavigation();
  const { user, isGuest } = useAuth();
  const { profile, isComplete } = useAstrologyProfile();
  const name = isGuest ? t('home.guestLabel') : user?.email?.split('@')[0] || t('home.friendLabel');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Pooja Guru
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
            {t('home.namaste', { name })}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant">
            {t('home.subtitle')}
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
                  {t('home.todaysPanchangam')}
                </AppText>
                <AppText variant="headlineMd">Dashami Tithi</AppText>
                <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                  Shukla Paksha • Thursday
                </AppText>
              </View>
              <IconBadge icon="calendar-today" bg="surfaceContainerLowest" />
            </View>
            <View style={styles.muhuratRow}>
              <View style={[styles.muhuratPill, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <Icon name="wb-twilight" color={colors.muhuratAmber} size={16} />
                <View style={{ flex: 1 }}>
                  <AppText variant="labelSm" color="onSurfaceVariant" numberOfLines={1}>
                    {t('home.auspiciousMuhurat')}
                  </AppText>
                  <AppText variant="labelSm" style={{ fontWeight: '600' }} numberOfLines={1}>
                    06:45 — 08:30 AM
                  </AppText>
                </View>
              </View>
              <View style={[styles.muhuratPill, { backgroundColor: colors.errorContainer, borderColor: colors.error }]}>
                <Icon name="block" color={colors.error} size={16} />
                <View style={{ flex: 1 }}>
                  <AppText variant="labelSm" style={{ color: colors.onErrorContainer }} numberOfLines={1}>
                    {t('home.durmuhurat')}
                  </AppText>
                  <AppText variant="labelSm" style={{ color: colors.onErrorContainer, fontWeight: '600' }} numberOfLines={1}>
                    12:15 — 01:00 PM
                  </AppText>
                </View>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Festivals')}
            style={[styles.aiCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.surfaceContainerHigh }]}
          >
            <IconBadge icon="festival" bg="muhuratAmber" color="onPrimary" />
            <View>
              <AppText variant="headlineMd">{t('home.festivalCalendar')}</AppText>
              <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                {t('home.festivalCalendarSubtitle')}
              </AppText>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('AstrologyProfile')}
          style={[styles.astrologyCard, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}
        >
          <IconBadge icon="stars" bg="surfaceContainerLowest" />
          <View style={{ flex: 1 }}>
            {isComplete ? (
              <>
                <AppText variant="labelSm" color="primary">
                  {t('home.astrologyTitle')} — {profile.rashi}
                </AppText>
                <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                  {localize(getSampleGuidance(profile.rashi, new Date()), languageCode)}
                </AppText>
              </>
            ) : (
              <>
                <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
                  {t('home.astrologyPrompt')}
                </AppText>
                <AppText variant="labelSm" color="primary" style={{ marginTop: 4 }}>
                  {t('home.astrologyCta')}
                </AppText>
              </>
            )}
          </View>
          <Icon name="chevron-right" color={colors.onSurfaceVariant} size={22} />
        </Pressable>

        <View style={styles.quickRow}>
          <Pressable
            onPress={() => Alert.alert(t('common.comingSoon'), t('home.dailyPujaComingSoonBody'))}
            style={[styles.quickBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <Icon name="self-improvement" color={colors.onPrimary} size={20} />
            <AppText variant="bodyLg" style={{ color: colors.onPrimary, fontWeight: '600' }}>
              {t('home.startDailyPuja')}
            </AppText>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert(t('common.comingSoon'), t('home.meditationComingSoonBody'))}
            style={[styles.quickBtnOutline, { borderColor: colors.primaryContainer }]}
          >
            <AppText variant="bodyLg" color="primary" style={{ fontWeight: '600' }}>
              {t('home.continueMeditation')}
            </AppText>
          </Pressable>
        </View>

        <View style={{ gap: Spacing.gutter }}>
          <View style={styles.sectionHeader}>
            <AppText variant="headlineMd">{t('home.featuredPoojas')}</AppText>
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
                    {localize(p.tagline, languageCode).toUpperCase()}
                  </AppText>
                  <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
                    {localize(p.name, languageCode)}
                  </AppText>
                  <View style={styles.durationRow}>
                    <Icon name="schedule" color={colors.onSurfaceVariant} size={16} />
                    <AppText variant="bodyMd" color="onSurfaceVariant">
                      {localize(p.durationLabel, languageCode)}
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
  content: { padding: Spacing.marginMobile, gap: Spacing.stackLg, paddingBottom: Spacing.stackLg },
  bentoRow: { gap: Spacing.gutter },
  panchangamCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter, gap: Spacing.stackMd },
  bentoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  muhuratRow: { flexDirection: 'row', gap: Spacing.stackSm },
  muhuratPill: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.stackSm, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.stackSm },
  aiCard: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter, gap: Spacing.stackMd },
  astrologyCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter },
  quickRow: { flexDirection: 'row', gap: Spacing.gutter },
  quickBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.stackSm, borderRadius: Radius.xl, paddingVertical: 16, paddingHorizontal: 12 },
  quickBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.stackSm, borderRadius: Radius.xl, paddingVertical: 16, paddingHorizontal: 12, borderWidth: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  poojaCard: { width: 220, borderRadius: Radius.xl, borderWidth: 1, overflow: 'hidden' },
  poojaHero: { height: 110, alignItems: 'center', justifyContent: 'center' },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.stackSm },
});
