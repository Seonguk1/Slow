import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const data = [
    { id: 1, result: "81 ~ 84" },
    { id: 2, result: "76 ~ 80" },
    { id: 3, result: "71 ~ 75" },
    { id: 4, result: "70 미만" },
    { id: 5, result: "모름" },
];

const TestResultScreen = () => {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#fff" }}>
            <TouchableOpacity style={{ marginBottom: 86 }}>
                <Text
                    style={{
                        color: "#FF8A65",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(20),
                        fontWeight: "400",
                        marginLeft: 30
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    {"<  Back"}
                </Text>
            </TouchableOpacity>

            <Text
                style={{
                    alignSelf: "center",
                    marginBottom: 30,
                    color: "#37474F",
                    fontFamily: "HakgyoansimBareondotumB",
                    fontSize: scaleFont(23),
                    fontWeight: "700",
                    textAlign: "center"
                }}
            >
                웩슬러 아동 지능 검사 혹은{"\n"}
                DSM-4 검사를 진행한 적이 있나요?{"\n"}
                결과를 입력해주세요.
            </Text>

            <FlatList
                style={{ alignSelf: "center" }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            borderColor: 'rgba(255, 143, 104, 0.15)',
                            borderWidth: 1,
                            borderRadius: 38,
                            borderStyle: "solid",
                            width: scaleWidth(323),
                            height: scaleHeight(64),
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 15,
                            backgroundColor: item.id !== selectedId ? "#fff" : "rgba(255, 143, 104, 0.80)"
                        }}
                        onPress={() => {
                            setSelectedId(item.id);
                        }}
                    >
                        <Text style={{
                            color: item.id !== selectedId ? "#FF8F68" : "#fff",
                            fontSize: scaleFont(24),
                            fontWeight: "500"
                        }}>
                            {item.result}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <CustomButton
                onPress={() => {
                    navigation.navigate("SymptomSurvey"); // Stack.Screen name="SymptomSurvey" 이어야 함
                }}
                style={{ alignSelf: "center", marginBottom: 120 }}
                width={scaleWidth(228)}
                height={scaleHeight(56)}
                text={"계속하기"}
            />
        </View>
    );
};

export default TestResultScreen;
