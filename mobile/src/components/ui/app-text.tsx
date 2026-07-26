import { Text, type TextProps } from 'react-native';

import { type ColorRole, Type } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Variant = keyof typeof Type;

type Props = TextProps & {
  variant?: Variant;
  color?: ColorRole;
  center?: boolean;
};

export function AppText({ variant = 'bodyMd', color = 'onSurface', center, style, ...rest }: Props) {
  const { colors } = useAppTheme();
  return (
    <Text
      style={[Type[variant], { color: colors[color] }, center && { textAlign: 'center' }, style]}
      {...rest}
    />
  );
}
