import { View, Text, Alert } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import CustomButton from "../../components/CustomButton";
import { useCreatePost } from "../../hooks/useBoard";
import InputBox from "@/components/boxes/InputBox";
import { useState } from "react";
import BoardLayout from "../../layouts/BoardLayout";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from '@/components/LoadingOverlay';
import useUserInfo from "../../hooks/useUser/useUserInfo";
import LoadingView from "../../components/LoadingView";

const BoardWriteScreen = () => {
    const navigation = useNavigation();
    const { handleCreatePost } = useCreatePost();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const { userInfo, userLoading } = useUserInfo();

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);
            await handleCreatePost({
                title,
                content,
                authorNickname: userInfo.nickname,
                authorUid: userInfo.uid,
            });
            setTitle('');
            setContent('');
            navigation.replace("BoardList"); // 화면 이름은 Stack.Screen의 name 값과 일치해야 함
        } catch (error) {
            console.error('글쓰기 실패:', error);
            Alert.alert('오류', '글 작성에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (userLoading)
        return <LoadingView />;

    return (
        <BoardLayout boardTitle={"글쓰기"}>
            {submitLoading && <LoadingOverlay />}

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <InputBox
                    label="제목"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChangeText={setTitle}
                />
                <InputBox
                    label="내용"
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChangeText={setContent}
                />
                <CustomButton
                    text={submitLoading ? "작성 중..." : "글쓰기"}
                    disabled={submitLoading}
                    width={scaleWidth(200)}
                    onPress={handleSubmit}
                />
            </View>
        </BoardLayout>
    );
};

export default BoardWriteScreen;
