import React, { useEffect, useCallback } from 'react';
import { View, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { Images } from '@Theme';
import styles from './styles';

const Loading: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const hardwareBackPressCustom = useCallback(() => {
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom
      );
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default Loading;
