import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

type Props = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function TopBar({ title = 'Vedic Pooja Guru', showBack = true, onBack, right }: Props) {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();

  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable
            onPress={onBack ?? (() => navigation.goBack())}
            hitSlop={8}
            style={({ pressed }) => [styles.iconBtn, pressed && { backgroundColor: colors.surfaceContainer }]}
          >
            <Icon name="arrow-back" color={colors.primary} size={24} />
          </Pressable>
        ) : null}
      </View>
      <AppText variant="mantraDisplay" color="primary" style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <View style={[styles.side, styles.sideRight]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: { width: 40, alignItems: 'flex-start' },
  sideRight: { alignItems: 'flex-end' },
  iconBtn: { padding: 8, borderRadius: 999 },
  title: { flex: 1, textAlign: 'center' },
});
