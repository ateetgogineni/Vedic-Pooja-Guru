import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = {
  title: string;
  subtitle?: string;
  checked: boolean;
  onToggle: () => void;
};

export function CheckboxRow({ title, subtitle, checked, onToggle }: Props) {
  const { colors } = useAppTheme();
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? colors.primaryContainer : colors.outlineVariant,
            backgroundColor: checked ? colors.primaryContainer : colors.surfaceContainerLowest,
          },
        ]}
      >
        {checked ? <Icon name="check" color={colors.onPrimary} size={16} /> : null}
      </View>
      <View style={styles.textCol}>
        <AppText variant="bodyMd" style={checked && { textDecorationLine: 'line-through' }} color={checked ? 'onSurfaceVariant' : 'onSurface'}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="labelSm" color="onSurfaceVariant">
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.gutter, paddingVertical: 8 },
  box: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textCol: { flex: 1, gap: 2 },
});
