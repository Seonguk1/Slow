import { useGetCollection } from '@/hooks/firestore';

const useFetchPosts = () => {
  const { getCollection } = useGetCollection('posts');

  const fetchPosts = async () => {
    const posts = await getCollection();
    return posts;
  };

  return { fetchPosts };
};

export default useFetchPosts;
