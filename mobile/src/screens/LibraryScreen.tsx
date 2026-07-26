import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { poojas } from '@/data/poojas';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

export function LibraryScreen() {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Vidhi
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <AppText variant="headlineLgMobile">Pooja Library</AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
            Browse guided rituals for your tradition.
          </AppText>
        </View>

        {poojas.map((p) => {
          const hasContent = p.items.length > 0 && p.steps.length > 0;
          return (
            <Pressable
              key={p.id}
              onPress={() => navigation.navigate('PoojaDetail', { id: p.id })}
              style={[styles.card, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}
            >
              <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainerHighest }]}>
                <Icon name={p.icon} color={colors.primaryContainer} size={28} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <AppText variant="labelSm" color="sacredGreen">
                  {p.tagline.toUpperCase()}
                </AppText>
                <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
                  {p.name}
                </AppText>
                <AppText variant="bodyMd" color="onSurfaceVariant" numberOfLines={2}>
                  {p.description}
                </AppText>
                <View style={styles.metaRow}>
                  <Icon name="schedule" color={colors.onSurfaceVariant} size={14} />
                  <AppText variant="labelSm" color="onSurfaceVariant">
                    {p.durationLabel}
                  </AppText>
                  {!hasContent ? (
                    <AppText variant="labelSm" color="muhuratAmber" style={{ marginLeft: 8 }}>
                      COMING SOON
                    </AppText>
                  ) : null}
                </View>
              </View>
              <Icon name="chevron-right" color={colors.onSurfaceVariant} size={22} />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: { padding: Spacing.marginMobile, gap: Spacing.gutter, paddingBottom: 48 },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter },
  iconWrap: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
});
