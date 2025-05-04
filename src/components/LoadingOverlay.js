import { View, ActivityIndicator } from 'react-native';

const LoadingOverlay = () => {
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" color="#FF8C42" />
    </View>
  );
};

export default LoadingOverlay;
