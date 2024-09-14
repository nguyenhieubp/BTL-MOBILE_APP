/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)/login` | `/(auth)/register` | `/(auth)/useBiometricAuth` | `/(auth)/useFetchUserName` | `/(news)/item` | `/(tabs)` | `/(tabs)/employee` | `/(tabs)/home` | `/(tabs)/profile` | `/(tabs)/user` | `/_sitemap` | `/employee` | `/home` | `/item` | `/login` | `/profile` | `/register` | `/useBiometricAuth` | `/useFetchUserName` | `/user` | `/user/edit`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
