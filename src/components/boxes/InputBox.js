import { Text, TextInput, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../../utils/responsive";

const InputBox = ({ label, placeholder, value, onChangeText }) => {
    return (
        <View style={{
            width: scaleWidth(317),
            alignSelf: "center",
        }}>
            <Text style={{
                color: "black",
                fontFamily: "HakgyoansimBareondotumR",
                marginBottom: 10,
                fontSize: scaleFont(16),
            }}>
                {label}
            </Text>

            <View style={{
                width: scaleWidth(317),
                height: scaleHeight(54),
                borderColor: "#9E896A",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 40,
                justifyContent: "center",
                marginBottom: 15,
                alignSelf: "center"
            }}>
                {value === '' && (
                    <Text style={{
                        marginLeft: 20,
                        color: "#ACACAC",
                        fontSize: scaleFont(16),
                        fontFamily: "HakgyoansimBareondotumR"
                    }}>
                        {placeholder}
                    </Text>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        position: "absolute",
                        marginLeft: 20,
                        width: scaleWidth(280),
                    }}
                />
            </View>

        </View>
    )
}

export default InputBox;
