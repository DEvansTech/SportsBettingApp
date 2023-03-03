import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Colors, Images, Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';
import { CarosuelProps } from './types';
import styles, { scale } from './styles';

const SeventhScreen: React.FC<CarosuelProps> = ({ nextPage, prevPage }) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <Container style={styles.background}>
      <Header style={styles.header} androidStatusBarColor={Colors.green}>
        <View style={styles.headerView}>
          <Text style={styles.headerSubTitle}>Instructions:</Text>
          <Text style={styles.headerTitle}>Parthners</Text>
          <Icon
            type="AntDesign"
            name="closecircleo"
            onPress={() => navigation.navigate(Routes.TabRoute)}
            style={styles.closeIcon}
          />
          <View style={styles.controlBar}>
            <Icon
              type="Entypo"
              name="chevron-thin-left"
              onPress={prevPage}
              style={styles.controlIcon}
            />
            <Icon
              type="Entypo"
              name="chevron-thin-right"
              onPress={nextPage}
              style={styles.controlIcon}
            />
          </View>
        </View>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.content}>
          <View style={styles.body}>
            <View style={styles.firstView}>
              <LoadingImage
                source={Images.carousel7}
                style={styles.imageView}
              />
            </View>
            <View style={styles.secondView}>
              <SvgXml
                xml={Svgs.partnerIcon}
                width={60 * scale}
                height={60 * scale}
                style={styles.mainIcon}
              />
              <Text style={styles.normalText}>
                Partners gives you the opportunity to select a betting partner
                where you can establish a betting account, if you choose to
                (optional). Other featured partners and deals will be included
                here too. To be introduced soon!
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default SeventhScreen;
