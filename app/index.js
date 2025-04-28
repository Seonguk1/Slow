import { useEffect, useState } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import * as Font from 'expo-font';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase'; // 네 경로에 맞게 수정

export default function Index() {
  const router = useRouter();
  const navReady = useRootNavigationState();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'HakgyoansimBareondotumB': require('../src/assets/fonts/HakgyoansimBareondotumB.ttf'),
        'HakgyoansimBareondotumR': require('../src/assets/fonts/HakgyoansimBareondotumR.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (navReady?.key && fontsLoaded && authChecked) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/intro');
      }
    }
  }, [navReady, fontsLoaded, authChecked, user]);

  return null;
}
