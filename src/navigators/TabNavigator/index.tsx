import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors, Svgs } from '@Theme';

import { MainContext, MainContextType } from '@Context/MainContext';
import { Routes } from '@Navigators/routes';
import ObisaysScence from '@Scenes/Obisays';
import ObiMoneyScence from '@Scenes/Obisays/ObiMoney';
import ObiBooksScence from '@Scenes/Obisays/ObiBooks';
import ObiLineRaterScence from '@Scenes/Obisays/ObiLineRater';
import ObiWeightScence from '@Scenes/Obisays/ObiWeight';
import ScheduleScene from '@Scenes/Schedule';
import LineRaterScene from '@Scenes/LineRater';
import WatchsScene from '@Scenes/Watch';
import MyteamScene from '@Scenes/Myteam';
import PartnerScene from '@Scenes/Partner';
import FeedbackScene from '@Scenes/Feedback';
import { calendarDate } from '@Lib/utilities';
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
    <CustomStack.Screen name={Routes.OBIMoney} component={ObiMoneyScence} />
    <CustomStack.Screen name={Routes.OBIBooks} component={ObiBooksScence} />
    <CustomStack.Screen
      name={Routes.OBILineRater}
      component={ObiLineRaterScence}
    />
    <CustomStack.Screen name={Routes.OBIWeight} component={ObiWeightScence} />
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

export const TabNavigator: React.FC = props => {
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
          tabBarLabel: () => (
            <Text style={[styles.labelStyle, { color: Colors.green }]}>
              OBI SAYS
            </Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarView, focused && styles.selectedIcon]}>
              <SvgXml
                xml={Svgs.obiSayIcon}
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
          tabBarLabel: ({ color }) => (
            <Text style={[styles.labelStyle, { color: color }]}>SCHEDULE</Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarView, focused && styles.selectedIcon]}>
              <SvgXml
                xml={Svgs.scheduleIcon}
                width={39 * scale}
                height={39 * scale}
              />
              <Text style={styles.monthText}>{todayDate[0]}</Text>
              <Text style={styles.dateText}>{todayDate[1]}</Text>
            </View>
          )
        })}
      />
      <Tab.Screen
        name={Routes.Watch}
        component={WatchStackNavigator}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <Text style={[styles.labelStyle, { color: color }]}>WATCHING</Text>
          ),
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarView, focused && styles.selectedIcon]}>
              <SvgXml
                xml={Svgs.watchIcon}
                width={50 * scale}
                height={20 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      />
      <Tab.Screen
        name={Routes.Partner}
        component={PartnerScene}
        options={() => ({
          tabBarButton: CustomTabButton,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.labelStyle, { color: color }]}>PARTNERS</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarView, focused && styles.selectedIcon]}>
              <SvgXml
                xml={Svgs.partnerIcon}
                width={48 * scale}
                height={48 * scale}
              />
            </View>
          ),
          unmountOnBlur: true
        })}
      />
    </Tab.Navigator>
  );
};
