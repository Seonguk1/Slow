import { Text } from "react-native";
import BoardLayout from "../../layouts/BoardLayout"
import { useLocalSearchParams } from "expo-router";

const ExpertGuideDetailScreen = () => {
    const { id, title, content, imageUrl, createdAt } = useLocalSearchParams();
    return (
        <BoardLayout>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ marginTop: 20, fontSize: 16 }}>{content}</Text>
        </BoardLayout>
    )
}

export default ExpertGuideDetailScreen;