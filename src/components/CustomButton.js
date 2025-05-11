import { scaleFont, scaleHeight, scaleWidth } from "@/utils/responsive";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({width, height, text, onPress, style})=>{
    return(
        <TouchableOpacity
            style={[{
                width: scaleWidth(width),
                height: scaleHeight(height),
                borderRadius: 30,
                borderColor:"#E6E1DA",
                borderWidth: 1,
                borderStyle:"solid",
                alignItems:"center",
                justifyContent:"center",
            },
            style
        ]}
            onPress={onPress}
        >   
            <Text
            style={{
                color:"#FF8A65",
                fontFamily:"HakgyoansimBareondotumB",
                fontSize: scaleFont(20, 25),
                fontWeight: 700

            }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;