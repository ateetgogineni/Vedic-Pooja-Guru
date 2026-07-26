import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { SelectableRow } from '@/components/ui/selectable-row';
import { TopBar } from '@/components/ui/top-bar';
import { Spacing } from '@/constants/theme';
import { useTranslation } from '@/lib/i18n';
import { LANGUAGES, usePrefs } from '@/lib/prefs-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function LanguageScreen() {
  const { languageCode, setLanguageCode } = usePrefs();
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const route = useAppRoute('Language');
  const fromSettings = route.params?.from === 'settings';

  return (
    <Screen edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="headlineLgMobile" center>
            {t('language.title')}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            {t('language.subtitle')}
          </AppText>
        </View>

        <View style={{ flex: 1 }}>
          {LANGUAGES.map((lang) => (
            <SelectableRow
              key={lang.code}
              title={lang.nativeLabel}
              subtitle={lang.label}
              selected={languageCode === lang.code}
              onPress={() => setLanguageCode(lang.code)}
            />
          ))}
        </View>

        <Button
          label={t(fromSettings ? 'common.save' : 'common.continue')}
          icon={fromSettings ? undefined : 'arrow-forward'}
          iconPosition="right"
          onPress={() => (fromSettings ? navigation.goBack() : navigation.navigate('Tradition'))}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Spacing.marginMobile, gap: Spacing.stackMd },
  header: { marginBottom: Spacing.stackSm },
});
