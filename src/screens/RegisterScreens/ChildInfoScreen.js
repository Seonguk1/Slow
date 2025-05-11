import { TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import {scaleWidth, scaleHeight, scaleFont} from "../../utils/responsive";
import InputBox from "../../components/boxes/InputBox";

const ChildInfoScreen = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, paddingTop: scaleHeight(60), backgroundColor:"#fff" }}>
            <TouchableOpacity style={{ marginBottom: scaleHeight(86) }}>
                <Text
                    style={{
                        color: "#FF8A65",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(20, 30),
                        fontWeight: 400,
                        marginLeft: scaleWidth(30)
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
                marginBottom: scaleHeight(92),
                color: "#37474F",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(25, 35),
                fontWeight: 700
            }}>
                아이의 정보를 입력해주세요
            </Text>


            <InputBox label={"이름을 입력해 주세요"} placeholder={"우리 아이를 이렇게 불러주세요"} />
            <InputBox label={"생년월일"} placeholder={"20XX/00/00"} />
            <InputBox label={"재학여부"} placeholder={"선택"} />
            <CustomButton
                onPress={() => { router.push("/register/testResult") }}
                style={{ alignSelf: "center", marginTop: scaleHeight(100) }} 
                width={228} 
                height={56} 
                text={"계속하기"} />
        </View>
    )
}

export default ChildInfoScreen; 