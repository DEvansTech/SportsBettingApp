import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Purchases from 'react-native-purchases';
import { SvgXml } from 'react-native-svg';

import { ENTITLEMENT_ID } from '@Lib/constants';
import { Routes } from '@Navigators/routes';
import { Images, Svgs } from '@Theme';
import styles from './styles';

import { Props } from './types';

const Subscription: React.FC<Props> = props => {
  const { selectedItem } = props?.route?.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const [packages, setPackages] = useState<any[]>([]);
  const [selectPackage, setSelectPackage] = useState<any>(undefined);
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

  useEffect(() => {
    if (selectedItem && packages.length > 0) {
      const item = packages.filter(
        (pkg: any) => pkg?.product?.identifier === selectedItem
      )[0];
      setSelectPackage(item);
    }
  }, [selectedItem, packages]);

  const subscribeItem = async () => {
    setIsPurchasing(true);

    try {
      const { purchaserInfo }: any = await Purchases.purchasePackage(
        selectPackage
      );

      if (
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        navigation.navigate(Routes.Splash);
      }
    } catch (e) {
    } finally {
      setIsPurchasing(false);
      if (!selectedItem) {
        navigation.navigate(Routes.AppChecking);
      }
    }
  };

  const renderItem = (item: any) => {
    const {
      product: { title, description, price, identifier }
    } = item;

    return (
      <TouchableOpacity
        onPress={() => setSelectPackage(item)}
        style={[
          styles.renderItem,
          identifier === selectedItem && styles.selectedItem
        ]}
        disabled={identifier === selectedItem}>
        <View style={styles.renderItemHeader}>
          <View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
          </View>
          <View style={styles.itemPriceContent}>
            <Text style={styles.itemCurrency}>$</Text>
            <Text style={styles.itemPrice}>
              {price.toString().split('.')[0]}.
            </Text>
            <Text style={styles.itemCurrency}>
              {price.toString().split('.')[1]}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.renderItemBody,
            selectPackage?.product.identifier === identifier &&
              styles.selectedItem
          ]}>
          {identifier === 'oddsr_5999_1y_14d0' && (
            <>
              <Text
                style={[
                  styles.bestDealText,
                  selectPackage?.product.identifier === identifier &&
                    styles.selectedItemText
                ]}>
                OUR BEST DEAL: {'\n'} get{' '}
                <Text
                  style={[
                    [
                      styles.bestDealText,
                      selectPackage?.product.identifier === identifier &&
                        styles.selectedItemText
                    ],
                    styles.underline
                  ]}>
                  two months
                </Text>{' '}
                FREE!
              </Text>
            </>
          )}
          <Text
            style={[
              styles.dealText,
              selectPackage?.product.identifier === identifier &&
                styles.selectedItemText
            ]}>
            14-day free trial.
          </Text>
          {identifier !== 'oddsr_5999_1y_14d0' && (
            <Text
              style={[
                styles.dealText,
                selectPackage?.product?.identifier === identifier &&
                  styles.selectedItemText
              ]}>
              Cancel anytime.
            </Text>
          )}
          <SvgXml
            xml={
              selectPackage?.product?.identifier === identifier
                ? Svgs.subGreenCheckIcon
                : Svgs.subWhiteCheckIcon
            }
            style={styles.checkIcon}
          />
        </View>
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
        style={styles.backgroundImage}>
        <Content contentContainerStyle={styles.contentView}>
          {selectedItem && (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => navigation.goBack()}>
              <Image source={Images.closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          )}
          <Image source={Images.logo} style={styles.logo} />
          <Text style={styles.title}>Choose a plan</Text>
          <FlatList
            data={packages}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item: any) => item.identifier}
          />
          <Button
            full
            rounded
            style={
              selectPackage ? styles.subscribeSelectedBtn : styles.subscribeBtn
            }
            onPress={subscribeItem}
            disabled={!selectPackage}>
            <Text
              style={
                selectPackage ? styles.buttonWhiteText : styles.buttonBlackText
              }>
              Subscribe
            </Text>
          </Button>
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Subscription;
