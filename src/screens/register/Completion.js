import { Image, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";

const CompletionScreen = () => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Image
                // source={} // 필요한 경우 이미지 소스 추가
                // style={{ width: scaleWidth(200), height: scaleHeight(200), marginBottom: 40 }}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "#FF8A65",
                    width: scaleWidth(374),
                    height: scaleHeight(60),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8
                }}
                onPress={() => {
                    navigation.navigate("Login"); // Stack.Screen name="Login" 이어야 함
                }}
            >
                <Text
                    style={{
                        fontFamily: "HakgyoansimBareondotumR",
                        color: "#fff",
                        fontSize: scaleFont(20),
                        fontWeight: "700"
                    }}
                >
                    시작하기
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CompletionScreen;
