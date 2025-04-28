import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { scaleWidth, scaleHeight, scaleFont } from "@/utils/responsive";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CustomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const TabButton = ({ name, route }) => {
    const isFocused = pathname.startsWith(route);

    return (
      <TouchableOpacity
        onPress={() => router.push(route)}
        style={{ width: scaleWidth(50), alignItems: 'center' }}
      >
        <Ionicons
          name={name}
          size={isFocused ? scaleHeight(30) : scaleHeight(28)}
          color={isFocused ? '#573353' : '#8F8F8F'} // 포커스 시 진한색
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <TabButton name="home-outline" route="/home" />

      <TabButton name="list-outline" route="/board/list" />


      <TouchableOpacity style={styles.fabButton} onPress={() => router.push('/board/write')}>
        <Ionicons name="add" size={scaleHeight(32)} color="white" />
      </TouchableOpacity>


      <TabButton name="documents-outline" route="/expert-guide/list" />

      <TabButton name="information-circle-outline" route="/profile" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scaleHeight(70),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fabButton: {
    width: scaleWidth(64),
    height: scaleHeight(64),
    backgroundColor: '#FFA07A',  // 오렌지톤
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default CustomTabBar;