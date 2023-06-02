import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Icon, View } from 'native-base';
import { DrawerActions } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import LogoSidebar from './LogoSidebar';
import FeedbackSidebar from './FeedbackSidebar';
import { Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';
import styles, { scale } from './styles';

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
  // const [isCancelAccountModal, setIsCancelAccountModal] = useState(false);

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

  // const cancelAccount = () => {
  //   setIsCancelAccountModal(!isCancelAccountModal);
  // };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.sidebarContent}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Icon type="AntDesign" name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <LogoSidebar />
        {/* <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Notification Preferences"
          icon={() => (
            <Icon
              type="Ionicons"
              name="notifications-outline"
              style={styles.icon}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Notification
          )}
          onPress={() => navigation.navigate(Routes.Notification)}
        /> */}
        {/* <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Subscription"
          icon={() => (
            <Icon
              type="MaterialCommunityIcons"
              name="currency-usd-circle-outline"
              style={styles.icon}
            />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Subscription
          )}
          onPress={() =>
            navigation.navigate(Routes.Subscription, { state: true })
          }
        /> */}
        <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="My Info"
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
          label="How to Use"
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
        {/* <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="FAQs"
          icon={() => (
            <Icon
              type="MaterialCommunityIcons"
              name="comment-question-outline"
              style={styles.icon}
            />
          )}
          focused={getActiveRouteState(state.routes, state.index, Routes.FAQs)}
          onPress={() => navigation.navigate(Routes.FAQs)}
        /> */}

        {/* <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Privacy & Terms"
          icon={() => (
            <Icon type="MaterialIcons" name="privacy-tip" style={styles.icon} />
          )}
          focused={getActiveRouteState(
            state.routes,
            state.index,
            Routes.Privacy
          )}
          onPress={() => navigation.navigate(Routes.Privacy)}
        /> */}

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
        {/*   <DrawerItem
          {...itemBaseStyle}
          {...rest}
          label="Cancel Account"
          icon={() => (
            <SvgXml
              xml={Svgs.sidebarCancelIcon}
              width={25 * scale}
              height={25 * scale}
            />
          )}
          onPress={cancelAccount}
        /> */}
        <FeedbackSidebar />
      </View>
      {/* <ModalCancelAccount
        isModalVisible={isCancelAccountModal}
        toggleModal={cancelAccount}
      /> */}
    </DrawerContentScrollView>
  );
};
