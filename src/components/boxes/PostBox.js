import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";

const PostBox = ({ title, content, author, onContentPress }) => {
    return (
        <View
            style={{
                width: "100%",
                borderRadius: 12,
                backgroundColor: "#fff",
                marginBottom: 15
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 15,
                    marginTop: 10
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Image
                        source={require("../../assets/images/default_profile.png")}
                        style={{
                            width: scaleWidth(33),
                            height: scaleHeight(33),
                            marginRight: 10
                        }}
                    />
                    <Text
                        style={styles.text}
                    >
                        {title}
                    </Text>

                    <View>
                        <Text style={styles.text}>{author}</Text>
                        <Text style={[styles.text, { fontSize: 12, opacity: 0.5 }]}>2분전</Text>
                    </View>
                </View>
                <View>
                    <Text>{"->"}</Text>
                </View>

            </View>
            <View
                style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#FFF3E9",
                    marginBottom: 15
                }}
            />
            <TouchableOpacity
                style={{ marginHorizontal: 15 }}
                onPress={onContentPress}
            >
                <Text style={styles.text}>
                    {content}
                </Text>
            </TouchableOpacity>
            <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
                <View />
                <View style={{ flexDirection: "row" }}>
                    <Text>♡</Text>
                    <Text>○</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "HakgyoansimBareondotumR",
        fontSize: scaleFont(14),
        fontWeight: 400,
        color: "#573353",
        marginRight: 10
    }
})

export default PostBox;