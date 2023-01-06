import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Svgs, Colors } from '@Theme';

import styles, { scale, deviceWidth } from './styles';

const ObiMoney: React.FC = () => {
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
          <Text style={styles.headerText}>OBI Reads Books!</Text>
        </TouchableOpacity>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.descView}>
          <Text style={styles.descDefaultText}>
            After combing over millions of data points,{' '}
            <Text style={styles.descBoldText}>OBI knows sports betting</Text>.
            Good bet or bad bet? The odds make the difference. Favorites win 65%
            of games, but the price is high and the bottom line for you over
            time is bad. (Bet only favorites and you have to be right much more
            often than you’re wrong in order to make a profit.) But that also
            means there can be a sweet spot on the other side of the equation:
            less frequent wins but at much better odds.
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
                width={(deviceWidth - 110) * scale}
                height={120 * scale}
              />
              <View style={styles.messageBox}>
                <Text style={styles.commentBoldText}>
                  Stick to OBI's green-light plays and your bets become smart
                  money.
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.descDefaultText}>
            OBI points you to odds/plays where OBI thinks the math, using
            artificial intelligence to analyze past performance and current
            conditions, is in your favor.{' '}
            <Text style={styles.descBoldText}>
              Stick to OBI’s “green-light” (good value) plays
            </Text>{' '}
            and your bets—whatever size, on highlighted favorites and underdogs
            alike—become “smart money.” You’ll have a better shot at a return on
            investment and you’ll stay in the game, against all odds.
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default ObiMoney;
