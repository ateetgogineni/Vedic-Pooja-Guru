import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getFestivalById } from '@/data/festivals';
import { localize, useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppRoute } from '@/navigation/hooks';

function formatDateTime(iso: string, languageCode: string) {
  const date = new Date(iso);
  const locale = languageCode === 'te' ? 'te-IN' : 'en-IN';
  return `${date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}, ${date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })}`;
}

export function FestivalDetailScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const { id } = useAppRoute('FestivalDetail').params;
  const festival = getFestivalById(id);

  if (!festival) {
    return (
      <Screen edges={['top', 'bottom']}>
        <TopBar />
        <View style={styles.notFound}>
          <AppText variant="bodyLg">{t('festivals.notFound')}</AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']} contentStyle={{ paddingBottom: 48 }}>
      <TopBar />
      <View style={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.softSand }]}>
          <Icon name={festival.icon} size={64} color={colors.primaryContainer} />
        </View>

        <AppText variant="headlineLgMobile" center>
          {localize(festival.name, languageCode)}
        </AppText>

        <Card>
          <AppText variant="bodyMd" color="onSurfaceVariant">
            {localize(festival.description, languageCode)}
          </AppText>
        </Card>

        <Card style={{ gap: Spacing.stackSm }}>
          <View style={styles.row}>
            <Icon name="event" color={colors.primary} size={20} />
            <View style={{ flex: 1 }}>
              <AppText variant="labelSm" color="onSurfaceVariant">
                {t('festivals.starts')}
              </AppText>
              <AppText variant="bodyMd" style={{ fontWeight: '600' }}>
                {formatDateTime(festival.start, languageCode)}
              </AppText>
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="event-available" color={colors.primary} size={20} />
            <View style={{ flex: 1 }}>
              <AppText variant="labelSm" color="onSurfaceVariant">
                {t('festivals.ends')}
              </AppText>
              <AppText variant="bodyMd" style={{ fontWeight: '600' }}>
                {formatDateTime(festival.end, languageCode)}
              </AppText>
            </View>
          </View>
        </Card>

        <AppText variant="labelSm" color="onSurfaceVariant" center>
          {t('festivals.disclaimer')}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd },
  hero: { height: 160, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter },
});
