import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { Text, View } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { MainContext, MainContextType } from '@Context/MainContext';
import { Routes } from '@Navigators/routes';
import ObisaysScence from '@Scenes/Obisays';
import ObiDetailScence from '@Scenes/Obisays/ObiDetail';
import ScheduleScene from '@Scenes/Schedule';
import LineRaterScene from '@Scenes/LineRater';
import WatchsScene from '@Scenes/Watch';
import MyteamScene from '@Scenes/Myteam';
import FeedbackScene from '@Scenes/Feedback';
import MyAccountScene from '@Scenes/MyAccount';

import { calendarDate } from '@Lib/utilities';
import { Colors, Svgs } from '@Theme';
import styles, { scale } from './styles';

const options: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true
};

const Tab = createBottomTabNavigator();
const CustomStack = createStackNavigator();

const ScheduleStackNavigator = () => (
  <CustomStack.Navigator
    initialRouteName={Routes.Schedule}
    screenOptions={({ navigation }) => {
      return {
        ...options,
        detachPreviousScreen: !navigation.isFocused()
      };
    }}>
    <CustomStack.Screen name={Routes.Schedule} component={ScheduleScene} />
    <CustomStack.Screen name={Routes.LineRater} component={LineRaterScene} />
    <CustomStack.Screen name={Routes.Feedback} component={FeedbackScene} />
  </CustomStack.Navigator>
);

const WatchStackNavigator = () => (
  <CustomStack.Navigator
    initialRouteName={Routes.Watch}
    screenOptions={({ navigation }) => {
      return {
        ...options,
        detachPreviousScreen: !navigation.isFocused()
      };
    }}>
    <CustomStack.Screen name={Routes.Watch} component={WatchsScene} />
    <CustomStack.Screen name={Routes.MyTeam} component={MyteamScene} />
    <CustomStack.Screen name={Routes.LineRater} component={LineRaterScene} />
    <CustomStack.Screen name={Routes.Feedback} component={FeedbackScene} />
  </CustomStack.Navigator>
);

const ObisayStackNavigator = () => (
  <CustomStack.Navigator
    initialRouteName={Routes.OBI}
    screenOptions={({ navigation }) => {
      return {
        ...options,
        detachPreviousScreen: !navigation.isFocused()
      };
    }}>
    <CustomStack.Screen name={Routes.OBI} component={ObisaysScence} />
    <CustomStack.Screen name={Routes.OBIDetail} component={ObiDetailScence} />
    <CustomStack.Screen name={Routes.Feedback} component={FeedbackScene} />
  </CustomStack.Navigator>
);

const CustomTabButton = (props: any) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [
            props.style,
            {
              borderTopColor: Colors.green,
              borderTopWidth: 3
            }
          ]
        : [
            props.style,
            {
              borderTopColor: Colors.darkerGrey,
              borderTopWidth: 3
            }
          ]
    }
  />
);

export const TabNavigator: React.FC = (props: any) => {
  const { scheduleDate } = useContext(MainContext) as MainContextType;
  const todayDate = calendarDate(scheduleDate);

  return (
    <Tab.Navigator
      initialRouteName={Routes.Schedule}
      tabBarOptions={{
        tabStyle: styles.tabStyle,
        activeTintColor: Colors.black,
        inactiveTintColor: Colors.black,
        showLabel: true,
        style: styles.container
      }}>
      <Tab.Screen
        name={Routes.OBI}
        component={ObisayStackNavigator}
        options={() => ({
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.labelStyle,
                { color: focused ? Colors.green : color }
              ]}>
              ROI SAYS
            </Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <SvgXml
                xml={focused ? Svgs.obiGreenIcon : Svgs.obiIcon}
                width={40 * scale}
                height={40 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      />
      <Tab.Screen
        name={Routes.Schedule}
        component={ScheduleStackNavigator}
        options={() => ({
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.labelStyle,
                { color: focused ? Colors.green : color }
              ]}>
              SCHEDULE
            </Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <SvgXml
                xml={focused ? Svgs.scheduleGreenIcon : Svgs.scheduleIcon}
                width={39 * scale}
                height={39 * scale}
              />
              <Text style={[styles.monthText, focused && styles.activeTab]}>
                {todayDate[0]}
              </Text>
              <Text style={[styles.dateText, focused && styles.activeTab]}>
                {todayDate[1]}
              </Text>
            </View>
          )
        })}
      />
      <Tab.Screen
        name={Routes.Watch}
        component={WatchStackNavigator}
        options={() => ({
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.labelStyle,
                { color: focused ? Colors.green : color }
              ]}>
              WATCHING
            </Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <SvgXml
                xml={focused ? Svgs.watchingGreenIcon : Svgs.watchingIcon}
                width={50 * scale}
                height={20 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      />
      <Tab.Screen
        name={Routes.MyAccount}
        component={MyAccountScene}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          }
        })}
        options={() => ({
          tabBarButton: CustomTabButton,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.labelStyle,
                { color: focused ? Colors.green : color }
              ]}>
              Account
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <SvgXml
                xml={focused ? Svgs.accountGreenIcon : Svgs.accountIcon}
                width={35 * scale}
                height={35 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      />
      {/* <Tab.Screen
        name={Routes.Partner}
        component={PartnerScene}
        options={() => ({
          tabBarButton: CustomTabButton,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.labelStyle,
                { color: focused ? Colors.green : color }
              ]}>
              PARTNERS
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <SvgXml
                xml={focused ? Svgs.partnerGreenIcon : Svgs.partnerIcon}
                width={48 * scale}
                height={48 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      /> */}
    </Tab.Navigator>
  );
};
