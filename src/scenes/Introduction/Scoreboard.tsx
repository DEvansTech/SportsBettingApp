import React from 'react';
import { Container, Content, Text, View, Header, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LoadingImage } from '@Components';
import { Colors, Images, Svgs } from '@Theme';
import styles, { scale } from './styles';
import { CarosuelProps } from './types';

const Scoreboard: React.FC<CarosuelProps> = ({
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
          <Text style={styles.headerTitle}>Scoreboard</Text>
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
            <LoadingImage source={Images.carousel7} style={styles.imageView1} />
          </View>
          <View style={styles.secondView}>
            <Text style={styles.normalText}>
              To see how our green “value” plays are doing, you’ll find{' '}
              <Text style={styles.blackBoldText}>SCOREBOARD</Text> (a coming
              attraction) under the{' '}
              <Text style={styles.blackBoldText}>“WATCHING”</Text> tab.
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.normalText}>
            Instead of just wins and losses, we use “Return On Investment” to
            account for differences in odds — favorites and longshots.
          </Text>
        </View>

        <View style={styles.obisaysView}>
          <SvgXml xml={Svgs.obiIcon} width={58 * scale} height={58 * scale} />
          <Text>.....</Text>
          <View style={styles.obisaysContent}>
            <Text style={styles.whiteBoldText}>
              OddsR™ uses closing sportsbook lines on the day of the game to
              make this ROI calculation. But you can also find green value plays
              on the days before to “lock in” a good price.
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Scoreboard;
