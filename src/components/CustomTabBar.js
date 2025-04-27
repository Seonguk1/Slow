import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

CustomTabBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Ionicons name="home-outline" size={28} color="#8F8F8F" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/board/list')}>
        <Ionicons name="list-outline" size={28} color="#8F8F8F" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.fabButton} onPress={() => router.push('/board/write')}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/expert-guide/list')}>
        <Ionicons name="documents-outline" size={28} color="#8F8F8F" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/search')}>
        <Ionicons name="search-outline" size={28} color="#8F8F8F" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fabButton: {
    width: 64,
    height: 64,
    backgroundColor: '#FFA07A',  // 오렌지톤
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default CustomTabBar;