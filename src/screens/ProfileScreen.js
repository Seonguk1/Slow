import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { auth, db } from "@/config/firebase"; // 경로 확인
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import LoadingView from "../components/LoadingView";
import useUserInfo from "../hooks/useUser/useUserInfo";

 const ProfileScreen = ()=> {
    const router = useRouter();
    const { userInfo, userLoading } = useUserInfo();

    if (userLoading)
        return <LoadingView />

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text>이메일: {userInfo.email}</Text>
            <Text>닉네임: {userInfo.nickname}</Text>
            <Text>가입일: {userInfo.createdAt}</Text>

            <Button title="홈으로 가기" onPress={() => router.push('/home')} />
        </View>
    );
}
export default ProfileScreen;