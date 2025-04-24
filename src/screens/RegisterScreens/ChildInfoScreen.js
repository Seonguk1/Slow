import { TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import {scaleWidth, scaleHeight, scaleFont} from "../../utils/responsive";


const InputBox = ({ label, placeholder }) => {
    const [value, setValue] = useState('');
    return (
        <View style={{
            width: scaleWidth(317),
            alignSelf: "center",
        }}>
            <Text style={{
                color: "black",
                fontFamily: "HakgyoansimBareondotumR",
                marginBottom: 10,
                fontSize: scaleFont(16),
            }}>
                {label}
            </Text>

            <View style={{
                width: scaleWidth(317),
                height: scaleHeight(54),
                borderColor: "#9E896A",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 40,
                justifyContent: "center",
                marginBottom: 15,
                alignSelf: "center"
            }}>
                {value === '' && (
                    <Text style={{
                        marginLeft: 20,
                        color: "#ACACAC",
                        fontSize: scaleFont(16),
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
                        marginLeft: 20,
                        width: scaleWidth(280),
                    }}
                />
            </View>




        </View>
    )
}

const ChildInfoScreen = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, marginTop: 60 }}>
            <TouchableOpacity style={{ marginBottom: 86 }}>
                <Text
                    style={{
                        color: "#FF8A65",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(20),
                        fontWeight: 400,
                        marginLeft: 30
                    }}
                    onPress={()=>{
                        router.back();
                    }}
                >
                    {"<  Back"}
                </Text>
            </TouchableOpacity>

            <Text style={{
                alignSelf: "center",
                marginBottom: 92,
                color: "#37474F",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(25),
                fontWeight: 700
            }}>
                아이의 정보를 입력해주세요
            </Text>


            <InputBox label={"이름을 입력해 주세요"} placeholder={"우리 아이를 이렇게 불러주세요"} />
            <InputBox label={"생년월일"} placeholder={"20XX/00/00"} />
            <InputBox label={"재학여부"} placeholder={"선택"} />
            <CustomButton
                onPress={() => { router.push("/register/testResult") }}
                style={{ alignSelf: "center", marginTop: 140 }} width={228} height={56} text={"계속하기"} />
        </View>
    )
}

export default ChildInfoScreen; 