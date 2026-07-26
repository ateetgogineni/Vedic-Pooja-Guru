import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (next: boolean) => void;
};

export function ToggleRow({ icon, title, subtitle, value, onChange }: Props) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.surfaceContainerHigh }]}
    >
      <View style={styles.left}>
        <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainerHigh }]}>
          <Icon name={icon} color={colors.primary} size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="bodyMd">{title}</AppText>
          {subtitle ? (
            <AppText variant="labelSm" color="onSurfaceVariant" style={{ textTransform: 'none' }}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.surfaceContainerHighest, true: colors.primaryContainer }}
        thumbColor={colors.surfaceContainerLowest}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.gutter,
    marginBottom: Spacing.stackSm,
    gap: Spacing.gutter,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, flex: 1 },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
