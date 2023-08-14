import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import RenderHtml from 'react-native-render-html';
import { SvgXml } from 'react-native-svg';

import { Loading } from '@Components';
import { Colors, Svgs } from '@Theme';
import { OBIDetailProps } from './types';
import styles, { scale, deviceWidth } from './styles';

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
            {/* <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
                lineHeight: 28
              }}>
              Playing smart is easier if the hard work has been put in, Roi
              says. Green is Good and that means{' '}
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/green-value.png'
                }}
                style={{ height: 20, width: 80 }}
              />
              . But Roi understands that sometimes we all just want an opinion,
              even if it's not a very strong one. So when a bet isn't a{' '}
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/green-value.png'
                }}
                style={{ height: 20, width: 80 }}
              />{' '}
              play, OddsR™ shows{' '}
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/yellow-dot.png'
                }}
                style={{ height: 20, width: 80 }}
              />{' '}
              or{' '}
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/red-dot.png'
                }}
                style={{ height: 20, width: 80 }}
              />{' '}
              to indicate a mild preference, slight as it may be. Like a traffic
              intersection, Roi warns, proceed on yellow (danger) or red (please
              no) at your own risk.{' '}
            </Text>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
                }}
                style={{ height: 10, width: 10 }}
              />
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
                }}
                style={{ height: 10, width: 10 }}
              />
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/roidot.png'
                }}
                style={{ height: 10, width: 10 }}
              />
              <Image
                source={{
                  uri: 'https://oddsr-cdn-haeggkezhpf2h0g2.z01.azurefd.net/storage/images/RoiSays.png'
                }}
                style={{ height: 120, width: 110, marginTop: 10 }}
              />
            </View> */}
            <RenderHtml
              contentWidth={deviceWidth}
              source={{
                html: obiData.fullText.trim()
              }}
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
