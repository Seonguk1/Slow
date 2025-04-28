import { Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { useRouter } from "expo-router";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import AntDesign from '@expo/vector-icons/AntDesign';

const BoardLayout = ({ style, title, children }) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          router.replace('/intro'); // 로그아웃하면 다시 인트로로
        } catch (error) {
          console.error(error);
          alert('로그아웃 실패: ' + error.message);
        }
      };

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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 50
                }}
            >
                <TouchableOpacity
                    onPress={() => { router.back() }}
                >
                    <View
                        style={{
                            backgroundColor: "rgba(87, 51, 83, 0.1)",
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            width: scaleWidth(36),
                            height: scaleHeight(36)
                        }}
                    >
                        <AntDesign name="arrowleft" size={18    } color="#573353" />
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "HakgyoansimBareondotumB",
                        color: "#573353",
                        fontSize: scaleFont(18),
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: "rgba(87, 51, 83, 0.1)",
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        width: scaleWidth(36),
                        height: scaleHeight(36)
                    }}
                    onPress={handleLogout}
                >
                    <AntDesign name="logout" size={20} color="#573353" />

                </TouchableOpacity>
            </View>
            {children}

        </View>
    )
}

export default BoardLayout;