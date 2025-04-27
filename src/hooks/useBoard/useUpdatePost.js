import { useUpdateDocument } from '@/hooks/firestore';

const useUpdatePost = () => {
  const { updateDocument } = useUpdateDocument('posts');

  const updatePost = async (postId, updatedData) => {
    await updateDocument(postId, updatedData);
  };

  return { updatePost };
};

export default useUpdatePost;
