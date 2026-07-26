import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = TextInputProps & {
  label?: string;
};

export function TextField({ label, style, ...rest }: Props) {
  const { colors } = useAppTheme();
  return (
    <View style={{ gap: 8 }}>
      {label ? (
        <AppText variant="labelSm" color="onSurfaceVariant">
          {label}
        </AppText>
      ) : null}
      <TextInput
        placeholderTextColor={colors.outlineVariant}
        style={[
          styles.input,
          { backgroundColor: colors.softSand, borderColor: colors.outlineVariant, color: colors.onSurface },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.gutter,
    paddingVertical: 12,
    fontSize: 16,
  },
});
