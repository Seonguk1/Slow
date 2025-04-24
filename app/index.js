import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const navReady = useRootNavigationState();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    if (!navReady?.key || !fontsLoaded) return;
    router.replace('/intro');
  }, [navReady, fontsLoaded]);

  return null;
}