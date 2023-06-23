import React, { useEffect, useState } from 'react';
import { ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Purchases from 'react-native-purchases';

import { ENTITLEMENT_ID } from '@Lib/constants';
import { Images } from '@Theme';
import styles from './styles';
import { Button } from '@Components';
import { Routes } from '@Navigators/routes';

const Subscription: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const [packages, setPackages] = useState<any[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {}
    })();
  }, []);

  const onSelection = async (purchasePackage: any) => {
    setIsPurchasing(true);

    try {
      const { purchaserInfo }: any = await Purchases.purchasePackage(
        purchasePackage
      );

      if (
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        navigation.navigate(Routes.Splash);
      }
    } catch (e) {
    } finally {
      setIsPurchasing(false);
      navigation.navigate(Routes.AppChecking);
    }
  };

  const renderItem = (item: any) => {
    console.log(item);
    const {
      product: { title, description, priceString }
    } = item;
    return (
      <TouchableOpacity
        onPress={() => onSelection(item)}
        style={styles.renderItem}>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
        <Text style={styles.itemTitle}>{priceString}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.background}>
      <Spinner
        visible={isPurchasing}
        textContent={'Please wait...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ImageBackground
        source={Images.background1}
        resizeMode="stretch"
        imageStyle={{ opacity: 0.7 }}
        style={styles.backgroundImage}>
        <Text style={styles.title}>ODDS-R Subscriptions</Text>
        <Content contentContainerStyle={styles.contentView}>
          <FlatList
            data={packages}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item: any) => item.identifier}
          />
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Subscription;
