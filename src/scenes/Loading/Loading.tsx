import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { LogoSpinner } from '@Components';
import useInAppPurchase from '@Lib/useInAppPurchase';

import { Routes } from '@Navigators/routes';

const Loading: React.FC = () => {
  const { validate, setIsRequest } = useInAppPurchase();
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  useEffect(() => {
    navigation.navigate(Routes.Dashboard);
    // (async function () {
    //   const valid = await validate(true);
    //   if (valid) {
    //     navigation.navigate(Routes.Dashboard);
    //   } else {
    //     navigation.navigate(Routes.Subscription, { state: false });
    //   }
    // })();
  }, []);

  return <LogoSpinner />;
};

export default Loading;
