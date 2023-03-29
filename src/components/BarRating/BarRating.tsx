import React, { useCallback } from 'react';
import { View, Text } from 'native-base';
import { Props } from './types';
import styles from './styles';
// import RippleBar from './RippleBar';

const BarRating: React.FC<Props> = ({
  value,
  status,
  outCome,
  pushScore,
  whiteCircle
}) => {
  const viewBar = useCallback(() => {
    if (status === 'closed' || status === 'complete') {
      if (Number(value) > 3) {
        if (outCome || pushScore === 'same') {
          return styles.greenBar;
        } else {
          return styles.mediumGreyBar;
        }
      } else {
        return styles.lightGreyBar;
      }
    } else if (value) {
      if (value === 1) {
        return styles.redBar;
      }
      if (value === 2) {
        return styles.redBar;
      }
      if (value === 3) {
        return styles.yellowBar;
      }
      if (value === 4) {
        return styles.greenBar;
      }
    }
  }, [value, status, outCome, pushScore]);

  const getWinState = useCallback(() => {
    if (status === 'closed' || status === 'complete') {
      return (
        <Text style={styles.stateText}>
          {Number(value) > 3 &&
            (pushScore === 'same' ? 'PUSH' : outCome ? 'Win' : 'Loss')}
        </Text>
      );
    } else if (Number(value) === 4) {
      return <Text style={styles.stateText}>Value</Text>;
    } else if (whiteCircle) {
      return <View style={styles.whiteCircle} />;
    }
  }, [status, pushScore, outCome, whiteCircle]);

  return (
    <View style={styles.scoreView}>
      {value ? (
        <View style={[styles.barView, viewBar()]}>{getWinState()}</View>
      ) : (
        <Text style={styles.notRatedText}>Not Rated</Text>
      )}
    </View>
  );
};

export default BarRating;
