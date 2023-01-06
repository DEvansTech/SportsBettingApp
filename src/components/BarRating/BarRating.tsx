import React from 'react';
import { View, Text } from 'native-base';
import { Props } from './types';
import styles from './styles';
import RippleBar from './RippleBar';

const BarRating: React.FC<Props> = ({
  value,
  status,
  outCome,
  pushScore,
  points,
  team
}) => {
  const viewBar = () => {
    if ((status === 'closed' || status === 'complete') && points) {
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
  };

  const getWinState = () => {
    if ((status === 'closed' || status === 'complete') && points) {
      return (
        <Text style={styles.stateText}>
          {Number(value) > 3 &&
            (pushScore === 'same' ? 'PUSH' : outCome ? 'Win' : 'Loss')}
        </Text>
      );
    } else if (Number(value) === 4) {
      return <Text style={styles.stateText}>Value</Text>;
    }
  };

  return (
    <View style={styles.scoreView}>
      {value ? (
        <>
          {value > 3 && team === 'home' && (
            <RippleBar
              direction="left"
              rippleStyle={viewBar()}
              status={status === 'closed' || status === 'complete'}
            />
          )}
          <View style={[styles.barView, viewBar()]}>{getWinState()}</View>
          {value > 3 && team === 'away' && (
            <RippleBar
              direction="right"
              rippleStyle={viewBar()}
              status={status === 'closed' || status === 'complete'}
            />
          )}
        </>
      ) : (
        <Text style={styles.notRatedText}>Not Rated</Text>
      )}
    </View>
  );
};

export default BarRating;
