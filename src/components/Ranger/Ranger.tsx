import React from 'react';
import { View } from 'native-base';
import Slider from '@Lib/silder';

import { Images, Colors } from '@Theme';
import { Props } from './types';
import styles from './styles';

const Ranger: React.FC<Props> = ({
  rangeValue,
  setRangeValue,
  disabled,
  minimumValue = -250,
  maximumValue = 250
}) => {
  return (
    <View style={styles.rangerView}>
      <Slider
        value={rangeValue}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={Colors.green}
        maximumTrackTintColor={Colors.darkGrey}
        onValueChange={(value: number) => setRangeValue(value)}
        step={1}
        thumbImageStyle={styles.thumbImageStyle}
        thumbStyle={styles.thumbStyle}
        thumbImage={Images.SliderKnob}
        disabled={disabled}
      />
    </View>
  );
};

export default Ranger;
