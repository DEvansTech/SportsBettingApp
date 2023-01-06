import { useEffect, useState, useContext } from 'react';
import { Alert, Platform, NativeModules } from 'react-native';
import {
  useIAP,
  validateReceiptIos,
  validateReceiptAndroid,
  clearTransactionIOS,
  getReceiptIOS
} from 'react-native-iap';
import functions from '@react-native-firebase/functions';
import { MainContext, MainContextType } from '@Context/MainContext';

const { RNIapModule } = NativeModules;

const itemSubs = Platform.select({
  default: ['oddsr_999_1m', 'oddsr_5999_1y'],
  android: ['oddsr_999_1m', 'oddsr_5999_1y']
});

// type ANDROID_PERIOD =
//   | string
//   | 'P3D'
//   | 'P7D'
//   | 'P1W'
//   | 'P4W2D'
//   | 'P1M'
//   | 'P3M'
//   | 'P1Y';

// type IOS_PERIOD_UNIT = '' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

// function iosConvertPeriodToDays(
//   periodCount: number,
//   periodUnit: IOS_PERIOD_UNIT
// ): number {
//   switch (periodUnit) {
//     case '':
//       return 0;
//     case 'DAY':
//       return periodCount;
//     case 'WEEK':
//       return 7 * periodCount;
//     case 'MONTH':
//       return 30 * periodCount;
//     case 'YEAR':
//       return 365 * periodCount;
//   }
// }

// function androidConvertPeriodToDays(period: ANDROID_PERIOD): number {
//   const unit = [365, 30, 7, 1];
//   return period
//     .split(/P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?/)
//     .slice(1, 5)
//     .map((p, i) => (!p ? 0 : Number(p.replace(/\D/g, '')) * unit[i]))
//     .reduce((a, b) => a + b, 0);
// }

const useInAppPurchase = () => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    finishTransaction,
    requestSubscription,
    getAvailablePurchases,
    currentPurchase,
    currentPurchaseError
  } = useIAP();

  const { setIsSubscribe } = useContext(MainContext) as MainContextType;
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
  const [isRequest, setIsRequest] = useState(true);
  const [currentProductId, setCurrentProductId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiresDate, setExpiresDate] = useState('');

  useEffect(() => {
    (async function () {
      if (connected) {
        if (Platform.OS === 'ios') {
          await clearTransactionIOS();
        }
        await getSubscriptions(itemSubs);
      }
    })();
  }, [connected, getSubscriptions]);

  useEffect(() => {
    (async function () {
      if (currentPurchase) {
        const receipt = currentPurchase.transactionReceipt;
        if (receipt) {
          // setCurrentProductId(currentPurchase.productId);
          // setIsFullAppPurchased(true);
          // setIsSubscribe(true);
          // setIsRequest(false);
          await validate();
          try {
            await finishTransaction(currentPurchase);
          } catch (ackErr) {
            console.log('ackError: ', ackErr);
          }
        }
      }
    })();
  }, [currentPurchase, finishTransaction]);

  useEffect(() => {
    if (currentPurchaseError) {
      if (
        currentPurchaseError.code === 'E_ALREADY_OWNED' &&
        !isFullAppPurchased
      ) {
        setIsFullAppPurchased(true);
        setIsSubscribe(true);
      }
    }
  }, [currentPurchaseError]);

  const purchaseApp = async (productId: string, offerToken?: string) => {
    if (!connected) {
      Alert.alert('Network Warning', 'Please check your internet connection');
    } else {
      if (Platform.OS === 'android' && !offerToken) {
        Alert.alert(
          'Error',
          `There are no subscription Offers for selected product (Only requiered for Google Play purchases): ${productId}`
        );
      }
      try {
        if (Platform.OS === 'ios') setIsRequest(true);
        await requestSubscription({
          sku: productId,
          ...(offerToken && {
            subscriptionOffers: [{ sku: productId, offerToken }]
          })
        });
      } catch (error) {
        setIsRequest(false);
      }
    }
  };

  // const getTrialPeriod = (subscription?: Subscription): number => {
  //   if (!subscription) {
  //     return 0;
  //   }
  //   const {
  //     introductoryPriceNumberOfPeriodsIOS: periodCountIOS,
  //     introductoryPriceSubscriptionPeriodIOS: periodUnitIOS
  //   } = subscription;
  //   switch (Platform.OS) {
  //     case 'ios':
  //       return iosConvertPeriodToDays(
  //         Number(periodCountIOS),
  //         periodUnitIOS as IOS_PERIOD_UNIT
  //       );
  //     default:
  //       return 0;
  //   }
  // };

  const validate = async (isFirst: boolean = false) => {
    if (Platform.OS === 'ios') {
      const lastPurchase = await getReceiptIOS(true);
      if (!lastPurchase) {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        return false;
      }
      const receiptBody = {
        'receipt-data': lastPurchase,
        password: 'c04d2c98cac24b87b18a9862e09dd26d'
      };
      const result: any = await validateReceiptIos({
        receiptBody,
        isTest: true
      });
      if (!result?.latest_receipt_info) {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        return false;
      }

      const renewalHistory = result?.latest_receipt_info.sort(
        (a: any, b: any) => b.expires_date_ms - a.expires_date_ms
      );

      const expiration = renewalHistory[0].expires_date_ms;

      let expired = new Date().getTime() > expiration;
      const productId = renewalHistory[0].product_id;

      if (!expired) {
        setIsSubscribe(true);
        setIsFullAppPurchased(true);
        setCurrentProductId(productId);
        setPurchaseDate(renewalHistory[0].purchase_date_ms);
        setExpiresDate(expiration);
        setIsRequest(false);
        return true;
      } else {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        if (isFirst)
          Alert.alert(
            'Purchase Expired',
            'Your subscription has expired, please resubscribe to continue.'
          );
        return false;
      }
    }
    if (Platform.OS === 'android') {
      // const availablePurchases: any = await getAvailablePurchases();

      const subscriptions = await RNIapModule.getAvailableItemsByType('subs');

      if (!subscriptions?.length) {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        return false;
      }

      const receipt = JSON.parse(
        subscriptions[subscriptions.length - 1]?.transactionReceipt
      );

      if (!receipt) {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        return false;
      }

      const { data: accessToken }: any = await functions().httpsCallable(
        'validate'
      )();

      try {
        const result: any = await validateReceiptAndroid(
          receipt.packageName,
          receipt.productId,
          receipt.purchaseToken,
          accessToken,
          true
        );

        let expired = new Date().getTime() > result?.expiryTimeMillis;

        if (!expired) {
          setIsSubscribe(true);
          setIsFullAppPurchased(true);
          setCurrentProductId(receipt.productId);
          setIsRequest(false);
          return true;
        } else {
          setIsSubscribe(false);
          setIsFullAppPurchased(false);
          setIsRequest(false);
          if (isFirst)
            Alert.alert(
              'Purchase Expired',
              'Your subscription has expired, please resubscribe to continue.'
            );
          return false;
        }
      } catch (error) {
        setIsSubscribe(false);
        setIsFullAppPurchased(false);
        setIsRequest(false);
        return false;
      }
    }
  };

  return {
    subscriptions,
    isFullAppPurchased,
    isRequest,
    currentProductId,
    expiresDate,
    purchaseDate,
    purchaseApp,
    validate
  };
};

export default useInAppPurchase;
