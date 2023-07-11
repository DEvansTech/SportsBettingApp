import React, { useContext } from 'react';
import { Header, Left, Right } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { SvgXml } from 'react-native-svg';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Colors, Svgs } from '@Theme';
import styles, { scale } from './styles';
import { Routes } from '@Navigators/routes';

const MainHeader: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Header
      style={styles.header}
      iosBarStyle={'light-content'}
      androidStatusBarColor={Colors.black}>
      <Left style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() =>
            user
              ? navigation.dispatch(DrawerActions.openDrawer())
              : navigation.navigate(Routes.Splash)
          }>
          <SvgXml xml={Svgs.userIcon} width={45 * scale} height={45 * scale} />
        </TouchableOpacity>
      </Left>
      <Right style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.Feedback);
          }}>
          <SvgXml
            xml={Svgs.commentIcon}
            width={45 * scale}
            height={45 * scale}
          />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};

export default MainHeader;
