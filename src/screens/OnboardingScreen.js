import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../assets/styles";
import { useState } from "react";
import { PanResponder } from "react-native";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";



const indicatorSize = 8;

const OnboardingScreen = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const onboardingData = [
        { title: '혼자 고민하지 마세요', desc: '우리들의 느린학습자들을 위한\n든든한 동반자, 슬로우가 함께합니다' },
        { title: '정보는 부족하고,\n양육은 막막하셨죠?', desc: '진단부터 양육까지,  방향을 잡아드립니다' },
        { title: '우리 아이에게 꼭 맞는 성장 콘텐츠', desc: '일상 루틴, 사회성 훈련\n맞춤형 부모 가이드까지 한 곳에.' },
        { title: '지금부터 함께해요', desc: '아이도, 부모도 지치지 않도록\n느린 걸음에 맞춰 함께 걸어가요' },
    ];
    const onboardingImage = [
        require(`../assets/images/onboarding_1.png`),
        require(`../assets/images/onboarding_2.png`),
        require(`../assets/images/onboarding_3.png`),
        require(`../assets/images/onboarding_4.png`),
    ]

    // 컴포넌트 안에
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 20; // 가로로 슬라이드할 경우만 반응
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50) {
                // 오른쪽으로 스와이프 → 이전 화면
                setCurrentIndex(prev => Math.max(prev - 1, 0));
            }
            // else if (gestureState.dx < -50) {
            //     // 왼쪽으로 스와이프 → 다음 화면
            //     setCurrentIndex(prev => Math.min(prev + 1, onboardingData?.length - 1));
            // }
        },
    });

    return (
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            <View style={{ flex: 1, marginBottom: 100 }}>
                <Image
                    source={onboardingImage[currentIndex]}
                    style={{
                        width: "100%",

                    }}
                />
            </View>
            <View style={{ flex: 1, margin: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
                    {onboardingData[currentIndex].title}
                </Text>
                <Text>
                    {onboardingData[currentIndex].desc}
                </Text>
            </View>
            { currentIndex <3 ? <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 20, marginBottom: 50 }}>
                <TouchableOpacity >
                    <Text style={{ color: "#FF914D", fontWeight: "bold" }}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                    {onboardingData.map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: i == currentIndex ? indicatorSize * 2 : indicatorSize,
                                width: i == currentIndex ? indicatorSize * 2 : indicatorSize,
                                borderRadius: 20,
                                backgroundColor: '#FF914D',
                                marginHorizontal: 4,

                                alignSelf: "center",

                            }}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={() => {
                    setCurrentIndex(prev => Math.min(prev + 1, 3));
                }}>
                    <Text style={{ color: "#FF914D", fontWeight: "bold" }}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
            :
            <View style={{alignItems:"center", justifyContent:"center", marginBottom: 50}}>
                <CustomButton
                    width={150}
                    height={40}
                    text="시작하기"
                    onPress={()=>{
                        router.push("/register/childInfo")
                    }}
                />
            </View>    
        }
        </View>

    )
}

export default OnboardingScreen;