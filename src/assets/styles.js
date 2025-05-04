import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'linear-gradient', // 아래에서 대체함
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    logoContainer: {
      marginBottom: 40,
    },
    logoCircle: {
      width: 100,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    logoImage: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 30,
    //   fontWeight: '500',
      // color: '#fff',
      textAlign: 'center',
      marginBottom: 80,
    },
    button: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    buttonText: {
      color: '#FF5722',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  
export default styles;