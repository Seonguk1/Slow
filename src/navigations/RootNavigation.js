import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 기본 스크린
import IntroScreen from '@/screens/Intro';
import LoginScreen from '@/screens/Login';
import HomeScreen from '@/screens/Home';
import OnboardingScreen from '@/screens/Onboarding';
import ProfileScreen from '@/screens/Profile';

// 회원가입/설정 관련
import SignupScreen from '@/screens/register/Signup';
import CompletionScreen from '@/screens/register/Completion';
import ChildInfoScreen from '@/screens/register/ChildInfo';
import ParentInfoScreen from '@/screens/register/ParentInfo';
import InterestSelectionScreen from '@/screens/register/InterestSelection';
import TestResultScreen from '@/screens/register/TestResult';
import SymptomSurveyScreen from '@/screens/register/SymptomSurvey';

// 게시판 관련
import BoardListScreen from '@/screens/board/BoardList';
import BoardDetailScreen from '@/screens/board/BoardDetail';
import BoardWriteScreen from '@/screens/board/BoardWrite';

// 전문가 가이드
import ExpertGuideListScreen from '@/screens/expert-guide/ExpertGuideList';
import ExpertGuideDetailScreen from '@/screens/expert-guide/ExpertGuideDetail';

//import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      {/* <Stack.Screen name="Main" component={MainTabNavigator} /> */}
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* 회원가입/설정 flow */}
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Completion" component={CompletionScreen} />
      <Stack.Screen name="ChildInfo" component={ChildInfoScreen} />
      <Stack.Screen name="ParentInfo" component={ParentInfoScreen} />
      <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="SymptomSurvey" component={SymptomSurveyScreen} />

      {/* 게시판 */}
      <Stack.Screen name="BoardList" component={BoardListScreen} />
      <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
      <Stack.Screen name="BoardWrite" component={BoardWriteScreen} />

      {/* 전문가 가이드 */}
      <Stack.Screen name="ExpertGuideList" component={ExpertGuideListScreen} />
      <Stack.Screen name="ExpertGuideDetail" component={ExpertGuideDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;

