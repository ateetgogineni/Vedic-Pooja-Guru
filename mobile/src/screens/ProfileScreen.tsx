import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth-context';
import { LANGUAGES, TRADITIONS, usePrefs } from '@/lib/prefs-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  trailing,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.row, { borderColor: colors.surfaceDim }]}>
      <View style={styles.rowLeft}>
        <Icon name={icon} color={colors.primary} size={22} />
        <AppText variant="bodyLg">{label}</AppText>
      </View>
      <View style={styles.rowRight}>
        {value ? (
          <AppText variant="bodyMd" color="onSurfaceVariant">
            {value}
          </AppText>
        ) : null}
        {trailing ?? (onPress ? <Icon name="chevron-right" color={colors.onSurfaceVariant} size={22} /> : null)}
      </View>
    </Pressable>
  );
}

export function ProfileScreen() {
  const { colors, scheme, setPreference } = useAppTheme();
  const { languageCode, traditionId } = usePrefs();
  const { user, isGuest, signOut } = useAuth();
  const navigation = useAppNavigation();

  const language = LANGUAGES.find((l) => l.code === languageCode)?.label ?? 'English';
  const tradition = TRADITIONS.find((t) => t.id === traditionId)?.label ?? 'North Indian';

  const onSignOut = async () => {
    if (!isGuest) await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Settings
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
            {isGuest ? 'Browsing as Guest' : user?.email}
          </AppText>
          {isGuest ? (
            <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 2 }}>
              Sign in to save your plans and checklists across devices.
            </AppText>
          ) : null}
        </View>

        <View style={[styles.card, { backgroundColor: colors.softSand, borderColor: colors.surfaceDim }]}>
          <SettingsRow
            icon="language"
            label="Language"
            value={language}
            onPress={() => navigation.navigate('Language', { from: 'settings' })}
          />
          <SettingsRow
            icon="explore"
            label="Region/Tradition"
            value={tradition}
            onPress={() => navigation.navigate('Tradition', { from: 'settings' })}
          />
          <SettingsRow
            icon="notifications"
            label="Notifications"
            onPress={() => Alert.alert('Notifications', 'Push notification preferences are coming in a future update.')}
          />
          <SettingsRow icon="support-agent" label="Help & Support" onPress={() => navigation.navigate('Help')} />
          <SettingsRow
            icon="dark-mode"
            label="Dark Mode"
            trailing={
              <Pressable
                onPress={() => setPreference(scheme === 'dark' ? 'light' : 'dark')}
                style={[
                  styles.switchTrack,
                  { backgroundColor: scheme === 'dark' ? colors.primaryContainer : colors.surfaceContainerHighest },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    { backgroundColor: colors.surfaceContainerLowest, transform: [{ translateX: scheme === 'dark' ? 20 : 0 }] },
                  ]}
                />
              </Pressable>
            }
          />
        </View>

        <Pressable
          onPress={onSignOut}
          style={[styles.signOutBtn, { borderColor: colors.primaryContainer, backgroundColor: colors.warmIvory }]}
        >
          <Icon name="logout" color={colors.primaryContainer} size={18} />
          <AppText variant="labelSm" color="primaryContainer">
            {isGuest ? 'SIGN IN' : 'SIGN OUT'}
          </AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd, paddingBottom: 48 },
  card: { borderRadius: Radius.xl, borderWidth: 1, paddingHorizontal: Spacing.gutter },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchTrack: { width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center' },
  switchThumb: { width: 20, height: 20, borderRadius: 10 },
  signOutBtn: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: Radius.full, paddingVertical: 12, paddingHorizontal: 32 },
});
