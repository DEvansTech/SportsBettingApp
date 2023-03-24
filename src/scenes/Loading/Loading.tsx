import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

import { LogoSpinner } from '@Components';
import useInAppPurchase from '@Lib/useInAppPurchase';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';

const Loading: React.FC = () => {
  const { validate } = useInAppPurchase();
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user } = useContext(AuthContext) as AuthContextType;

  const getIntroPageState = async () => {
    if (user) {
      return await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          return doc.data().introPage;
        });
    }
  };

  useEffect(() => {
    (async function () {
      // const valid = await validate(true);
      if (true) {
        const showIntroPage = await getIntroPageState();
        if (showIntroPage) {
          navigation.navigate(Routes.Introduction);
        } else {
          navigation.navigate(Routes.TabRoute);
        }
      } else {
        navigation.navigate(Routes.Subscription, { state: false });
      }
    })();
  }, []);

  return <LogoSpinner />;
};

export default Loading;
