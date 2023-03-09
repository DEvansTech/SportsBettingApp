import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { Container, Content, Text, View, Header, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Colors, Images, Svgs } from '@Theme';
import styles, { scale } from './styles';
import { Routes } from '@Navigators/routes';
import { CarosuelProps } from './types';

const FirstScreen: React.FC<CarosuelProps> = ({ nextPage, prevPage }) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  return (
    <Container style={styles.background}>
      <Header style={styles.header} androidStatusBarColor={Colors.green}>
        <View style={styles.headerView}>
          <Text style={styles.headerSubTitle}>Instructions:</Text>
          <Text style={styles.headerTitle}>Schedule</Text>
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
          <View style={styles.titleView}>
            <Text style={styles.topRankedText}>TOP RANKED</Text>
            <Text style={styles.normalText}> shows games/events where</Text>
          </View>
          <Text style={styles.normalText}>
            the
            <Text style={styles.blackBoldText}> ODDS-R Bet Index®</Text>(OBI)
            sees a <Text style={styles.greenBoldText}>VALUE</Text> (GREEN) Play.
          </Text>
          <View style={styles.body}>
            <View style={styles.firstView}>
              <LoadingImage
                source={Images.carousel1}
                style={styles.imageView}
              />
            </View>
            <View style={styles.secondView}>
              <SvgXml
                xml={Svgs.calendarIcon}
                width={50 * scale}
                height={50 * scale}
                style={styles.mainIcon}
              />
              <View style={styles.titleView}>
                <Text style={styles.normalText}>Tap </Text>
                <Text style={styles.allText}> ALL </Text>
                <Text style={styles.normalText}> to see </Text>
              </View>
              <Text style={styles.normalText}>the games today.</Text>
              <Text style={[styles.normalText, styles.mt20]}>
                Possibilities are{' '}
                <Text style={styles.blackBoldText}>SPREAD</Text> (+/- points),
                WIN (+ means bet 100 units to win displayed amount; - means bet
                this amount to win 100 units), and{' '}
                <Text style={styles.blackBoldText}>OVER/ UNDER</Text> (left side
                means final total will be over the indicated number; right side
                means final total will be under the indicated number).
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default FirstScreen;
