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
        <View style={{ flex: 1, paddingTop: 60, backgroundColor:"#fff" }}>
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
                style={{ alignSelf: "center", marginTop: 140 }} 
                width={scaleWidth(228)} 
                height={scaleHeight(56)} 
                text={"계속하기"} />
        </View>
    )
}

export default ChildInfoScreen; 