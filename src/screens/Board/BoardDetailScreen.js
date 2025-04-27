import { View, Text } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from "../../utils/responsive";
import { useLocalSearchParams } from "expo-router";
import BoardLayout from "../../layouts/BoardLayout";

const BoardDetailScreen = () => {
    const { id, title, content, author, createdAt } = useLocalSearchParams();

    return (
        <BoardLayout>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ marginTop: 10, color: 'gray' }}>날짜: {createdAt}</Text>
            <Text style={{ marginTop: 10, color: 'gray' }}>작성자: {author}</Text>
            <Text style={{ marginTop: 20, fontSize: 16 }}>{content}</Text>
        </BoardLayout>
    )
}

export default BoardDetailScreen;   