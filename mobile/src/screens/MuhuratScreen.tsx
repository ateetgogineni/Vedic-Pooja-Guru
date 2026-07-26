import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById } from '@/data/poojas';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function MuhuratScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const { id } = useAppRoute('Muhurat').params;
  const pooja = getPoojaById(id);
  if (!pooja) return null;

  return (
    <Screen edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View>
          <AppText variant="headlineLgMobile" center>
            {t('muhurat.title')}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            {t('muhurat.subtitle')}
          </AppText>
        </View>

        <View style={[styles.card, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}>
          <Icon name="wb-sunny" color={colors.muhuratAmber} size={40} />
          <AppText variant="labelSm" color="primary" style={{ marginTop: Spacing.gutter, letterSpacing: 1 }}>
            {t('muhurat.recommended')}
          </AppText>
          <AppText variant="headlineMd" style={{ marginTop: 4 }}>
            Thursday, July 30th
          </AppText>
          <View style={styles.timeRow}>
            <AppText variant="bodyLg" color="onSurfaceVariant">
              06:45 AM
            </AppText>
            <View style={[styles.timeDivider, { backgroundColor: colors.outlineVariant }]} />
            <AppText variant="bodyLg" color="onSurfaceVariant">
              09:15 AM
            </AppText>
          </View>

          <View style={[styles.infoBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceContainerHigh }]}>
            <Icon name="info" color={colors.sacredGreen} size={20} />
            <View style={{ flex: 1 }}>
              <AppText variant="labelSm" color="onSurfaceVariant" style={{ marginBottom: 4 }}>
                {t('muhurat.infoLabel')}
              </AppText>
              <AppText variant="bodyMd" color="onSurfaceVariant">
                {t('muhurat.infoBody')}
              </AppText>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <Button
          label={t('muhurat.continueToPreparation')}
          icon="arrow-forward"
          iconPosition="right"
          onPress={() => navigation.navigate('Headcount', { id: pooja.id })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Spacing.marginMobile, gap: Spacing.stackMd },
  card: { borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.stackMd, alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, marginTop: Spacing.gutter, marginBottom: Spacing.stackMd },
  timeDivider: { width: 24, height: 1 },
  infoBox: { flexDirection: 'row', gap: Spacing.gutter, borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.gutter, width: '100%' },
});
