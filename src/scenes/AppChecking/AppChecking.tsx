import React, { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import appsFlyer from 'react-native-appsflyer';

import { Loading } from '@Components';
import { ENTITLEMENT_ID } from '@Lib/constants';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';
import {
  API_APPLE_KEY,
  API_GOOGLE_KEY,
  APPSFLYER_DEV_KEY,
  APPSFLYER_APP_ID
} from '@env';

const initOptions = {
  devKey: APPSFLYER_DEV_KEY,
  isDebug: true,
  appId: APPSFLYER_APP_ID,
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: false
};

const AppChecking: React.FC = () => {
  if (Platform.OS == 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  appsFlyer.initSdk(
    initOptions,
    result => {
      console.log(result);
    },
    error => {
      console.error(error);
    }
  );

  const { user } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    //   await AsyncStorage.setItem('@loggedUser', 'true');
    //   await appsFlyer.setCustomerUserId(user.uid, res => {
    //     console.log(res);
    //   });
    //   navigation.navigate(Routes.TabRoute);
    if (isFocused) {
      (async function () {
        await AsyncStorage.setItem('@loggedUser', 'true');
        await appsFlyer.setCustomerUserId(user.uid, res => {
          console.log(res);
        });

        let API_KEY = API_APPLE_KEY;
        if (Platform.OS === 'android') {
          API_KEY = API_GOOGLE_KEY;
        }

        await Purchases.configure({
          apiKey: API_KEY,
          appUserID: user.uid,
          useAmazon: false
        });

        try {
          const customerInfo = await Purchases.getCustomerInfo();

          if (
            typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !==
            'undefined'
          ) {
            const activeData: any =
              customerInfo.entitlements.active[ENTITLEMENT_ID];

            let expired =
              new Date().getTime() > activeData?.expirationDateMillis;

            if (!expired) {
              navigation.navigate(Routes.TabRoute);
            } else {
              navigation.navigate(Routes.Subscription);
            }
          } else {
            navigation.navigate(Routes.Subscription);
          }
        } catch (e) {}
      })();
    }
  }, [isFocused]);

  return <Loading />;
};

export default AppChecking;
