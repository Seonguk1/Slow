import React from 'react';
import RootNavigator from './src/navigations/RootNavigation';
import { View } from 'react-native';


const AppRootWrapper = ({ children }) => {
  return (
    <View style={{
      width: 414,
      height: 896,
      alignSelf: 'center',
      justifyContent:"center",
      overflow: 'hidden'
    }}>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <AppRootWrapper>
      <RootNavigator />
    </AppRootWrapper>

  );
}
