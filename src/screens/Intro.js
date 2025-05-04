import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '@/assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const IntroScreen = () => {
    const navigation = useNavigation();

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

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}

export default IntroScreen;