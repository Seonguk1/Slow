import { Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { useRouter } from "expo-router";

const BoardLayout = ({ style, title, children }) => {
    const router = useRouter();
    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: "#FEF3D4",
                    paddingTop: 50,
                    paddingHorizontal: 30,

                },
                style
            ]}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <TouchableOpacity
                    onPress={() => { router.back() }}
                >
                    <Text> {"<"} </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "HakgyoansimBareondotumB",
                        color: "#573353",
                        fontSize: scaleFont(18),
                        fontWeight: 700,
                        marginBottom: 50
                    }}
                >
                    {title}
                </Text>
                <TouchableOpacity>
                    <Text>설정</Text>
                </TouchableOpacity>
            </View>
            {children}

        </View>
    )
}

export default BoardLayout;