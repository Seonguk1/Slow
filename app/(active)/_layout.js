import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import LoadingView from '../../src/components/LoadingView';

export default function ActiveLayout() {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace('/intro');
            }
            setCheckingAuth(false);
        });

        return unsubscribe;
    }, []);

    if (checkingAuth)
        return <LoadingView/>

    return <Stack screenOptions={{ headerShown: false }}/>;
}
