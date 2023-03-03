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

const SixthScreen: React.FC<CarosuelProps> = ({ nextPage, prevPage }) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  return (
    <Container style={styles.background}>
      <Header style={styles.header} androidStatusBarColor={Colors.green}>
        <View style={styles.headerView}>
          <Text style={styles.headerSubTitle}>Instructions:</Text>
          <Text style={styles.headerTitle}>Watching</Text>
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
        </View>
      </Header>
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.content}>
          <View style={styles.body}>
            <View style={styles.firstView}>
              <LoadingImage
                source={Images.carousel6}
                style={styles.imageView}
              />
            </View>
            <View style={styles.secondView}>
              <SvgXml
                xml={Svgs.watchIcon}
                width={60 * scale}
                height={60 * scale}
                style={styles.mainIcon}
              />
              <Text style={styles.normalText}>
                Watching shows in one convenient place all games involving your
                favorite teams and other games you’ve marked to keep an eye on.
              </Text>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default SixthScreen;
