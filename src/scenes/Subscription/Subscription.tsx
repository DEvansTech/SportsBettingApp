import React, { useEffect, useState, useContext } from 'react';
import { ImageBackground, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Button } from 'native-base';
import {} from 'react-native-iap';
import Spinner from 'react-native-loading-spinner-overlay';
import useInAppPurchase from '@Lib/useInAppPurchase';
import { Routes } from '@Navigators/routes';
import { UserHeader } from '@Components';
import { MainContext, MainContextType } from '@Context/MainContext';

import { Images } from '@Theme';
import styles from './styles';
import { Props } from './types';

const SubscriptionScene: React.FC<Props> = props => {
  const { state } = props?.route?.params;
  const { subscriptions, isRequest, currentProductId, purchaseApp, validate } =
    useInAppPurchase();

  const { isSubscribe } = useContext(MainContext) as MainContextType;

  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [loadingBar, setLoadingBar] = useState(true);

  const handleSubscription = async (productId: string, offerToken?: string) => {
    await purchaseApp(productId, offerToken);
  };

  useEffect(() => {
    if (isSubscribe && !state) {
      navigation.navigate(Routes.Dashboard);
    }
  }, [isSubscribe]);

  useEffect(() => {
    setLoadingBar(isRequest);
  }, [isRequest]);

  useEffect(() => {
    (async function () {
      await validate();
    })();
  }, []);

  const renderItem = (item: any, index: number) => (
    <View
      style={[
        styles.renderItem,
        item.productId === currentProductId && styles.selectedItem
      ]}
      key={index}>
      <Image source={Images.logo} style={styles.itemLogo} />
      <Text style={styles.itemTitle}>
        {item.productId === 'oddsr_5999_1y'
          ? 'All Access (1 Year)'
          : 'All Access (1 Month)'}
      </Text>
      <Text style={styles.itemPeriod}>7 DAY FREE TRIAL. Cancel Anytime.</Text>
      {Platform.OS === 'android' && item?.subscriptionOfferDetails?.length > 0 && (
        <Button
          full
          rounded
          light
          onPress={() =>
            handleSubscription(
              item.productId,
              item?.subscriptionOfferDetails[
                item?.subscriptionOfferDetails.length - 1
              ].offerToken
            )
          }
          style={styles.subscriptionBtn}
          key={index}>
          <Text style={styles.subscriptionBtnText}>
            {`${item?.subscriptionOfferDetails[
              item?.subscriptionOfferDetails.length - 1
            ].pricingPhases.pricingPhaseList?.map(
              (ppl: any) => ppl.formattedPrice
            )}`}
          </Text>
        </Button>
      )}

      {Platform.OS === 'ios' && (
        <Button
          full
          rounded
          light
          onPress={() => handleSubscription(item.productId)}
          disabled={item.productId === currentProductId}
          style={styles.subscriptionBtn}>
          <Text style={styles.subscriptionBtnText}>{item?.localizedPrice}</Text>
        </Button>
      )}
    </View>
  );

  return (
    <Container style={styles.background}>
      {isSubscribe && (
        <UserHeader
          type="icon"
          iconType="MaterialCommunityIcons"
          iconName="currency-usd-circle-outline"
          name="ODDS-R Subscriptions"
          to={Routes.Dashboard}
        />
      )}
      <Spinner
        visible={loadingBar}
        textContent={'Please wait...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ImageBackground
        source={Images.background1}
        resizeMode="stretch"
        imageStyle={{ opacity: 0.7 }}
        style={styles.backgroundImage}>
        {!isSubscribe && <Text style={styles.title}>ODDS-R Subscriptions</Text>}
        <Content contentContainerStyle={styles.contentView}>
          {subscriptions.length > 0 &&
            subscriptions.map((item, index) => renderItem(item, index))}
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default SubscriptionScene;
