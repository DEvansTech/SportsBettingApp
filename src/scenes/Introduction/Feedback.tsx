import React from 'react';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Colors, Images, Svgs } from '@Theme';
import { CarosuelProps } from './types';
import styles, { scale } from './styles';

const Feedback: React.FC<CarosuelProps> = ({
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
          <Text style={styles.headerTitle}>Support</Text>
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
        <View style={styles.body}>
          <View style={styles.firstView}>
            <LoadingImage source={Images.carousel8} style={styles.imageView} />
          </View>
          <View style={styles.secondView}>
            <SvgXml
              xml={Svgs.commentBlackIcon}
              width={50 * scale}
              height={50 * scale}
              style={styles.mainIcon}
            />
            <Text style={styles.normalText}>
              We’re here for you if you have any questions or feedback. First,
              tap the <Text style={styles.blackBoldText}>ACCOUNT</Text> button
              in the bottom navigation, then tap the Feedback word balloon to
              send a message, comment, or request for help.
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Feedback;
