import React from 'react';
import { View, Icon } from 'native-base';

import { Props } from './types';

import styles from './styles';

const BetStatus: React.FC<Props> = ({ base1, base2, base3 }) => {
  return (
    <View style={styles.scoreView}>
      <Icon
        type="FontAwesome5"
        name="square-full"
        style={[styles.icon1, base3 ? styles.color2 : styles.color1]}
      />
      <Icon
        type="FontAwesome5"
        name="square-full"
        style={[styles.icon2, base2 ? styles.color2 : styles.color1]}
      />
      <Icon
        type="FontAwesome5"
        name="square-full"
        style={[styles.icon3, base1 ? styles.color2 : styles.color1]}
      />
    </View>
  );
};

export default BetStatus;
