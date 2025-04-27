import { View, Text } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../../utils/responsive";
import CustomButton from "../../components/CustomButton";
import { useCreatePost } from "../../hooks/useBoard";
import InputBox from "@/components/boxes/InputBox";
import { useState } from "react";
import BoardLayout from "../../layouts/BoardLayout";
import { useRouter } from "expo-router";
import LoadingOverlay from '@/components/LoadingOverlay';

const BoardWriteScreen = () => {
    const router = useRouter();
    const { createPost } = useCreatePost();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePress = async () => {
        try {
            setLoading(true);
            await createPost(title, content, '성욱');
            setTitle('');
            setContent('');
            router.push("/board/list");
        } catch (error) {
            console.error('글쓰기 실패:', error);
            Alert.alert('오류', '글 작성에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <BoardLayout
            boardTitle={"글쓰기"}
        >
            {loading && <LoadingOverlay />}

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
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
                    text={loading ? "작성 중..." : "글쓰기"}
                    disabled={loading}
                    width={scaleWidth(200)}
                    onPress={handlePress}

                />
            </View>
        </BoardLayout>
    )
}

export default BoardWriteScreen;