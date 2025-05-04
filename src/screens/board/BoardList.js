import { View, Text, FlatList } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { useFetchPosts, useUpdatePost } from "../../hooks/useBoard";
import { useEffect, useState } from "react";
import PostBox from "../../components/boxes/PostBox";
import { useNavigation } from '@react-navigation/native';
import BoardLayout from "../../layouts/BoardLayout";
import LoadingView from "../../components/LoadingView";
import formatDate from "../../utils/formatDate";

const BoardListScreen = () => {
    const navigation = useNavigation();
    const { fetchPosts } = useFetchPosts();
    const { updatePost } = useUpdatePost();
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
            finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading)
        return <LoadingView />;

    const handlePress = async (item) => {
        try {
            await updatePost(item.id, { views: item.views + 1 });
    
            setPosts(prev =>
                prev.map(post =>
                    post.id === item.id
                        ? { ...post, views: post.views + 1 }
                        : post
                )
            );
    
            navigation.navigate('BoardDetail', {  // 변경됨
                id: item.id,
                title: item.title,
                content: item.content,
                authorNickname: item.authorNickname,
                createdAt: formatDate(item.createdAt),
                likes: item.likes,
                comments: item.comments,
                views: item.views,
                shares: item.shares,
            });
        } catch (error) {
            console.error('Failed to update:', error);
        }
    };


    return (
        <BoardLayout
            title={"자유 게시판"}
        >
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                renderItem={({ item }) => {
                    return (
                        <PostBox
                            title={item.title}
                            content={item.content}
                            authorNickname={item.authorNickname}
                            createdAt={item.createdAt}
                            likes={item.likes}
                            comments={item.comments}
                            views={item.views}
                            shares={item.shares}
                            onContentPress={() => { handlePress(item) }}
                        />
                    )
                }}
            />

        </BoardLayout>
    )
}

export default BoardListScreen;