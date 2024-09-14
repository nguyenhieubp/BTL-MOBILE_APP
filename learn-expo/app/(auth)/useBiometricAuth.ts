import { useState, useRef, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { AppState, AppStateStatus, Alert } from "react-native";
import { useRouter } from "expo-router";

const TIMEOUT_DURATION = 20000; // 20 giây

const useBiometricAuth = () => {
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log("Previous App State:", appState.current);
    console.log("Next App State:", nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (isSessionExpired) {
        await authenticateBiometric();
      } else {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      }
    } else if (nextAppState.match(/inactive|background/)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        setIsSessionExpired(true);
        await authenticateBiometric();
      }, TIMEOUT_DURATION);
    }

    appState.current = nextAppState;
  };

  const authenticateBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedBiometrics =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isBiometricAvailable = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && supportedBiometrics.length > 0 && isBiometricAvailable) {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Xác thực",
      });

      if (success) {
        setIsSessionExpired(false);
        clearTimeout(timeoutRef.current as NodeJS.Timeout); // Xóa timeout cũ
        timeoutRef.current = setTimeout(async () => {
          // Thiết lập lại timeout
          setIsSessionExpired(true);
          await authenticateBiometric();
        }, TIMEOUT_DURATION);
      } else {
        router.push("/(auth)/login");
      }
    } else {
      Alert.alert(
        "Không có xác thực sinh trắc học",
        "Thiết bị của bạn không hỗ trợ xác thực sinh trắc học.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login"),
          },
        ]
      );
    }
  };

  return { isSessionExpired };
};

export default useBiometricAuth;
