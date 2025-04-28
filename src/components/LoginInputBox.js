import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../utils/responsive";

const LoginInputBox = ({ label, placeholder, value, onChangeText }) => {
    return (
        <View style={{
            width: scaleWidth(330),
            alignSelf: "center"
        }}>
            <Text style={{
                color: "#828A8F",
                fontFamily: "HakgyoansimBareondotumR",
                marginBottom: 10,
                fontWeight: 400,
                fontSize: scaleFont(14)
            }}>
                {label}
            </Text>

            <View style={{
                width: scaleWidth(330),
                height: scaleHeight(48),
                borderColor: "#E8E9EB",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 8,
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 20
            }}>
                {value === '' && (
                    <Text style={{
                        marginLeft: 30,
                        color: "#9D9D9D",
                        fontSize: scaleFont(15),
                        fontFamily: "HakgyoansimBareondotumR",
                    }}>
                        {placeholder}
                    </Text>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        position: "absolute",
                        color: "#9D9D9D",
                        borderRadius: 30,
                        fontSize: scaleFont(15),
                        width: scaleWidth(330),
                        height: scaleHeight(48),
                        paddingLeft:30
                    }}
                />
            </View>
        </View>
    )
}

export default LoginInputBox;