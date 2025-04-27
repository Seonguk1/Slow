import { View, Text, FlatList } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../../utils/responsive";
import { useFetchPosts } from "../../hooks/useBoard";
import { useEffect, useState } from "react";
import PostBox from "../../components/boxes/PostBox";
import { useRouter } from "expo-router";
import BoardLayout from "../../layouts/BoardLayout";
import LoadingView from "../../components/LoadingView";

const BoardListScreen = () => {
    const router = useRouter();
    const { fetchPosts } = useFetchPosts();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
            finally{
                setLoading(false);
            }   
        };

        loadPosts();
    }, []);

    if (loading)
        return <LoadingView />;

    const handlePress = (item) => {
        router.push({
            pathname: '/board/detail',
            params: {
                id: item.id,
                title: item.title,
                content: item.content,
                author: item.author,
            },
        });
    };

    return (
        <BoardLayout
            title={"자유 게시판"}
        >
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <PostBox
                            title={item.title}
                            content={item.content}
                            author={item.author}
                            onContentPress={() => { handlePress(item) }}
                        />
                    )
                }}
            />

        </BoardLayout>
    )
}

export default BoardListScreen;