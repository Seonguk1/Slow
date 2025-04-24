import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import { useRouter } from "expo-router";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";

const surveys = [
    {
        label: "집중력 부족",
        data: [
            { id: 1, option: "전혀 없음" },
            { id: 2, option: "가끔 있음" },
            { id: 3, option: "자주 있음" },
            { id: 4, option: "매우 심함" }
        ]
    },
    {
        label: "사회적 상호작용 어려움 정도",
        data: [
            { id: 1, option: "상" },
            { id: 2, option: "중" },
            { id: 3, option: "하" },
            { id: 4, option: "잘 모르겠습니다" }
        ]
    },
    {
        label: "학습 동기 저하",
        data: [
            { id: 1, option: "심함" },
            { id: 2, option: "보통" },
            { id: 3, option: "없음" },
            { id: 4, option: "잘 모르겠습니다" }
        ]
    },
    {
        label: "의사소통 능력",
        data: [
            { id: 1, option: "많이 부족" },
            { id: 2, option: "약간 부족" },
            { id: 3, option: "원활" },
            { id: 4, option: "잘 모르겠습니다" }
        ]
    },

]

const SymptomSurveyScreen = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#fff" }}>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 30,
                    marginBottom: 65
                }}
            >
                <TouchableOpacity
                    onPress={() => { router.back() }}
                >
                    <Text
                        style={styles.textHeader}
                        onPress={() => {
                            router.back();
                        }}
                    >
                        {"<  Back"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Text
                        style={styles.textHeader}
                    >
                        {"건너뛰기 >"}
                    </Text>
                </TouchableOpacity >
            </View>

            <Text
                style={{
                    color: "#37474F",
                    fontSize: scaleFont(25),
                    fontWeight: 700,
                    marginLeft: 40,
                    marginBottom: 50,
                    fontFamily: "HakgyoansimBareondotumB"
                }}
            >
                우리 아이는요...
            </Text>
            <View
                style={{
                    backgroundColor: "rgba(255, 138, 101, 0.80)",
                    width: scaleWidth(414),
                    height: scaleHeight(462),
                    marginBottom: 25
                }}
            >
                <Text
                    style={{
                        fontFamily: "HakgyoansimBareondotumB",
                        fontSize: scaleFont(25),
                        fontWeight: 700,
                        color: "#fff",
                        marginTop: 53,
                        marginLeft: 55,
                        marginBottom: 31
                    }}
                >
                    {surveys[currentIndex].label}
                </Text>
                <FlatList
                    data={surveys[currentIndex].data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: scaleWidth(323),
                                    height: scaleHeight(54),
                                    borderRadius: 36,
                                    backgroundColor: item.id !== selectedId ? "#fff" : "rgba(255, 255, 255, 0.70)",
                                    marginBottom: 20,
                                    alignSelf: "center",
                                    justifyContent: "center"
                                }}
                                onPress={() => {
                                    setSelectedId(item.id)
                                }}
                            >
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginHorizontal: 20
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: "HakgyoansimBareondotumR",
                                            color: "#232323",
                                            fontWeight: 400,
                                            fontSize: scaleFont(18),

                                        }}
                                    >
                                        {item.option}
                                    </Text>
                                    <View style={{
                                        width: 34,
                                        height: 34,
                                        borderColor: "#232323",
                                        borderWidth: 3,
                                        borderRadius: 50
                                    }}></View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight:20 }}>
                <View></View>
                <CustomButton
                    text={currentIndex !== surveys.length-1?"다음":"완료"}
                    width={scaleWidth(109)}
                    height={scaleHeight(55)}
                    onPress={()=>{
                        if(!selectedId){
                            Alert.alert("항목을 선택해주세요.")
                        }
                        setSelectedId(null)
                        if(currentIndex != surveys.length-1)
                            setCurrentIndex(currentIndex+1);
                        else{
                            router.push("/register/interestSelection")
                        }
                    }}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    textHeader: {
        color: "#FF8A65",
        fontFamily: "HakgyoansimBareondotumR",
        fontSize: scaleFont(20),
        fontWeight: 400,
    }
})

export default SymptomSurveyScreen;