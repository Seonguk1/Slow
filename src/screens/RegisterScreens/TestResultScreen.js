import { Text, View, TouchableOpacity } from "react-native";

const TestResultScreen = () => {
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
                    onPress={() => {
                        router.back();
                    }}
                >
                    {"<  Back"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default TestResultScreen;