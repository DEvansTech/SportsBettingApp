import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { TouchableOpacity, Linking, Platform } from 'react-native';
import { Icon, View } from 'native-base';
import { DrawerActions } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import LogoSidebar from './LogoSidebar';
import { Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';
import styles, { scale } from './styles';
import FeedbackSidebar from './FeedbackSidebar';

const getActiveRouteState = (
  routes: any,
  index: number,
  actualRouteName: string
) =>
  routes[index].name.toLowerCase().indexOf(actualRouteName.toLowerCase()) >= 0;

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
  ...rest
}) => {
  const { logout, user, setUser } = useContext(AuthContext) as AuthContextType;
  const { setIsSubscribe } = useContext(MainContext) as MainContextType;
  const itemBaseStyle = {
    labelStyle: styles.label,
    style: styles.itemContainer
  };

  const logOut = () => {
    if (user) {
      logout();
      setUser(null);
      setIsSubscribe(false);
    }
    setTimeout(() => {
      navigation.navigate(Routes.Splash);
    }, 1000);
  };

  const handlePrivacy = () => {
    Linking.openURL('https://oddsr.com/terms.html');
  };

  const handleTerms = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
      );
    } else {
      Linking.openURL('https://play.google.com/about/play-terms/');
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.sidebarContent}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Icon type="AntDesign" name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <LogoSidebar />
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="My info"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarAccountIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.MyAccount
          )}
          onPress={() => navigation.navigate(Routes.MyAccount)}
        />
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="How to use"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarHowIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.HowToUse
          )}
          onPress={() => navigation.navigate(Routes.Introduction)}
        />
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Logout"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarLogoutIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Logout
          )}
          onPress={logOut}
        />
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Terms of use"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarTermsIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Logout
          )}
          onPress={handleTerms}
        />
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Privacy policy"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarPrivacyIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Logout
          )}
          onPress={handlePrivacy}
        />
      </View>
      <FeedbackSidebar />
    </DrawerContentScrollView>
  );
};
