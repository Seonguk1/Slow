import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";

const data = [
    { id: 1, result: "81 ~ 84" },
    { id: 2, result: "76 ~ 80" },
    { id: 3, result: "71 ~ 75" },
    { id: 4, result: "70 미만" },
    { id: 5, result: "모름" },
]

const TestResultScreen = () => {
    const [selectedId, setSelectedId] = useState(null);
    const router = useRouter();
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#fff" }}
            contentContainerStyle={{ paddingTop: scaleHeight(60) }}
        >
            <TouchableOpacity style={{ marginBottom: scaleHeight(86) }}>
                <Text
                    style={{
                        color: "#FF8A65",
                        fontFamily: "HakgyoansimBareondotumR",
                        fontSize: scaleFont(20, 30),
                        fontWeight: 400,
                        marginLeft: scaleWidth(30)
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
                marginBottom: scaleHeight(30),
                color: "#37474F",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(23, 33),
                fontWeight: 700
            }}>
                웩슬러 아동 지능 검사 혹은{"\n"}
                dsm-4 검사를 진행한 적이 있나요?{"\n"}
                결과를 입력해주세요.
            </Text>

            <FlatList
                style={{
                    alignSelf: "center"
                }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                borderColor: 'rgba(255, 143, 104, 0.15)',
                                borderWidth: 1,
                                borderRadius: 38,
                                borderStyle: "solid",
                                width: scaleWidth(323),
                                height: scaleHeight(60),
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: scaleHeight(15),
                                backgroundColor: item.id != selectedId ? "#fff" : "rgba(255, 143, 104, 0.80)"
                            }}
                            onPress={() => {
                                setSelectedId(item.id);
                            }}
                        >
                            <Text style={{
                                color: item.id != selectedId ? "#FF8F68" : "#fff",
                                fontSize: scaleFont(24, 30),
                                fontWeight: 500,
                            }}>
                                {item.result}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <CustomButton
                onPress={() => { router.push("/register/symptomSurvey") }}
                style={{
                    alignSelf: "center",
                    marginTop: scaleHeight(60),
                }}
                width={228}
                height={56}
                text={"계속하기"} />
        </ScrollView>
    )
}
export default TestResultScreen;