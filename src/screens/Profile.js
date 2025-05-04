import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingView from "../components/LoadingView";
import useUserInfo from "../hooks/useUser/useUserInfo";
import { useNavigation } from "@react-navigation/native";

 const ProfileScreen = ()=> {
    const navigation = useNavigation();
    const { userInfo, userLoading } = useUserInfo();

    if (userLoading)
        return <LoadingView />

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text>이메일: {userInfo.email}</Text>
            <Text>닉네임: {userInfo.nickname}</Text>
            <Text>가입일: {userInfo.createdAt}</Text>

            <Button title="홈으로 가기" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}
export default ProfileScreen;