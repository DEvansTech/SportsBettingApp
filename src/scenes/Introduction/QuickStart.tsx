import React from 'react';
import { Container, Content, Text, View, Header, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Colors, Svgs } from '@Theme';
import styles, { scale } from './styles';
import { CarosuelProps } from './types';

const QuickStart: React.FC<CarosuelProps> = ({
  nextPage,
  prevPage,
  closePage
}) => {
  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.green}>
        <View style={styles.headerView}>
          <Text style={styles.headerSubTitle}>Instructions:</Text>
          <Text style={styles.headerTitle}>Quick Start</Text>
          <Icon
            type="AntDesign"
            name="closecircleo"
            onPress={closePage}
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
        <View style={styles.quickStartContent}>
          <Text style={styles.quickStartText}>
            With ODDS-R® BetIndexTM (OBI), it’s easy to make an informed bet!
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.barRatingView}>
            <SvgXml
              xml={Svgs.greenPillValue}
              width={100 * scale}
              height={25 * scale}
            />
            <View style={styles.barRatingTextView}>
              <Text style={styles.blackBolderText}>GREEN MEANS VALUE - </Text>
              <Text style={styles.normalText}>play with confidence!</Text>
            </View>
          </View>
          <View style={styles.barRatingView}>
            <SvgXml
              xml={Svgs.yellowPill}
              width={100 * scale}
              height={25 * scale}
            />
            <View style={styles.barRatingTextView}>
              <Text style={styles.blackBolderText}>YELLOW MEANS MAYBE - </Text>
              <Text style={styles.normalText}>proceed with caution.</Text>
            </View>
          </View>
          <View style={styles.barRatingView}>
            <SvgXml
              xml={Svgs.redPill}
              width={100 * scale}
              height={25 * scale}
            />
            <View style={styles.barRatingTextView}>
              <Text style={styles.blackBolderText}>RED MEANS No - </Text>
              <Text style={styles.normalText}>the danger zone.</Text>
            </View>
          </View>
          <View style={[styles.barRatingView, styles.barRatingDotView]}>
            <SvgXml
              xml={Svgs.yellowWhiteDotPill}
              width={100 * scale}
              height={25 * scale}
            />
            <View style={styles.barRatingTextView}>
              <Text style={[styles.normalText]}>
                A <Text style={styles.blackBolderText}>WHITE DOT</Text>{' '}
                indicates a {'\n'} slight preference on this line.
              </Text>
            </View>
          </View>
          <View>
            <SvgXml
              xml={Svgs.redWhiteDotPill}
              width={100 * scale}
              height={25 * scale}
            />
          </View>
        </View>
        <View style={styles.obisaysView}>
          <SvgXml xml={Svgs.obiIcon} width={58 * scale} height={58 * scale} />
          <Text>.....</Text>
          <View style={styles.obisaysContent}>
            <Text style={styles.whiteBoldText}>
              OBI says don’t overthink it! Go with GREEN and you’ll always be
              making a smart play, win or lose.
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default QuickStart;
