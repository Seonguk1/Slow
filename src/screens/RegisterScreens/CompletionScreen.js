import { Image, Text, TouchableOpacity, View } from "react-native";
import {scaleWidth, scaleHeight, scaleFont} from "../../utils/responsive";
import { useRouter } from "expo-router";

const CompletionScreen = () => {
    const router = useRouter();
    return (
        <View style={{
            flex:1,
            backgroundColor:"#fff",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Image

            />
            <TouchableOpacity 
                style={{
                    backgroundColor:"#FF8A65",
                    width:scaleWidth(374),
                    height:scaleHeight(60),
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:8
                }}
                onPress={()=>{
                    router.push("/login")
                }}
            >
                <Text
                    style={{
                        fontFamily:"HakgyoansimBareondotumR",
                        color:"#fff",
                        fontSize:scaleFont(20),
                        fontWeight:700
                    }}
                >
                    시작하기
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CompletionScreen;