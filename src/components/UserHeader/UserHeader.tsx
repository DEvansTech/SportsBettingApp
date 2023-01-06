import React from 'react';
import { Header, View, Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';

import { Colors, Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';

import styles, { scale } from './styles';
import { Props } from './types';

const UserHeader: React.FC<Props> = ({
  type,
  iconType,
  iconName,
  name,
  to
}) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const goNavigation = () => {
    if (to) {
      navigation.navigate(to);
    } else {
      navigation.navigate(Routes.Dashboard);
    }
  };
  return (
    <Header
      style={styles.header}
      iosBarStyle={'light-content'}
      androidStatusBarColor={Colors.black}>
      <View style={styles.headerLeft}>
        {type === 'icon' ? (
          <Icon type={iconType} name={iconName} style={styles.icon} />
        ) : (
          <SvgXml
            xml={Svgs.commentIcon}
            width={32 * scale}
            height={32 * scale}
          />
        )}
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <TouchableOpacity onPress={goNavigation}>
        <Icon type="Ionicons" name="close-outline" style={styles.closeIcon} />
      </TouchableOpacity>
    </Header>
  );
};

export default UserHeader;
