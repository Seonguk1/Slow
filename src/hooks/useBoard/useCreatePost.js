import createPost from "@/api/posts";

const useCreatePost = () => {
  //추가 함수 생길 수 있기 때문에 훅으로 관리

  const handleCreatePost = async ({ title, content, authorNickname, authorUid }) => {
    return await createPost({
      title,
      content,
      authorNickname,
      authorUid,
    });
  };

  return { handleCreatePost };
};

export default useCreatePost;
