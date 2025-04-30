import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useRouter } from "expo-router";
import LoadingOverlay from "../../components/LoadingOverlay";
import { createUserWithEmailAndPassword } from "firebase/auth";
import InputBox from "../../components/boxes/InputBox";
import CustomButton from "../../components/CustomButton";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { auth } from '@/config/firebase';
import useCreateUser from "../../hooks/useUser/useCreatUser";
import checkNicknameExists from "@/api/checkNickname";

const SignupScreen = () => {
    const router = useRouter();
    const { handleCreateUser } = useCreateUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/missing-email':
                return '이메일을 입력해주세요.';
            case 'auth/invalid-email':
                return '올바른 이메일 형식이 아닙니다.';
            case 'auth/email-already-in-use':
                return '이미 가입된 이메일입니다.';
            case 'auth/missing-password':
                return '비밀번호를 입력해주세요.';
            case 'auth/weak-password':
                return '비밀번호는 최소 8자 이상, 문자와 숫자를 포함하여야 합니다.';
            case 'nickname/missing':
                return '닉네임을 입력해주세요.'
            case 'nickname/duplicate':
                return '이미 존재하는 닉네임입니다.';
            default:
                return '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);

            if (!email) {
                const error = new Error('이메일을 입력해주세요.');
                error.code = 'auth/missing-email';
                throw error;
            }
            if (!password) {
                const error = new Error('비밀번호를 입력해주세요.');
                error.code = 'auth/missing-password';
                throw error;
            }
            if (!nickname) {
                const error = new Error('닉네임을 입력해주세요.');
                error.code = 'nickname/missing';
                throw error;
            }

            const isDuplicate = await checkNicknameExists(nickname);
            if (isDuplicate) {
                const error = new Error('이미 존재하는 닉네임입니다.');
                error.code = 'nickname/duplicate';
                throw error;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            handleCreateUser({
                id: user.uid,
                nickname,
            })

            Alert.alert('회원가입 성공', `환영합니다, ${user.email}!`);
            console.log('회원가입 성공', `환영합니다, ${user.uid}!`)
            router.push("register/completion")
        } catch (error) {
            const msg = getErrorMessage(error.code);
            setError(msg);
        }
        finally {
            setSubmitLoading(false);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                margin: 50
            }}
        >
            {submitLoading && <LoadingOverlay />}

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <InputBox
                    label="이메일"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChangeText={setEmail}
                />
                <InputBox
                    label="비밀번호"
                    placeholder="내용을 입력하세요"
                    value={password}
                    onChangeText={setPassword}
                />
                <InputBox
                    label="닉네임"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChangeText={setNickname}
                />
                {error &&
                    <Text
                        style={{
                            color: "red",
                            marginBottom: 10
                        }}
                    >
                        {error}
                    </Text>}
                <CustomButton
                    text={submitLoading ? "회원가입 중..." : "회원가입"}
                    disabled={submitLoading}
                    width={scaleWidth(200)}
                    onPress={handleSubmit}

                />
            </View>
        </View>
    )
}
export default SignupScreen;