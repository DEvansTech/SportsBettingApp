import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { SvgXml } from 'react-native-svg';

import { Loading } from '@Components';
import { Colors, Svgs } from '@Theme';
import { OBIDetailProps } from './types';
import styles, { HTMLStyle, scale } from './styles';

const ObiDetail: React.FC<OBIDetailProps> = props => {
  const { obiData } = props?.route?.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.green}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>ROI Says</Text>
        </TouchableOpacity>
        <SvgXml
          xml={Svgs.obiWhiteIcon}
          width={38 * scale}
          height={38 * scale}
        />
      </Header>
      <View style={styles.detailHeader}>
        <View style={styles.detailListNumber}>
          <Text style={styles.detailListNumberText}>{obiData.order}</Text>
        </View>
        <Text style={styles.detailTitle}>{obiData?.title}</Text>
      </View>
      {Object.keys(obiData).length > 0 ? (
        <Content contentContainerStyle={styles.contentView}>
          <View style={styles.descView}>
            <HTMLView value={obiData.fullText.trim()} stylesheet={HTMLStyle} />
          </View>
        </Content>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ObiDetail;
