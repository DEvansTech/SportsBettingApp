import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { Routes } from '@Navigators/routes';
import SplashScene from '@Scenes/Splash';
import LoginScene from '@Scenes/Login';
// import FeedbackScene from '@Scenes/Feedback';

import {
  Register as RegisterScene,
  EmailRegister as EmailRegisterScene
} from '@Scenes/Register';
import { DrawerNavigator } from '@Navigators/DrawerNavigator';

const Stack = createStackNavigator();
const options: StackNavigationOptions = {
  headerShown: false
  // safeAreaInsets: { top: 0, right: 0, left: 0 }
};

export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Splash}
      screenOptions={({ navigation }) => {
        return {
          ...options,
          detachPreviousScreen: !navigation.isFocused()
        };
      }}>
      <Stack.Screen name={Routes.Splash} component={SplashScene} />
      <Stack.Screen
        name={Routes.Login}
        component={LoginScene}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      />
      <Stack.Screen
        name={Routes.Register}
        component={RegisterScene}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      />
      <Stack.Screen
        name={Routes.EmailRegister}
        component={EmailRegisterScene}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      />
      {/* <Stack.Screen
        name={Routes.Feedback}
        component={FeedbackScene}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid
        }}
      /> */}
      <Stack.Screen
        name={Routes.DrawerNav}
        component={DrawerNavigator}
        options={{
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
};
