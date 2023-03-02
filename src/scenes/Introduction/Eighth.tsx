import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Colors, Images, Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';
import { CarosuelProps } from './types';
import styles, { scale } from './styles';

const EighthScreen: React.FC<CarosuelProps> = ({ nextPage, prevPage }) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <Container style={styles.background}>
      <Header style={styles.header} androidStatusBarColor={Colors.green}>
        <Text style={styles.headerSubTitle}>Instructions:</Text>
        <Text style={styles.headerTitle}>Feedback</Text>
        <Icon
          type="AntDesign"
          name="closecircleo"
          onPress={() => navigation.navigate(Routes.TabRoute)}
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
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.content}>
          <View style={styles.body}>
            <View style={styles.firstView}>
              <LoadingImage
                source={Images.carousel8}
                style={styles.imageView}
              />
            </View>
            <View style={styles.secondView}>
              <SvgXml
                xml={Svgs.commentBlackIcon}
                width={50 * scale}
                height={50 * scale}
                style={styles.mainIcon}
              />
              <Text style={styles.normalText}>
                Feedback is good! OBI want to hear from you! Tap the upper right
                hand talk bubble to send a message, comment or request for help.
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default EighthScreen;
