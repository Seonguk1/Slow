import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { scaleWidth, scaleHeight, scaleFont } from "../utils/responsive";
import { LinearGradient } from 'expo-linear-gradient';
import LoginInputBox from "../components/LoginInputBox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import LoadingOverlay from "../components/LoadingOverlay";

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true); 
        try {
          await signInWithEmailAndPassword(auth, email, password);
          router.replace('/home');
        } catch (error) {
          console.error(error);
          Alert.alert('로그인 실패', error.message);
        } finally {
          setLoading(false); 
        }
      };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {loading && <LoadingOverlay />}
            <LinearGradient
                colors={['#FFF59D', '#FF8A65']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    width: "100%",
                    height: scaleHeight(180),
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 100,
                    paddingBottom: 20,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30
                }}
            >
                <Text style={{ color: 'white', fontSize: scaleFont(20), fontWeight: 700 }}>로그인</Text>
            </LinearGradient>
            <Text style={{
                width: scaleWidth(330),
                alignSelf: "center",
                marginBottom: 30,
                color: "#000",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(20),
                fontWeight: 700
            }}>
                {"이메일과 비밀번호를\n입력해주세요."}
            </Text>

            <LoginInputBox
                label={"이메일"}
                placeholder={"sample@gmail.com"}
                value={email}
                onChangeText={setEmail}
            />
            <LoginInputBox
                label={"비밀번호"}
                placeholder={"영문, 숫자, 특수문자 포함 8자 이상"}
                value={password}
                onChangeText={setPassword}
            />


            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: "#D2D5D6",
                    width: scaleWidth(330),
                    height: scaleHeight(58),
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 8
                }}
                onPress={handleLogin}
            >
                <Text
                    style={{
                        color: "#FAFAFB",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(16),
                        fontWeight: 400,
                        alignSelf: "center"
                    }}
                >
                    {"로그인"}
                </Text>
            </TouchableOpacity>

            <View style={{ width: scaleWidth(320), alignSelf: "center" }}>
                <Text style={{ fontSize: scaleFont(13), color: "#4F5558" }}>
                    {"자동 로그인"}
                </Text>
            </View>
            <View style={{ marginTop: 100, width: scaleWidth(330), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', columnGap: 100 }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"회원가입"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"계정 찾기"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"비밀번호 재설정"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen; 