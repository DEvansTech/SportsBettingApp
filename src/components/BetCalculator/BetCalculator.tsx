import React, { useCallback, memo } from 'react';
import { View, Text } from 'native-base';

import styles from './styles';
import { Props } from './types';

const BetCalculator: React.FC<Props> = ({
  outCome,
  matchType,
  value1,
  value2,
  status,
  rating,
  points,
  valueType,
  pushScore
}) => {
  const checkIntValue = useCallback(
    (value: string | undefined) => {
      if (value) {
        if (Number(value) > 0) {
          return `+${Number(value)}`;
        }
        return Number(value);
      }
    },
    [value2]
  );
  const checkFloatValue = useCallback(
    (value: string | undefined) => {
      if (value) {
        if (valueType !== 'OU' && Number(value) > 0) {
          return `+${parseFloat(value).toFixed(1)}`;
        }
        return parseFloat(value).toFixed(1);
      }
    },
    [value1]
  );

  return (
    <View style={styles.container}>
      <View style={styles.betResultRow}>
        <View
          style={
            matchType === 'home' ? styles.homeTextView : styles.awayTextView
          }>
          {(status === 'closed' || status === 'complete') && points ? (
            <Text
              style={
                outCome && pushScore !== 'same'
                  ? styles.betBoldBalckText
                  : styles.betBlackText
              }>
              {checkIntValue(value2)} {value1 && `(${checkFloatValue(value1)})`}
            </Text>
          ) : (
            <Text
              style={
                Number(rating) > 3 ? styles.betGreenText : styles.betBlackText
              }>
              {checkIntValue(value2)} {value1 && `(${checkFloatValue(value1)})`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(BetCalculator);
