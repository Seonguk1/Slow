import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "../../utils/responsive";
const SymptomSurveyScreen = () => {
    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#fff" }}>
            <TouchableOpacity style={{ marginBottom: 86 }}>
                <View
                    style={{ 
                        flexDirection: "row",
                        justifyContent:"space-between",
                        marginHorizontal:30 
                    }}
                >
                    <Text
                        style={styles.textHeader}
                        onPress={() => {
                            router.back();
                        }}
                    >
                        {"<  Back"}
                    </Text>
                    <Text
                        style={styles.textHeader}
                    >
                        {"건너뛰기 >"}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
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