import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Type } from '@/constants/theme';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import type { AppNavigation } from '@/navigation/hooks';
import type { TabParamList } from '@/navigation/types';
import { FestivalsScreen } from '@/screens/FestivalsScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { LibraryScreen } from '@/screens/LibraryScreen';
import { PanchangamScreen } from '@/screens/PanchangamScreen';

const Tab = createBottomTabNavigator<TabParamList>();

// Never actually shown — the Assistant tab's tabPress is intercepted below
// to push the Chat screen instead of switching tabs (see the AI/center-FAB
// tab-button pattern).
function EmptyScreen() {
  return null;
}

function TabIcon({ name, color, focused }: { name: string; color: ColorValue; focused: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.iconWrap, focused && { backgroundColor: colors.primaryContainer }]}>
      <Icon name={name} color={(focused ? colors.onPrimary : color) as string} size={22} />
    </View>
  );
}

function CenterTabIcon() {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.centerIconWrap, { backgroundColor: colors.primaryContainer, borderColor: colors.background }]}>
      <Icon name="auto-awesome" color={colors.onPrimary} size={26} />
    </View>
  );
}

export function TabNavigator() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: { backgroundColor: colors.surfaceContainer, borderTopWidth: 0 },
        tabBarLabelStyle: { fontFamily: Type.labelSm.fontFamily, fontSize: 11 },
        tabBarItemStyle: { paddingTop: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('tabs.home'), tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} /> }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: t('tabs.library'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="menu-book" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Assistant"
        component={EmptyScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => <CenterTabIcon />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            (navigation as unknown as AppNavigation).navigate('Chat', {});
          },
        })}
      />
      <Tab.Screen
        name="Panchangam"
        component={PanchangamScreen}
        options={{
          title: t('tabs.panchangam'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="calendar-today" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Festivals"
        component={FestivalsScreen}
        options={{
          title: t('tabs.festivals'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="festival" color={color} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Fixed size on purpose: @react-navigation/bottom-tabs' TabBarIcon renders
  // this inside an absolutely-positioned box pinned to a fixed 24x24
  // "Material" icon slot (see node_modules/@react-navigation/bottom-tabs/
  // lib/module/views/TabBarIcon.js). Padding-based (content-driven) sizing
  // gets squeezed by that 24px-wide ancestor before it reaches the icon
  // glyph itself; an explicit width/height escapes that squeeze instead.
  iconWrap: {
    width: 44,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  centerIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    marginTop: -24,
  },
});
