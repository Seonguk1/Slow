import { useEffect, useState } from "react";
import BoardLayout from "../../layouts/BoardLayout"
import LoadingView from "../../components/LoadingView";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { useRouter } from "expo-router";
import ExpertGuideBox from "../../components/boxes/ExpertGuideBox";
import { useFetchExpertGuides, useUpdateExpertGuide } from "@/hooks/useExpertGuide";


const ExpertGuideListScreen = () => {
    const router = useRouter();
    const { fetchExpertGuides } = useFetchExpertGuides();
    const { updateExpertGuide } = useUpdateExpertGuide();
    const [loading, setLoading] = useState(true);
    const [expertGuides, setExpertGuides] = useState([]);

    useEffect(() => {
        const loadExpertGuides = async () => {
            try {
                const data = await fetchExpertGuides();
                setExpertGuides(data);
            } catch (error) {
                console.error('Failed to fetch expert-guides:', error);
            }
            finally {
                setLoading(false);
            }
        }
        loadExpertGuides();
    }, [])

    if (loading)
        return (<LoadingView />)

    const handlePress = async (item) => {
        try {
            await updateExpertGuide(item.id, { views: item.views + 1 });

            setExpertGuides(prev =>
                prev.map(guide =>
                    guide.id === item.id
                        ? { ...guide, views: guide.views + 1 }
                        : guide
                )
            );

            router.push({
                pathname: '/expert-guide/detail',
                params: {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    imageUrl: item.imageUrl,
                    createdAt: item.createdAt
                }
            });
        } catch (error) {
            console.error('Failed to update views:', error);
        }
    };


    return (
        <BoardLayout
            title={"전문가 가이드"}
        >
            <FlatList
                data={expertGuides}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <ExpertGuideBox
                            imageUrl={item.imageUrl}
                            title={item.title}
                            views={item.views}
                            createdAt={item.createdAt}
                            onTitlePress={() => { handlePress(item) }}
                        />
                    )
                }}
            />
        </BoardLayout>
    )
}

export default ExpertGuideListScreen;