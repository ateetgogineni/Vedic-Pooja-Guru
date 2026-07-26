import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { type ColorRole } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';

type Props = {
  icon: string;
  size?: number;
  bg?: ColorRole;
  color?: ColorRole;
};

export function IconBadge({ icon, size = 40, bg = 'surfaceContainerHigh', color = 'primary' }: Props) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: colors[bg] },
      ]}
    >
      <Icon name={icon} color={colors[color]} size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
