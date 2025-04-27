import { useEffect, useState } from "react";
import useFetchExpertGuides from "../../hooks/useExpertGuide/useFetchExpertGuides";
import BoardLayout from "../../layouts/BoardLayout"
import LoadingView from "../../components/LoadingView";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import { useRouter } from "expo-router";
import ExpertGuideBox from "../../components/boxes/ExpertGuideBox";


const ExpertGuideListScreen = () => {
    const router = useRouter();
    const { fetchExpertGuides } = useFetchExpertGuides();
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

    const handlePress = (item) => {
        router.push({
            pathname: '/expert-guide/detail',
            params: {
                id: item.id,
                title: item.title,
                content: item.content,
                imageUrl: item.imageUrl,
                createdAt: item.createdAt
            }
        })
    }

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