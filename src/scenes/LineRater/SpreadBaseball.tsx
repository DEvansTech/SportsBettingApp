import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';

import {
  getMLBSpreadAwayRatingValue,
  getMLBSpreadHomeRatingValue
} from '@Lib/function';
import { Ranger } from '@Components';
import { SpreadProps } from './types';
import styles from './styles';

const SpreadBaseball: React.FC<SpreadProps> = ({
  gameData,
  selectedAwayTeam,
  selectedHomeTeam
}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [oddType, setOddType] = useState('plus');

  const plusRange = () => {
    if (rangeValue >= 200) {
      setRangeValue(200);
    } else {
      setRangeValue(rangeValue + 1);
    }
  };

  const minusRange = () => {
    if (rangeValue <= -200) {
      setRangeValue(-200);
    } else {
      setRangeValue(rangeValue - 1);
    }
  };

  const selectBar = (value: number | undefined) => {
    switch (value) {
      case 1:
        return styles.redBar;
      case 2:
        return styles.yellowBar;
      case 3:
        return styles.greenBar;
      case 4:
        return styles.greenBar;
      default:
        return styles.grayBar;
    }
  };

  const getBarValue = useCallback(() => {
    if (selectedAwayTeam) {
      return getMLBSpreadAwayRatingValue(gameData, rangeValue, oddType);
    }
    if (selectedHomeTeam) {
      return getMLBSpreadHomeRatingValue(gameData, rangeValue, oddType);
    }
  }, [oddType, rangeValue]);

  useEffect(() => {
    if (selectedAwayTeam) {
      setRangeValue(Number(gameData?.run_line_last_outcome_away));
      if (Number(gameData?.run_line_last_spread_away) > 0) {
        setOddType('plus');
      } else {
        setOddType('minus');
      }
    }
    if (selectedHomeTeam) {
      setRangeValue(Number(gameData?.run_line_last_outcome_home));
      if (Number(gameData?.run_line_last_spread_home) > 0) {
        setOddType('plus');
      } else {
        setOddType('minus');
      }
    }
    if (!selectedAwayTeam && !selectedHomeTeam) {
      setRangeValue(Number(gameData?.run_line_last_outcome_away));
      if (Number(gameData?.run_line_last_spread_away) > 0) {
        setOddType('plus');
      } else {
        setOddType('minus');
      }
    }
  }, [selectedAwayTeam, selectedHomeTeam]);

  return (
    <View style={styles.spreadView}>
      <Text style={[styles.titleText, styles.spreadTitle]}>Odds Type</Text>
      <View style={styles.oddsBar}>
        <TouchableOpacity
          style={[
            styles.statusBar,
            styles.smallBar,
            oddType === 'plus' ? styles.blackBar : styles.grayBar
          ]}
          onPress={() => setOddType('plus')}>
          <Text style={styles.statusText}>+1.5</Text>
        </TouchableOpacity>
        {oddType === 'plus' && (
          <View>
            <View style={styles.rightBar}>
              <TouchableOpacity
                onPress={minusRange}
                disabled={!selectedAwayTeam && !selectedHomeTeam}>
                <Icon type="Feather" name="minus" style={styles.barIcon} />
              </TouchableOpacity>
              <View
                style={[
                  styles.mediumBar,
                  !selectedAwayTeam && !selectedHomeTeam
                    ? styles.grayBar
                    : selectBar(getBarValue()),
                  styles.statusBar
                ]}>
                <Text style={styles.statusText}>
                  {rangeValue > 0 ? `+${rangeValue}` : rangeValue}
                </Text>
              </View>
              <TouchableOpacity
                onPress={plusRange}
                disabled={!selectedAwayTeam && !selectedHomeTeam}>
                <Icon type="Feather" name="plus" style={styles.barIcon} />
              </TouchableOpacity>
            </View>
            {getBarValue() === 4 && <Text style={styles.superText}>SUPER</Text>}
          </View>
        )}
      </View>

      <View style={styles.oddsBar}>
        <TouchableOpacity
          style={[
            styles.statusBar,
            styles.smallBar,
            oddType === 'minus' ? styles.blackBar : styles.grayBar
          ]}
          onPress={() => setOddType('minus')}>
          <Text style={styles.statusText}>-1.5</Text>
        </TouchableOpacity>
        {oddType === 'minus' && (
          <View>
            <View style={styles.rightBar}>
              <TouchableOpacity
                onPress={minusRange}
                disabled={!selectedAwayTeam && !selectedHomeTeam}>
                <Icon type="Feather" name="minus" style={styles.barIcon} />
              </TouchableOpacity>
              <View
                style={[
                  styles.statusBar,
                  styles.mediumBar,
                  !selectedAwayTeam && !selectedHomeTeam
                    ? styles.grayBar
                    : selectBar(getBarValue())
                ]}>
                <Text style={styles.statusText}>
                  {rangeValue > 0 ? `+${rangeValue}` : rangeValue}
                </Text>
              </View>
              <TouchableOpacity
                onPress={plusRange}
                disabled={!selectedAwayTeam && !selectedHomeTeam}>
                <Icon type="Feather" name="plus" style={styles.barIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.rangerView}>
        <Ranger
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          disabled={!selectedAwayTeam && !selectedHomeTeam}
        />
      </View>
    </View>
  );
};

export default SpreadBaseball;
