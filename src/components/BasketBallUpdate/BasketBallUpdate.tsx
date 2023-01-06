import React, { useEffect, useState } from 'react';
import { Easing } from 'react-native';
import { View } from 'native-base';
import Slider from '@Lib/silder';

import { Images, Colors } from '@Theme';
import { Props } from './types';
import styles from './styles';

const BasketBallUpdate: React.FC<Props> = ({ disabled }) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flag) {
        if (rangeValue > 2) {
          setFlag(false);
        } else {
          setRangeValue(rangeValue => rangeValue + 1);
        }
      } else {
        if (rangeValue < 1) {
          setFlag(true);
        } else {
          setRangeValue(rangeValue => rangeValue - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.rangerView}>
      <Slider
        value={rangeValue}
        minimumValue={0}
        maximumValue={3}
        minimumTrackTintColor={Colors.darkGrey}
        maximumTrackTintColor={Colors.darkGrey}
        trackStyle={styles.trackStyle}
        step={0.1}
        thumbImageStyle={styles.thumbImageStyle}
        thumbStyle={styles.thumbStyle}
        thumbImage={Images.Basketball}
        disabled={disabled}
      />
    </View>
  );
};

export default BasketBallUpdate;
