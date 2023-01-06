import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Svgs, Colors } from '@Theme';

import styles, { scale, deviceWidth } from './styles';

const ObiLineRater: React.FC = () => {
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
          <Text style={styles.headerText}>OBI LineMaster™</Text>
        </TouchableOpacity>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.descView}>
          <Text style={styles.descDefaultText}>
            Seeing odds on a player/team/game that are moving around, or vary
            depending on the bookmaker? Call on OBI’s LineMaster to find out
            whether what you’re being offered is a “green-light” play, or what
            odds you need to find in order to make it so. Shopping around, or
            just waiting for the right moment if the line is moving in your
            direction but not yet green, can pay off over time. OBI’s LineMaster
            can help make your every move a mathematically sound green-light
            play.
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
                  OBI’s LineMaster can help make every move a sound green-light
                  play.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ObiLineRater;
