import { View, ActivityIndicator } from 'react-native';

const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FF8C42" />
    </View>
  );
};

export default LoadingView;
