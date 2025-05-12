import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { scaleWidth, scaleHeight, scaleFont } from "../utils/responsive";
import { LinearGradient } from 'expo-linear-gradient';

import profileIcon from '../assets/images/homeSubIcon.png';
import arrowIcon from '../assets/images/tempHome.png';
import babyIcon from '../assets/images/homeMainBaby.png';
import parentIcon from '../assets/images/homeMainParent.png';
import { useRouter } from "expo-router";


const MainIconBox = ({ color, image, text, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{
                backgroundColor: color,
                width: scaleWidth(140),
                height: scaleHeight(230),
                borderRadius: 15,
                marginHorizontal: scaleWidth(10),
                padding: 20,
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    color: 'rgba(36, 60, 96, 1)',
                    fontSize: scaleFont(22, 30),
                    fontWeight: 600,
                    width: scaleWidth(130)
                }}>
                    {text}
                </Text>
                <Image source={image} style={{ width: scaleWidth(130), height: scaleHeight(107) }} resizeMode="contain" />
            </View>
        </TouchableOpacity>
    )
}

const HomeScreen = () => {
    const router = useRouter();
    return (
        <LinearGradient
            colors={['#FFE59A', '#FF914D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                width: scaleWidth(414),
                height: scaleHeight(847),
                alignItems: 'center',
                paddingTop: scaleHeight(49)
            }}
        >
            <Text style={{
                color: "#FFF",
                fontSize: scaleFont(20, 30),
                fontWeight: 900,
                marginBottom: scaleHeight(40)
            }}>
                HOME
            </Text>

            
            <Image source={require('../assets/images/tempHome.png')} style={{ width: scaleWidth(89), height: scaleHeight(89) }} resizeMode="contain" />


            <View style={{
                backgroundColor: "white",
                width: scaleWidth(414),
                height: scaleHeight(650),
                marginTop: scaleHeight(44),
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: scaleHeight(30),
                    marginTop: scaleHeight(43),
                    width: scaleWidth(325),
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MainIconBox
                        color={'rgba(126, 238, 174, 1)'}
                        image={babyIcon}
                        text={"우리아이\n이해하기"}
                        onPress={()=>{router.push("/test")}} //임시
                    />
                    <MainIconBox
                        color={'rgba(255, 234, 164, 1)'}
                        image={parentIcon}
                        text={"보호자\n커뮤니티"}
                        onPress={()=>{router.push("/board/list")}}
                    />
                </View>
                <TouchableOpacity>
                    <View style={{
                        backgroundColor: 'rgba(51, 50, 66, 0.5)',
                        width: scaleWidth(300),
                        height: scaleHeight(95),
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: scaleHeight(20),
                        paddingLeft: scaleWidth(10),
                        paddingRight: scaleWidth(10)
                    }}>
                        <View style={{ flex: 1, marginLeft: scaleWidth(15) }}>
                            <Text style={{ fontSize: scaleFont(16, 26), fontWeight: '600', color: "#FFF" }}>우리 아이 성장 로드맵</Text>
                            <Text style={{ fontSize: scaleFont(12, 22), color: "#FFF" }}>진단부터 맞춤 교육까지</Text>
                        </View>
                        <Image source={arrowIcon} style={{ width: scaleWidth(44), height: scaleHeight(44) }} resizeMode="contain" />
                    </View>
                </TouchableOpacity>


                <View style={{
                    width: scaleWidth(300),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: scaleHeight(15)
                }}>
                    <Text style={{ color: 'rgba(36, 60, 96, 1)', fontWeight: 500, fontSize: scaleFont(16, 26) }}>아이</Text>
                    <Text style={{ color: 'rgba(126, 232, 255, 1)', fontWeight: 700, fontSize: scaleFont(16, 26) }}>{">"}</Text>
                </View>

                <TouchableOpacity>
                    <View style={{
                        backgroundColor: '#FEF3D4',
                        width: scaleWidth(300),
                        height: scaleHeight(95),
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: scaleHeight(20),
                        paddingLeft: scaleWidth(10),
                        paddingRight: scaleWidth(10)
                    }}>
                        <Image source={arrowIcon} style={{ width: scaleWidth(44), height: scaleHeight(44), marginLeft: scaleWidth(10) }} resizeMode="contain" />
                        <View style={{ marginLeft: scaleWidth(15) }}>
                            <Text style={{ fontSize: scaleFont(16, 26), fontWeight: '700', color: "#000" }}>미션 리포트</Text>
                            <Text style={{ fontSize: scaleFont(12, 22), color: "#000" }}>아이의 활동 기록 살펴보기</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen;
