import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Loading } from '@Components';
import { Colors, Svgs } from '@Theme';
import { OBIDetailProps } from './types';
import styles, { scale } from './styles';

const ObiDetail: React.FC<OBIDetailProps> = props => {
  const { obiData } = props?.route?.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const renderOBI = (obi: any) => {
    switch (obi.type) {
      case 'text':
        return <Text style={[styles.textStyle, obi.style]}>{obi.value}</Text>;
      case 'image':
        return (
          <Image
            source={{ uri: obi.uri.replace(/\s/g, '') }}
            style={[obi.style]}
          />
        );
      default:
        return;
    }
  };

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
          <Text style={styles.headerText}>Roi Says</Text>
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
            <Text>
              {obiData?.fullText?.length > 0 &&
                obiData.fullText.map((obi: any) => renderOBI(obi))}
            </Text>
          </View>
          <View style={styles.footerView}>
            <Image
              source={{
                uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
              }}
              style={styles.dotImg}
            />
            <Image
              source={{
                uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
              }}
              style={styles.dotImg}
            />
            <Image
              source={{
                uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
              }}
              style={styles.dotImg}
            />
            <Image
              source={{
                uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/RoiSays.png'
              }}
              style={styles.roisayImg}
            />
          </View>
        </Content>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ObiDetail;
