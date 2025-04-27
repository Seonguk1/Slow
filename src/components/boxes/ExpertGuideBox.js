import { Image, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import formatDate from "@/utils/formatDate";

const ExpertGuideBox = ({ imageUrl, title, createdAt, onTitlePress }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 12,
                marginBottom: 20
            }}
        >
            <Image
                source={{ uri: imageUrl }}
                style={{
                    resizeMode: "cover",
                    width: "100%",
                    height: scaleHeight(150),
                    borderTopLeftRadius: 12
                }}
            />
            <TouchableOpacity onPress={onTitlePress}>
                <Text
                    style={{
                        fontFamily: "HakgyoansimBareondotumB",
                        fontSize: scaleFont(18),
                        color: "#573353",
                        fontWeight: 700,
                        letterSpacing: -0.54,
                        margin: 10
                    }}
                >
                    {title}
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text
                        style={{
                            fontFamily: "HakgyoansimBareondotumB",
                            fontSize: scaleFont(12),
                            color: "#573353",
                            fontWeight: 500,
                            letterSpacing: -0.36,
                            marginLeft: 10,
                            marginBottom: 5
                        }}
                    >
                        {formatDate(createdAt)}
                    </Text>
                    <Text
                        style={[
                            {
                                fontFamily: "HakgyoansimBareondotumB",
                                fontSize: scaleFont(12),
                                color: "#573353",
                                fontWeight: 500,
                                letterSpacing: -0.36,
                                marginLeft: 10,
                                marginBottom: 4
                            },
                            {
                                opacity: 0.5
                            }
                        ]}
                    >
                        37 Lessons
                    </Text>
                </View>
                <View>
                    <Text>
                        북마크
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ExpertGuideBox;