import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import {scaleWidth, scaleHeight, scaleFont} from "../utils/responsive";
import { LinearGradient } from 'expo-linear-gradient';



const InputBox = ({ label, placeholder }) => {
    const [value, setValue] = useState('');
    return(
        <View style={{
            width: scaleWidth(330),
            alignSelf: "center"
        }}>
            <Text style={{
                color: "#828A8F",
                fontFamily: "HakgyoansimBareondotumR",
                marginBottom: 50,
                fontWeight: 400,
                fontSize: scaleFont(14)
            }}>
                {label}
            </Text>

            <View style={{
                width: scaleWidth(330),
                height: scaleHeight(48),
                borderColor: "#E8E9EB",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 30,
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 100
            }}>
                {value === '' && (
                    <Text style={{
                        marginLeft: 30,
                        color: "#9D9D9D",
                        fontSize: scaleFont(15),
                        fontFamily: "HakgyoansimBareondotumR"
                    }}>
                        {placeholder}
                    </Text>
                )}
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={{
                        position: "absolute",
                        color: "#9D9D9D",
                        borderRadius: 30,
                        fontSize: scaleFont(15),
                        width: scaleWidth(330),
                        height: scaleHeight(48)
                    }}
                />
            </View>
        </View>
    )
}

const LoginScreen = ()=>{
    return(
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient
                colors={['#FFE59A', '#FF914D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    width: scaleWidth(414),
                    height: scaleHeight(200),
                    borderRadius: 10,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 200,
                    paddingBottom: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50
                }}
            >
                <Text style={{ color: 'white', fontSize: scaleFont(20), fontWeight: 700 }}>로그인</Text>
            </LinearGradient>
            <Text style={{
                width: scaleWidth(330),
                alignSelf: "center",
                marginBottom: 200,
                color: "#000",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(20),
                fontWeight: 700
            }}>
                이메일과 비밀번호를
                <br></br>
                입력해주세요.
            </Text>

            <InputBox label={"이메일"} placeholder={"sample@gmail.com"}/>
            <InputBox label={"비밀번호"} placeholder={"영문, 숫자, 특수문자 포함 8자 이상"}/>

            <View style = {{ width: scaleWidth(320), alignSelf: "center" }}>
                <Text style = {{ fontSize: scaleFont(13), color: "#4F5558" }}>
                    {"자동 로그인"}
                </Text>
            </View>
            <TouchableOpacity style={{ 
                marginTop: 130,
                backgroundColor: "#D2D5D6",
                width: scaleWidth(330),
                height: scaleHeight(58),
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 30
                }}>
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

            <View style = {{ marginTop: 100, width: scaleWidth(330), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', columnGap: 100 }}>
                <TouchableOpacity>
                    <Text style = {{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"회원가입"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"계정 찾기"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {{ fontSize: scaleFont(11), color: "#4F5558" }}>
                        {"비밀번호 재설정"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen; 