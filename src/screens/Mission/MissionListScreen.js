import { StyleSheet, Text, View } from "react-native";
import useUserInfo from "../../hooks/useUser/useUserInfo";
import LoadingView from "../../components/LoadingView";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";

const MissionListScreen = () => {
    const { userInfo, userLoading } = useUserInfo();

    if (userLoading)
        return <LoadingView />

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: 50
        }}>
            <View style={{
                flexDirection: "row"
            }}>

                <Text style={{
                    fontFamily: "HakgyoansimBareondotumB",
                    fontWeight: 700,
                    color: "#333333",
                    fontSize: scaleFont(24),
                    marginLeft: 30,
                    marginBottom:100
                }}>
                    {userInfo.nickname}야 안녕! 반가워
                </Text>
            </View>

            <Text style={{
                fontFamily: "HakgyoansimBareondotumB",
                fontWeight: 700,
                color: "#333333",
                fontSize: scaleFont(24),
                
            }}>
                오늘의 도전
            </Text>
        </View>
    )
}

export default MissionListScreen;