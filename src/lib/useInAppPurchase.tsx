import { useEffect, useState, useContext } from 'react';
import { Alert, Platform, NativeModules } from 'react-native';
import {
  useIAP,
  validateReceiptAndroid,
  clearTransactionIOS,
  getReceiptIOS
} from 'react-native-iap';
import axios from 'axios';
import functions from '@react-native-firebase/functions';
import { MainContext, MainContextType } from '@Context/MainContext';

const { RNIapModule } = NativeModules;

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
  const [purchaseDate, setPurchaseDate] = useState<number>();
  const [expiresDate, setExpiresDate] = useState<number>();

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
            // setIsRequest(false);
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
      if (!result) {
        setIsSubscribe(false);
        setIsRequest(false);
        return false;
      }

      const expiresTime = new Date(result.expiresDate).getTime();
      const purchaseTime = new Date(result.purchaseDate).getTime();

      let expired = new Date().getTime() > expiresTime;
      const { productId } = result;

      if (!expired) {
        setIsSubscribe(true);
        // setIsRequest(false);

        setCurrentProductId(productId);
        setPurchaseDate(purchaseTime);
        setExpiresDate(expiresTime);
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

  async function getHistoryData(transactionReceipt: string) {
    try {
      const result = await axios.post(
        'https://pss-appstore.azurewebsites.net/AppleReceipt/getHistoryData',
        {
          receiptString: transactionReceipt,
          isTest: true
        }
      );
      if (result.data?.latestReceiptInfo) {
        return result.data?.latestReceiptInfo[0];
      }
      return null;
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
    setIsRequest,
    purchaseApp,
    validate
  };
};

export default useInAppPurchase;
