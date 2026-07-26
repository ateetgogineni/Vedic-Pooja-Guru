import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Type } from '@/constants/theme';
import { useAppTheme } from '@/lib/theme-context';
import type { TabParamList } from '@/navigation/types';
import { HomeScreen } from '@/screens/HomeScreen';
import { LibraryScreen } from '@/screens/LibraryScreen';
import { PanchangamScreen } from '@/screens/PanchangamScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ name, color, focused }: { name: string; color: ColorValue; focused: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.iconWrap, focused && { backgroundColor: colors.primaryContainer }]}>
      <Icon name={name} color={(focused ? colors.onPrimary : color) as string} size={22} />
    </View>
  );
}

export function TabNavigator() {
  const { colors } = useAppTheme();

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
        options={{ title: 'Home', tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} /> }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => <TabIcon name="menu-book" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Panchangam"
        component={PanchangamScreen}
        options={{
          title: 'Panchangam',
          tabBarIcon: ({ color, focused }) => <TabIcon name="calendar-today" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabIcon name="person" color={color} focused={focused} />,
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
});
