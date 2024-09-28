/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)/login` | `/(auth)/register` | `/(auth)/useBiometricAuth` | `/(auth)/useFetchUserName` | `/(tabs)` | `/(tabs)/employee` | `/(tabs)/home` | `/(tabs)/profile` | `/(tabs)/user` | `/_sitemap` | `/employee` | `/home` | `/login` | `/profile` | `/register` | `/useBiometricAuth` | `/useFetchUserName` | `/user` | `/user/edit`;
      DynamicRoutes: `/news/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/news/[item]`;
    }
  }
}
