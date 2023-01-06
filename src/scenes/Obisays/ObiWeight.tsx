import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Svgs, Colors } from '@Theme';

import styles, { scale, deviceWidth } from './styles';

const ObiWeight: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  return (
    <Container style={styles.background}>
      <Header style={styles.header} androidStatusBarColor={Colors.black}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>OBI Weighs In</Text>
        </TouchableOpacity>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.descView}>
          <Text style={styles.descDefaultText}>
            When OBI “green lights” a play, it means the odds being offered make
            financial sense based on a proprietary analysis of past performance
            and present conditions. OBI says there are two ways to think about
            that—stick to the green-light plays, and (or) consider weighting
            them because there are, by definition, fewer of them. Weighting your
            action by betting a bit more on smarter “green” plays, and reducing
            or eliminating bets on “yellow/red” plays—all within your normal
            betting budget, please—can make your entertainment dollar go a lot
            further
          </Text>
          <View style={styles.commentBox}>
            <SvgXml
              xml={Svgs.obiSayBlackIcon}
              width={70 * scale}
              height={70 * scale}
            />
            <View style={styles.obiComment}>
              <SvgXml
                xml={Svgs.messageBox}
                width={deviceWidth - 100 * scale}
                height={110 * scale}
              />
              <View style={styles.messageBox}>
                <Text style={styles.commentBoldText1}>
                  When in doubt, go green. Red or yellow bets might win, but
                  their payout isn’t worth the risk over time.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ObiWeight;
