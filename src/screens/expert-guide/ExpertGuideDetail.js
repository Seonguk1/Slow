import { ScrollView, Text } from "react-native";
import BoardLayout from "../../layouts/BoardLayout";
import { useRoute } from "@react-navigation/native";

const ExpertGuideDetailScreen = () => {
    const route = useRoute();
    const { id, title, content, imageUrl, createdAt } = route.params;

    return (
        <BoardLayout>
            <ScrollView>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
                <Text style={{ marginTop: 20, fontSize: 16 }}>{content}</Text>
            </ScrollView>
        </BoardLayout>
    );
};

export default ExpertGuideDetailScreen;
