import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default function Index() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  if (!authChecked) return null;

  return <Redirect href={user ? '/home' : '/intro'} />;
}
