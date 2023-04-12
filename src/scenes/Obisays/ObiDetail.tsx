import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import HTMLView from 'react-native-htmlview';

import { LogoSpinner } from '@Components';
import { Colors } from '@Theme';
import { OBIDetailProps } from './types';
import styles, { HTMLStyle } from './styles';

const ObiDetail: React.FC<OBIDetailProps> = props => {
  const { obiData } = props?.route?.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.black}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>{obiData.title}</Text>
        </TouchableOpacity>
      </Header>
      {Object.keys(obiData).length > 0 ? (
        <Content contentContainerStyle={styles.contentView}>
          <View style={styles.descView}>
            <HTMLView value={obiData.fullText} stylesheet={HTMLStyle} />
          </View>
        </Content>
      ) : (
        <LogoSpinner />
      )}
    </Container>
  );
};

export default ObiDetail;
