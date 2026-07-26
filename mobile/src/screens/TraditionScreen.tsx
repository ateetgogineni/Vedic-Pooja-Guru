import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { TRADITIONS, usePrefs } from '@/lib/prefs-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation, useAppRoute } from '@/navigation/hooks';

export function TraditionScreen() {
  const { colors } = useAppTheme();
  const { traditionId, setTraditionId } = usePrefs();
  const navigation = useAppNavigation();
  const route = useAppRoute('Tradition');
  const fromSettings = route.params?.from === 'settings';

  return (
    <Screen edges={['top', 'bottom']}>
      <TopBar />
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="headlineLgMobile" center>
            Select your tradition
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: 8 }}>
            Customize your ritual experience based on your regional practices. You can always change this later in
            settings.
          </AppText>
        </View>

        <View style={{ flex: 1, gap: Spacing.gutter }}>
          {TRADITIONS.map((t) => {
            const selected = traditionId === t.id;
            return (
              <Pressable key={t.id} onPress={() => setTraditionId(t.id)}>
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: colors.softSand,
                      borderColor: selected ? colors.primaryContainer : 'transparent',
                    },
                  ]}
                >
                  <View style={styles.cardTop}>
                    <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <Icon name={t.icon} color={colors.primaryContainer} size={22} />
                    </View>
                    <View
                      style={[
                        styles.radio,
                        {
                          borderColor: selected ? colors.primaryContainer : colors.outlineVariant,
                          backgroundColor: selected ? colors.primaryContainer : 'transparent',
                        },
                      ]}
                    >
                      {selected ? <Icon name="check" color={colors.onPrimary} size={16} /> : null}
                    </View>
                  </View>
                  <AppText variant="headlineMd" style={{ marginTop: 12 }}>
                    {t.label}
                  </AppText>
                  <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
                    {t.description}
                  </AppText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Button
          label={fromSettings ? 'Save' : 'Continue'}
          onPress={() => (fromSettings ? navigation.goBack() : navigation.navigate('Auth'))}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: Spacing.marginMobile, gap: Spacing.stackMd },
  header: { marginBottom: Spacing.stackSm },
  card: { borderRadius: Radius.xl, borderWidth: 2, padding: Spacing.gutter },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
