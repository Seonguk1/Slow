import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>홈 화면</Text>
      <Button
        title="상세화면으로 이동"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}
