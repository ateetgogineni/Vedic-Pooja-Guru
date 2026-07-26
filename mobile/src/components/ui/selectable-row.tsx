import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = {
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectableRow({ title, subtitle, selected, onPress }: Props) {
  const { colors } = useAppTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.row,
          {
            backgroundColor: selected ? colors.softSand : colors.surfaceContainerLow,
            borderColor: selected ? colors.primaryContainer : 'transparent',
          },
        ]}
      >
        <View style={styles.textCol}>
          <AppText variant="bodyLg">{title}</AppText>
          {subtitle ? (
            <AppText variant="labelSm" color="onSurfaceVariant">
              {subtitle}
            </AppText>
          ) : null}
        </View>
        <View
          style={[
            styles.check,
            {
              borderColor: selected ? colors.primaryContainer : colors.outlineVariant,
              backgroundColor: selected ? colors.primaryContainer : 'transparent',
            },
          ]}
        >
          {selected ? <Icon name="check" color={colors.onPrimary} size={16} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    padding: Spacing.gutter,
    marginBottom: Spacing.stackSm,
  },
  textCol: { flex: 1, gap: 4 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.gutter,
  },
});
