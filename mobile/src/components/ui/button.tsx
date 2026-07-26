import { ActivityIndicator, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Radius } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  disabled,
  loading,
  style,
  fullWidth = true,
}: Props) {
  const { colors } = useAppTheme();

  const bg = variant === 'primary' ? colors.primaryContainer : 'transparent';
  const border = variant === 'secondary' ? colors.primary : 'transparent';
  const textColor = variant === 'primary' ? colors.onPrimary : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: variant === 'secondary' ? 2 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && iconPosition === 'left' ? <Icon name={icon} color={textColor} size={18} /> : null}
          <AppText variant="labelSm" style={{ color: textColor, textTransform: variant === 'text' ? 'none' : 'uppercase' }}>
            {label}
          </AppText>
          {icon && iconPosition === 'right' ? <Icon name={icon} color={textColor} size={18} /> : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: Radius.full,
  },
  fullWidth: { alignSelf: 'stretch' },
});
