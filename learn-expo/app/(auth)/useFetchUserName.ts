import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const useFetchUserName = () => {
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await SecureStore.getItemAsync('user_id');
      setUserName(name || '');
      if (!name) {
        router.push('/(auth)/login');
      }
    };
    fetchUserName();
  }, []);

  return userName;
};

export default useFetchUserName;
