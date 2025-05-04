import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const createUser = async (id, userData) => {
    try {
        const userRef = doc(db, "users", id); // 여기서 문서 ID를 명시적으로 설정
        await setDoc(userRef, {
            ...userData,
            createdAt: new Date(),
        });
        console.log('유저 생성 완료', userRef.id);
    } catch (error) {
        console.error('유저 생성 실패', error);
        throw error;
    }
}

export default createUser;
