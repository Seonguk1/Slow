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
                width: scaleWidth(150),
                height: scaleHeight(210),
                borderRadius: 10,
                marginRight: scaleWidth(20),
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20
            }}>
                <Text style={{
                    color: 'rgba(36, 60, 96, 1)',
                    fontSize: scaleFont(22),
                    fontWeight: 700,
                    width: scaleWidth(130)
                }}>
                    {text}
                </Text>
                <Image source={image} style={{ width: scaleWidth(130), height: scaleHeight(107) }} resizeMode="contain" />
            </View>
        </TouchableOpacity>
    )
}

const FooterIconBox = ({ color, frontimage, backimage, text, time }) => {
    return (
        <TouchableOpacity>
            <View style={{
                backgroundColor: color,
                width: scaleWidth(309),
                height: scaleHeight(85),
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
                marginBottom: scaleHeight(20),
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <Image source={frontimage} style={{ width: scaleWidth(55), height: scaleHeight(55) }} resizeMode="contain" />
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={{ fontSize: scaleFont(16), fontWeight: '700', color: "rgba(36, 60, 96, 1)" }}>{text}</Text>
                    <Text style={{ fontSize: scaleFont(12), color: "rgba(36, 60, 96, 0.7)" }}>{time}</Text>
                </View>
                <Image source={backimage} style={{ width: scaleWidth(44), height: scaleHeight(44) }} resizeMode="contain" />
            </View>
        </TouchableOpacity>
    );
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
                fontSize: scaleFont(20),
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
                marginTop: 44,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 30,
                    marginTop: 43,
                    width: scaleWidth(325)
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


                <View style={{
                    width: scaleWidth(300),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15
                }}>
                    <Text style={{ color: 'rgba(36, 60, 96, 1)', fontWeight: 500, fontSize: scaleFont(16) }}>아이</Text>
                    <Text style={{ color: 'rgba(126, 232, 255, 1)', fontWeight: 700, fontSize: scaleFont(16) }}>{">"}</Text>
                </View>


                <View>
                    <FooterIconBox color={'rgba(255, 204, 102, 0.4)'} frontimage={profileIcon} backimage={arrowIcon} text={"JavaScript Avanzado"} time={"4시간 20분"}></FooterIconBox>
                    <FooterIconBox color={'rgba(69, 238, 226, 0.4)'} frontimage={profileIcon} backimage={arrowIcon} text={"JavaScript Avanzado"} time={"4시간 20분"}></FooterIconBox>
                </View>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen;