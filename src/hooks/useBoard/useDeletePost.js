import { useDeleteDocument } from '@/hooks/firestore';

const useDeletePost = () => {
  const { deleteDocument } = useDeleteDocument('posts');

  const deletePost = async (postId) => {
    await deleteDocument(postId);
  };

  return { deletePost };
};

export default useDeletePost;
