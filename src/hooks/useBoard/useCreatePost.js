import { useAddDocument } from '@/hooks/firestore';

const useCreatePost = () => {
  const { addDocument } = useAddDocument('posts'); // 'posts' 컬렉션 고정

  const createPost = async (title, content, author) => {
    const newPost = {
      title,
      content,
      author,
    };
    return await addDocument(newPost);
  };

  return { createPost };
};

export default useCreatePost;
