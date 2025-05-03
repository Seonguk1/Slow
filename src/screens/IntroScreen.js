import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/assets/styles';
import { LinearGradient } from 'expo-linear-gradient';



const { width, height } = Dimensions.get('window');

const IntroScreen = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#FFE59A', '#FF914D']}
            style={styles.container}
        >

            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
                </View>
            </View>

            <Text style={[styles.title, { color: "#fff" }]}>SLOW</Text>

            {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}

export default IntroScreen;