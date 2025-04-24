import * as Font from 'expo-font';
import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const navReady = useRootNavigationState();

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'HakgyoansimBareondotumB': require('../src/assets/fonts/HakgyoansimBareondotumB.ttf'),
        'HakgyoansimBareondotumR': require('../src/assets/fonts/HakgyoansimBareondotumR.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!navReady?.key) return;
    router.replace('/intro');
  }, [navReady]);

  return null;
}