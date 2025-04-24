import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // Expo Router 사용할 경우
import styles from '../assets/styles';
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
                {/* 로고 이미지 (원형 배경 + 아이콘) */}
                <View style={styles.logoCircle}>
                    <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
                </View>
            </View>

            <Text style={[styles.title,{color:"#fff"}]}>WELCOME TO SLOW!</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/onboarding')}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}

export default IntroScreen;