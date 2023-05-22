import React from 'react';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Svgs, Colors, Images } from '@Theme';
import { CarosuelProps } from './types';
import styles, { scale } from './styles';

const OverUnder: React.FC<CarosuelProps> = ({
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
          <Text style={styles.headerTitle}>LineMaster™</Text>
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
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            O/U <Text style={styles.subHeaderThinText}>(OVER/UNDER)</Text>
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.body}>
            <View style={styles.firstView}>
              <LoadingImage
                source={Images.carousel4}
                style={styles.imageView}
              />
            </View>
            <View style={styles.secondView}>
              <SvgXml
                xml={Svgs.lineRaterBlackIcon}
                width={60 * scale}
                height={60 * scale}
                style={styles.mainIcon}
              />
              <Text style={styles.normalText}>
                With <Text style={styles.blackBoldText}>O/U</Text> (over/ under)
                the individual team doesn’t matter. Tap +/- on Total, Over, or
                Under to get an instant OBI evaluation (green- yellow-red-deep
                red).
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default OverUnder;
