import React, { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import appsFlyer from 'react-native-appsflyer';
import { Iterable, IterableConfig } from '@iterable/react-native-sdk';

import { Loading } from '@Components';
import { ENTITLEMENT_ID } from '@Lib/constants';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';
import {
  API_APPLE_KEY,
  API_GOOGLE_KEY,
  APPSFLYER_DEV_KEY,
  APPSFLYER_APP_ID,
  ITERABLE_API_KEY
} from '@env';

const initOptions = {
  devKey: APPSFLYER_DEV_KEY,
  isDebug: false,
  appId: APPSFLYER_APP_ID,
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: true
};

const AppChecking: React.FC = () => {
  if (Platform.OS == 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }

  appsFlyer.onInstallConversionData(res => {
    console.log('OnInstallConversionData: ', res);
    if (JSON.parse(res.data.is_first_launch) === true) {
      if (res.data.af_status === 'Non-organic') {
        console.log('This is first launch and a Non-Organic install');
      } else if ((res.data.af_status = 'Organic')) {
        console.log('This is launch and a Organic Install');
      }
    } else {
      console.log('This is not first launch');
    }
  });
  appsFlyer.initSdk(
    initOptions,
    result => {
      console.log('AppsFlyer Initialize result: ', result);
    },
    error => {
      console.error('AppsFlyer Initialize result: ', error);
    }
  );

  const { user } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
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
        Purchases.collectDeviceIdentifiers();
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            Purchases.setAppsflyerID(user.uid);
            console.log(
              'Can not get AppsFlyer UID. Customer User ID: ',
              user.uid
            );
          } else {
            Purchases.setAppsflyerID(uid);
            console.log('AppsFlyerID for RevenueCat: ', uid);
          }
        });
        Purchases.setAttributes({
          Name: user.firstName + ' ' + user.lastName,
          Email: user.email
        });

        const config = new IterableConfig();
        config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.
        console.log(
          'Iterable Initialization Information: ',
          ITERABLE_API_KEY,
          user.email,
          user.uid
        );
        Iterable.initialize(ITERABLE_API_KEY, config);
        Iterable.setEmail(user.email);
        Iterable.setUserId(user.uid);
        Iterable.getEmail().then(email => {
          Purchases.setAttributes({'$email': email || null});
        });

        Iterable.getUserId().then(userId => {
          Purchases.setAttributes({"$iterableUserId": userId || null});
        });

        // Purchases.setAttributes({'$iterableCampaignId': '1', '$iterableTemplateId': '1'});

        // navigation.navigate(Routes.TabRoute);

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
