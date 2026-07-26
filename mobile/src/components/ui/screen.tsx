import { ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/lib/theme-context';

type Props = ViewProps & {
  scroll?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  contentStyle?: ViewProps['style'];
};

export function Screen({ scroll, edges = ['top'], style, contentStyle, children, ...rest }: Props) {
  const { colors } = useAppTheme();
  const Container = scroll ? ScrollView : View;
  const containerProps = scroll
    ? { contentContainerStyle: [styles.content, contentStyle], keyboardShouldPersistTaps: 'handled' as const }
    : { style: [styles.content, contentStyle] };

  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: colors.background }, style]} {...rest}>
      <Container {...(containerProps as any)}>{children}</Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1 },
});
