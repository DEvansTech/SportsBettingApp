import React, { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';

import { Loading } from '@Components';
import { ENTITLEMENT_ID, API_APPLE_KEY, API_GOOGLE_KEY } from '@Lib/constants';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';

const AppChecking: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.navigate(Routes.TabRoute);
    // if (isFocused) {
    //   (async function () {
    //     await AsyncStorage.setItem('@loggedUser', 'true');
    //     let API_KEY = API_APPLE_KEY;
    //     if (Platform.OS === 'android') {
    //       API_KEY = API_GOOGLE_KEY;
    //     }
    //     await Purchases.configure({
    //       apiKey: API_KEY,
    //       appUserID: user.uid,
    //       useAmazon: false
    //     });

    //     try {
    //       const customerInfo = await Purchases.getCustomerInfo();
    //       if (
    //         typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !==
    //         'undefined'
    //       ) {
    //         const activeData: any =
    //           customerInfo.entitlements.active[ENTITLEMENT_ID];
    //         let expired =
    //           new Date().getTime() > activeData?.expirationDateMillis;

    //         if (!expired) {
    //           navigation.navigate(Routes.TabRoute);
    //         } else {
    //           navigation.navigate(Routes.Subscription, { selectItem: '' });
    //         }
    //       } else {
    //         navigation.navigate(Routes.Subscription, { selectItem: '' });
    //       }
    //     } catch (e) {}
    //   })();
    // }
  }, [isFocused]);

  return <Loading />;
};

export default AppChecking;
