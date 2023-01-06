import React, { useEffect } from 'react';
import { View, Animated, Image, Easing } from 'react-native';

import { Images } from '@Theme';
import styles from './styles';

const LogoSpinner: React.FC = () => {
  const animateValue = new Animated.Value(0);
  const animatedStyle = {
    transform: [
      {
        rotate: animateValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }
    ]
  };

  const doAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateValue, {
          toValue: 1,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateValue, {
          toValue: 0,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  useEffect(() => {
    doAnimation();
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Image
          source={Images.circle}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Image source={Images.rIcon} style={styles.Rletter} />
    </View>
  );
};

export default LogoSpinner;
