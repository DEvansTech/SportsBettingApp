import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { LogoSpinner } from '@Components';
import useInAppPurchase from '@Lib/useInAppPurchase';

import { Routes } from '@Navigators/routes';

const Loading: React.FC = () => {
  const { validate } = useInAppPurchase();
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  useEffect(() => {
    navigation.navigate(Routes.Introduction);
    // navigation.navigate(Routes.TabRoute);
    // (async function () {
    //   const valid = await validate(true);
    //   console.log();
    //   if (valid) {
    //     navigation.navigate(Routes.TabRoute);
    //   } else {
    //     navigation.navigate(Routes.Subscription, { state: false });
    //   }
    // })();
  }, []);

  return <LogoSpinner />;
};

export default Loading;
