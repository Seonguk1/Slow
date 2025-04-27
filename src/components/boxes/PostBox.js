import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import timeAgo from "../../utils/timeAgo";
const PostBox = ({ title, content, author, createdAt, onContentPress }) => {
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
                    <View>
                        <Text
                            style={styles.text}
                        >
                            {title}
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        >
                            <Text style={[styles.text, { fontSize: scaleFont(12)}]}>{author}</Text>
                            <Text style={[styles.text, { fontSize: scaleFont(12), opacity: 0.5 }]}>{timeAgo(createdAt)}</Text>
                        </View>
                    </View>
                </View>

                <Ionicons name="arrow-redo-sharp" size={20} color="black" />


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
                style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15, marginBottom: 5 }}
            >
                <View />
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Feather name="heart" size={15} color="black" />

                    <Text> 1   </Text>
                    <Feather name="message-circle" size={15} color="black" />
                    <Text> 0</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "HakgyoansimBareondotumR",
        fontSize: scaleFont(15),
        fontWeight: 400,
        color: "#573353",
        marginRight: 10
    }
})

export default PostBox;