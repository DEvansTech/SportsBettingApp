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
          <Text style={styles.headerText}>OBI Means "Smart Money"</Text>
        </TouchableOpacity>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.descView}>
          <Text style={styles.descDefaultText}>
            The bookmaker you play with wants to “balance” betting on both sides
            of an event as much as possible because the difference between
            dollars in (total bets) and dollars out (payouts) is how it makes
            its profit.{' '}
            <Text style={styles.descBoldText}>
              Your money is matched up against cash on the opposite side of an
              opinion
            </Text>
            —which player or team is going to win, by how much, and so on. Like
            the stock market, banking and tollbooths, being a transaction agent
            on a highway has proven to be a very good business for bet-takers
            over time. The book will move the line—the price you’re being
            offered— if its action on a game gets too unbalanced, offering a
            better deal to encourage more play on one side or the other. The
            “strike price” of your bet—the odds you agree to take—is everything.{' '}
            <Text style={styles.descBoldText}>
              OBI reads the lines in a book
            </Text>{' '}
            and tells you which ones make the most sense (cents).
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
                  The line moves to encourage equal, balanced betting on both
                  sides of a line.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ObiMoney;
