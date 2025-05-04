import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";

const data = [
    { id: 1, option: "학습", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 2, option: "음식", image: require("../../assets/images/interestSelectionImages/food.png") },
    { id: 3, option: "운동", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 4, option: "음악", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 5, option: "미술", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 6, option: "자연", image: require("../../assets/images/interestSelectionImages/learning.png") },
];

const InterestSelectionScreen = () => {
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
            <Text style={{
                alignSelf: "center",
                marginBottom: 30,
                color: "#37474F",
                fontFamily: "HakgyoansimBareondotumB",
                fontSize: scaleFont(25),
                fontWeight: "700"
            }}>
                아이의 관심사를 선택해주세요.
            </Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-evenly",
                    marginBottom: 0,
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={[
                                {
                                    width: scaleWidth(156),
                                    height: scaleHeight(212),
                                    borderRadius: 30,
                                    shadowOffset: { width: 3, height: 6 },
                                    shadowOpacity: 0.1,
                                    shadowColor: "#575757",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                index % 2 === 0
                                    ? { marginBottom: 56 }
                                    : { marginTop: 56 }
                            ]}
                            onPress={() => {
                                navigation.navigate("ParentInfo"); // Stack.Screen name="ParentInfo" 이어야 함
                            }}
                        >
                            <Image source={item.image} />
                            <Text
                                style={{
                                    fontFamily: "HakgyoansimBareondotumR",
                                    fontSize: scaleFont(22),
                                    fontWeight: "700"
                                }}
                            >
                                {item.option}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default InterestSelectionScreen;
