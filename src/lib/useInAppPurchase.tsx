import { useEffect, useState, useContext } from 'react';
import { Alert, Platform, NativeModules } from 'react-native';
import {
  useIAP,
  validateReceiptIos,
  validateReceiptAndroid,
  clearTransactionIOS,
  getReceiptIOS
} from 'react-native-iap';
import axios from 'axios';
import functions from '@react-native-firebase/functions';
import { MainContext, MainContextType } from '@Context/MainContext';

const { RNIapIos, RNIapModule } = NativeModules;

const itemSubs = Platform.select({
  default: ['oddsr_999_1m', 'oddsr_5999_1y'],
  android: ['oddsr_999_1m', 'oddsr_5999_1y']
});

const useInAppPurchase = () => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    finishTransaction,
    requestSubscription,
    currentPurchase
  } = useIAP();

  const { setIsSubscribe } = useContext(MainContext) as MainContextType;

  const [isRequest, setIsRequest] = useState(false);
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
  }, [connected]);

  useEffect(() => {
    (async function () {
      try {
        if (currentPurchase) {
          const receipt = currentPurchase?.transactionReceipt;
          if (receipt) {
            await finishTransaction(currentPurchase, true);
            setIsSubscribe(true);
            setIsRequest(false);
            setCurrentProductId(currentPurchase?.productId);
          }
        }
      } catch (ackErr) {
        console.log('ackError: ', ackErr);
      }
    })();
  }, [currentPurchase, finishTransaction]);

  const purchaseApp = async (
    productId: string,
    offerToken?: string | undefined
  ) => {
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
        if (Platform.OS === 'ios') {
          await clearTransactionIOS();
        }
        setIsRequest(true);
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

  const validate = async (isFirst: boolean = false) => {
    if (Platform.OS === 'ios') {
      const lastPurchase: any = await getReceiptIOS(true);

      if (!lastPurchase) {
        setIsSubscribe(false);
        setIsRequest(false);
        return false;
      }

      const result: any = await getHistoryData(lastPurchase);

      if (!result?.data?.latest_receipt_info) {
        setIsSubscribe(false);
        setIsRequest(false);
        return false;
      }

      const renewalHistory = result.data?.latest_receipt_info.sort(
        (a: any, b: any) => b.expires_date_ms - a.expires_date_ms
      );

      const expiration = renewalHistory[0].expires_date_ms;

      let expired = new Date().getTime() > expiration;
      const productId = renewalHistory[0].product_id;

      if (!expired) {
        setIsSubscribe(true);
        setIsRequest(false);

        setCurrentProductId(productId);
        setPurchaseDate(renewalHistory[0].purchase_date_ms);
        setExpiresDate(expiration);
        return true;
      } else {
        setIsSubscribe(false);
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

      const histories = await RNIapModule.getAvailableItemsByType('subs');

      if (!histories?.length) {
        setIsSubscribe(false);
        setIsRequest(false);
        return false;
      }

      const receipt = JSON.parse(
        histories[histories.length - 1]?.transactionReceipt
      );

      if (!receipt) {
        setIsSubscribe(false);
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
          setCurrentProductId(receipt.productId);
          setIsRequest(false);
          return true;
        } else {
          setIsSubscribe(false);
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
        setIsRequest(false);
        return false;
      }
    }
  };

  function getLatestPurchase() {
    return RNIapIos.getAvailableItems().then((purchases: any) => {
      return (
        purchases.sort(
          (a: any, b: any) =>
            Number(b.transactionDate) - Number(a.transactionDate)
        )?.[0] || null
      );
    });
  }

  async function getHistoryData(transactionReceipt: string) {
    const data = JSON.stringify({
      'receipt-data': transactionReceipt,
      password: 'c04d2c98cac24b87b18a9862e09dd26d'
    });

    const isTest = true;

    const url = isTest
      ? 'https://sandbox.itunes.apple.com/verifyReceipt'
      : 'https://buy.itunes.apple.com/verifyReceipt';

    try {
      const result: any = await axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      });
      return result.data;
    } catch {
      return null;
    }
  }

  return {
    subscriptions,
    isRequest,
    currentProductId,
    expiresDate,
    purchaseDate,
    purchaseApp,
    validate
  };
};

export default useInAppPurchase;
