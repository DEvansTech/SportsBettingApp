import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TabNavigator } from '@Navigators/TabNavigator';
import { CustomDrawerContent } from './CustomDrawerContent';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import NotificationScene from '@Scenes/Notification';
import SubscriptionScene from '@Scenes/Subscription';
import LoadingScene from '@Scenes/Loading';
import MyAccountScene from '@Scenes/MyAccount';
import IntroductionScene from '@Scenes/Introduction';
import FeedbackScene from '@Scenes/Feedback';
import { Routes } from '@Navigators/routes';
import { Colors } from '@Theme';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Drawer.Navigator
      initialRouteName={Routes.SubscriptionLoading}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: Colors.green
      }}
      drawerPosition="left"
      drawerType="front"
      drawerContentOptions={{
        activeBackgroundColor: Colors.green,
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.grey
      }}
      edgeWidth={0}>
      <Drawer.Screen
        name={Routes.SubscriptionLoading}
        component={LoadingScene}
      />
      <Drawer.Screen name={Routes.Subscription} component={SubscriptionScene} />
      <Drawer.Screen
        name={Routes.TabRoute}
        component={TabNavigator}
        options={{ swipeEnabled: user ? true : false }}
      />
      <Drawer.Screen name={Routes.Notification} component={NotificationScene} />
      <Drawer.Screen name={Routes.MyAccount} component={MyAccountScene} />
      <Drawer.Screen name={Routes.Introduction} component={IntroductionScene} />
      <Drawer.Screen name={Routes.Feedback} component={FeedbackScene} />
    </Drawer.Navigator>
  );
};
