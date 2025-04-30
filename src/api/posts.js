import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const createPost = async (postData) => {
    try {
        const postRef = await addDoc(collection(db, "posts"), {
            ...postData,
            createdAt: new Date(),
            likes: 0,
            comments: 0,
            views: 0,
            shares: 0,
        }); 
        console.log('게시글 생성 완료', postRef.id);
    } catch (error) {
        console.error('게시글 생성 실패', error);
        throw error;
    }
}

export default createPost;