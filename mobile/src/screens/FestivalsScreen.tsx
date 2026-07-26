import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { FESTIVALS } from '@/data/festivals';
import { localize, useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

export function FestivalsScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const navigation = useAppNavigation();
  const now = new Date();

  return (
    <Screen scroll edges={['top', 'bottom']} contentStyle={{ paddingBottom: 48 }}>
      <TopBar showBack={false} />
      <View style={styles.content}>
        <View>
          <AppText variant="headlineLgMobile" center>
            {t('festivals.title')}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            {t('festivals.subtitle')}
          </AppText>
        </View>

        <View style={{ gap: Spacing.stackSm }}>
          {FESTIVALS.map((festival) => {
            const isPast = new Date(festival.end) < now;
            return (
              <Card key={festival.id} padded={false} style={[styles.card, isPast && { opacity: 0.5 }]}>
                <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainer }]}>
                  <Icon name={festival.icon} color={colors.primary} size={18} />
                </View>
                <AppText variant="bodyLg" style={{ flex: 1, fontWeight: '600' }} numberOfLines={1}>
                  {localize(festival.name, languageCode)}
                </AppText>
                <Pressable
                  hitSlop={8}
                  style={styles.viewBtn}
                  onPress={() => navigation.navigate('FestivalDetail', { id: festival.id })}
                >
                  <AppText variant="labelSm" color="primaryContainer">
                    {t('festivals.viewDetails')}
                  </AppText>
                  <Icon name="chevron-right" color={colors.primaryContainer} size={16} />
                </Pressable>
              </Card>
            );
          })}
        </View>

        <AppText variant="labelSm" color="onSurfaceVariant" center>
          {t('festivals.disclaimer')}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.marginMobile, gap: Spacing.stackLg },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, padding: 10 },
  iconWrap: { width: 36, height: 36, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  viewBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
