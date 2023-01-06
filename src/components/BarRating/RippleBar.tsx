import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { View, Text } from 'native-base';

import { RippleBarProps } from './types';
import styles from './styles';

const RippleBar: React.FC<RippleBarProps> = ({
  direction,
  rippleStyle,
  status
}) => {
  const animateValue = new Animated.Value(0);
  const animateValue1 = new Animated.Value(0);

  const doAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false
        }),
        Animated.timing(animateValue1, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false
        }),
        Animated.timing(animateValue1, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false
        }),
        Animated.timing(animateValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false
        })
      ])
    ).start();
  };

  useEffect(() => {
    doAnimation();
  });

  return (
    <View style={styles.scoreView}>
      <Animated.View
        style={[
          styles.rippleBar,
          {
            opacity: status
              ? 1
              : direction === 'right'
              ? animateValue
              : animateValue1
          }
        ]}>
        {direction === 'left' && (
          <View style={[styles.whiteBar, styles.leftBar, { right: 0 }]} />
        )}
        <View
          style={[
            styles.firstBar,
            direction === 'left' && styles.secondBar,
            direction === 'left' ? styles.leftBar : styles.rightBar,
            rippleStyle
          ]}
        />
        {direction === 'right' && (
          <View style={[styles.whiteBar, styles.rightBar, { left: 0 }]} />
        )}
      </Animated.View>
      <Animated.View
        style={[
          styles.rippleBar,
          {
            opacity: status
              ? 1
              : direction === 'left'
              ? animateValue
              : animateValue1
          }
        ]}>
        {direction === 'left' && (
          <View style={[styles.whiteBar, styles.leftBar, { right: 0 }]} />
        )}
        <View
          style={[
            styles.firstBar,
            direction === 'right' && styles.secondBar,
            direction === 'left' ? styles.leftBar : styles.rightBar,
            rippleStyle
          ]}
        />
        {direction === 'right' && (
          <View style={[styles.whiteBar, styles.rightBar, { left: 0 }]} />
        )}
      </Animated.View>
    </View>
  );
};

export default RippleBar;
