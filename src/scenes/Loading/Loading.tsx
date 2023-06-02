import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogoSpinner } from '@Components';
// import useInAppPurchase from '@Lib/useInAppPurchase';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';

const Loading: React.FC = () => {
  // const { validate } = useInAppPurchase();
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  useEffect(() => {
    (async function () {
      await AsyncStorage.setItem('@loggedUser', 'true');
      // const valid = await validate(true);
      if (true) {
        navigation.navigate(Routes.TabRoute);
      } else {
        navigation.navigate(Routes.Subscription, { state: false });
      }
    })();
  }, []);

  return <LogoSpinner />;
};

export default Loading;
