import { Text, View, TouchableOpacity } from "react-native"
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import InputBox from "../../components/boxes/InputBox";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
const ParentInfoScreen = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#fff" }}>
            <TouchableOpacity style={{ marginBottom: 86 }}>
                <Text
                    style={{
                        color: "#FF8A65",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(20),
                        fontWeight: 400,
                        marginLeft: 30
                    }}
                    onPress={() => {
                        router.back();
                    }}
                >
                    {"<  Back"}
                </Text>
            </TouchableOpacity>
            <Text style={{
                alignSelf: "center",
                marginBottom: 60,
                color: "#37474F",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(25),
                fontWeight: 700,
            }}>
                부모 정보를 입력해주세요.
            </Text>
            <InputBox
                label={"이름을 입력해주세요"}
                placeholder={"닉네임"}
            />
            <InputBox
                label={"생년월일"}
                placeholder={"20XX/00/00"}
            />
            <InputBox
                label={"E-MAIL"}
                placeholder={"선택"}
            />
            <InputBox
                label={"전화번호"}
                placeholder={"010-1234-5678"}
            />
            <CustomButton
                text={"계속하기"}
                width={scaleWidth(228)}
                height={scaleHeight(56)}
                style={{
                    marginTop:80,
                    alignSelf:"center"
                }}
                onPress={()=>{
                    router.push("/register/completion")
                }}
            />
        </View>
    )
}

export default ParentInfoScreen;