import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
import { useRouter } from "expo-router";

const data = [
    { id: 1, option: "학습", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 2, option: "음식", image: require("../../assets/images/interestSelectionImages/food.png") },
    { id: 3, option: "운동", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 4, option: "음악", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 4, option: "음악", image: require("../../assets/images/interestSelectionImages/learning.png") },
    { id: 4, option: "음악", image: require("../../assets/images/interestSelectionImages/learning.png") },
]

const InterestSelectionScreen = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, paddingTop: scaleHeight(60), backgroundColor: "#fff" }}>
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
                fontSize: scaleFont(25, 35),
                fontWeight: 700
            }}>
                아이의 관심사를 선택해주세요.
            </Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
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
                                    shadowOffset: { width: 3, height: 3 },
                                    shadowOpacity: 0.1,
                                    shadowColor: "#575757",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                index % 2 === 0
                                    ? { marginBottom: scaleHeight(56) }
                                    : { marginTop: scaleHeight(56) }
                            ]}
                        
                            onPress={()=>{
                                router.push("/register/parentInfo")
                            }}
                        >
                            <Image
                                source={item.image}
                            />
                            <Text
                                style={{
                                    fontFamily: "HakgyoansimBareondotumR",
                                    fontSize: scaleFont(22, 30),
                                    fontWeight: 700
                                }}
                            >
                                {item.option}
                            </Text>
                        </TouchableOpacity>
                    )
                }}

            />
        </View>
    )
}

export default InterestSelectionScreen;