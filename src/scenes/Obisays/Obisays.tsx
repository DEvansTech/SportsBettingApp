import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Container, Content, Text, View, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainHeader } from '@Components';
import { Images } from '@Theme';
import { Routes } from '@Navigators/routes';

import styles from './styles';

const Obisays: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  return (
    <Container style={styles.background}>
      <MainHeader />
      <View style={styles.header}>
        <Text style={styles.headerText}>OBI Says</Text>
      </View>
      <Content contentContainerStyle={styles.contentView}>
        <TouchableOpacity
          style={styles.obisayList}
          onPress={() => navigation.navigate(Routes.OBIMoney)}>
          <Text style={styles.listTitleText}>OBI Means "Smart Money"</Text>
          <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={styles.rightArrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.obisayList}
          onPress={() => navigation.navigate(Routes.OBIBooks)}>
          <Text style={styles.listTitleText}>OBI Reads Books!</Text>
          <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={styles.rightArrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.obisayList}
          onPress={() => navigation.navigate(Routes.OBILineRater)}>
          <Text style={styles.listTitleText}>OBI LineMaster™</Text>
          <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={styles.rightArrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.obisayList}
          onPress={() => navigation.navigate(Routes.OBIWeight)}>
          <Text style={styles.listTitleText}>OBI Weighs In</Text>
          <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={styles.rightArrowIcon}
          />
        </TouchableOpacity>
        <Image source={Images.WordBalloon} style={styles.wordballon} />
        <Image source={Images.ObiLogo} style={styles.obiLogo} />
      </Content>
    </Container>
  );
};

export default Obisays;
