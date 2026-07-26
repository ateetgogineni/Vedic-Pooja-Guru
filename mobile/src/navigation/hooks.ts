import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AppParamList } from '@/navigation/types';

export type AppNavigation = NativeStackNavigationProp<AppParamList>;

export function useAppNavigation() {
  return useNavigation<AppNavigation>();
}

export function useAppRoute<Name extends keyof AppParamList>(_name?: Name) {
  return useRoute<RouteProp<AppParamList, Name>>();
}
