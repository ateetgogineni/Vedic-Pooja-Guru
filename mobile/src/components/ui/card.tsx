import { StyleSheet, View, type ViewProps } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = ViewProps & { padded?: boolean };

export function Card({ style, padded = true, ...rest }: Props) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.softSand, borderColor: colors.surfaceDim },
        padded && { padding: Spacing.gutter },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
