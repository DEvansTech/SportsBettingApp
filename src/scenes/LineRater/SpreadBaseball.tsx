import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import {
  getMLBSpreadAwayRatingValue,
  getMLBSpreadHomeRatingValue
} from '@Lib/function';
import { Svgs } from '@Theme';
import { SpreadProps } from './types';
import styles, { scale, deviceWidth } from './styles';

const SpreadBaseball: React.FC<SpreadProps> = ({
  gameData,
  selectedAwayTeam,
  selectedHomeTeam
}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [oddType, setOddType] = useState('plus');
  const [oddsValueSymbol, setOddsValueSymbol] = useState('');
  const [countML, setCountML] = useState(0);
  const [barState, setBarState] = useState(0);
  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const plusRange = () => {
    if (rangeValue >= 200) {
      setRangeValue(200);
      return;
    }
    if (rangeValue + 5 > -99 && rangeValue + 5 < 99) {
      setRangeValue(100);
      setCountML(countML + 1);
      return;
    }
    setRangeValue(rangeValue + 5);
    setCountML(countML + 1);
  };

  const minusRange = () => {
    if (rangeValue <= -200) {
      setRangeValue(-200);
      return;
    }
    if (rangeValue - 5 < 99 && rangeValue - 5 > -99) {
      setRangeValue(-100);
      setCountML(countML - 1);
      return;
    }
    setRangeValue(rangeValue - 5);
    setCountML(countML - 1);
  };

  const plusLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);
      setRangeValue(prev => {
        if (prev + (1 + diff) < 99 && prev + (1 + diff) > -99) {
          setCountML(countML => countML + 1);
          return 100;
        }
        if (prev + (1 + diff) >= 200) {
          clearInterval(changeTimer.current);
          changeTimer.current = null;
          return 200;
        }
        setCountML(countML => countML + 1);
        return prev + (1 + diff);
      });
    }, 100);
  };

  const minusLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);

      setRangeValue(prev => {
        if (prev - (1 + diff) < 99 && prev - (1 + diff) > -99) {
          setCountML(countML => countML - 1);
          return -100;
        }
        if (prev - (1 + diff) <= -200) {
          clearInterval(changeTimer.current);
          changeTimer.current = null;
          return -200;
        }
        setCountML(countML => countML - 1);
        return prev - (1 + diff);
      });
    }, 100);
  };

  const handlePressOut = () => {
    clearInterval(changeTimer.current);
    changeTimer.current = null;
  };

  const getBarValue = useCallback(() => {
    if (selectedAwayTeam) {
      return getMLBSpreadAwayRatingValue(gameData, rangeValue, oddType);
    }
    if (selectedHomeTeam) {
      return getMLBSpreadHomeRatingValue(gameData, rangeValue, oddType);
    }
  }, [oddType, rangeValue]);

  const positionCircle = useCallback(
    (value: number | undefined) => {
      const basic = (deviceWidth - 30 * scale) / 4;
      let result = 0;
      let startBar = 0;
      let endBar = 0;
      switch (value) {
        case 1:
          endBar = basic - 34 * scale;

          if (selectedAwayTeam) {
            result =
              ((gameData?.algRatingCalcYellowSpreadAway || 0) -
                ((gameData?.algRatingPredAwaySpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcYellowSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              10;
          }
          result -= countML * 0.02;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 2:
          startBar = basic;
          endBar = 2 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcGreenSpreadAway || 0) -
                ((gameData?.algRatingPredAwaySpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              ((gameData?.algRatingCalcGreenSpreadAway || 0) -
                (gameData?.algRatingCalcYellowSpreadAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcGreenSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              ((gameData?.algRatingCalcGreenSpread || 0) -
                (gameData?.algRatingCalcYellowSpread || 0));
          }

          result -= countML * 0.02;
          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 3:
          startBar = 2 * basic;
          endBar = 3 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcSuperSpreadAway || 0) -
                ((gameData?.algRatingPredAwaySpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              ((gameData?.algRatingCalcSuperSpreadAway || 0) -
                (gameData?.algRatingCalcGreenSpreadAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              ((gameData?.algRatingCalcSuperSpread || 0) -
                (gameData?.algRatingCalcGreenSpread || 0));
          }

          result -= countML * 0.02;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 4:
          startBar = 3 * basic;
          endBar = 4 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcSuperSpreadAway || 0) +
                10 -
                ((gameData?.algRatingPredAwaySpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperSpread || 0) +
                10 -
                ((gameData?.algRatingPredHomeSpread || 0) -
                  (oddType === 'plus' ? 1.5 : -1.5)) *
                  -1) /
              10;
          }
          result -= countML * 0.02;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);

        default:
          return 0;
      }
    },
    [countML, rangeValue]
  );

  useEffect(() => {
    setCountML(0);
  }, [barState]);

  useEffect(() => {
    setBarState(getBarValue() || 0);
  });

  useEffect(() => {
    if (rangeValue >= 200) {
      setOddsValueSymbol('>=');
    } else if (rangeValue <= -200) {
      setOddsValueSymbol('<=');
    } else {
      setOddsValueSymbol('');
    }
  }, [rangeValue]);

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
      <View style={styles.rangerView}>
        <Text style={[styles.titleText, styles.rangerText]}>Bet Rating</Text>
        <View style={styles.rangerScaleView}>
          <SvgXml
            xml={Svgs.lineMasterScale}
            width={'100%'}
            height={50 * scale}
          />
          <SvgXml
            xml={Svgs.lineMasterCircle}
            width={36 * scale}
            height={36 * scale}
            style={[
              styles.betCircleIcon,
              { left: positionCircle(getBarValue()) }
            ]}
          />
        </View>
      </View>

      <View style={styles.spreadBarView}>
        <View style={styles.totalBarView}>
          <Text style={[styles.titleText, styles.overBarText]}>Odds Type</Text>
          <View style={styles.leftBar}>
            <TouchableOpacity
              style={[
                styles.oddsLeftBtn,
                oddType === 'plus' ? styles.blackBar : styles.grayBar
              ]}
              onPress={() => setOddType('plus')}>
              <Text style={styles.statusText}>+1.5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.oddsRightBtn,
                oddType === 'minus' ? styles.blackBar : styles.grayBar
              ]}
              onPress={() => setOddType('minus')}>
              <Text style={styles.statusText}>-1.5</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overBarView}>
          <Text style={styles.titleText}>Money line</Text>
          <View style={styles.centerBar}>
            <TouchableOpacity
              onPress={minusRange}
              onLongPress={minusLongValue}
              onPressOut={handlePressOut}
              disabled={!selectedAwayTeam && !selectedHomeTeam}>
              <Icon type="Feather" name="minus" style={styles.barIcon} />
            </TouchableOpacity>
            <View
              style={[
                styles.moneyLineBar,
                !selectedAwayTeam && !selectedHomeTeam && styles.grayBar,
                styles.statusBar,
                styles.blackBar
              ]}>
              <Text style={styles.statusText}>
                {oddsValueSymbol} {rangeValue > 0 && '+'} {rangeValue}
              </Text>
            </View>
            <TouchableOpacity
              onPress={plusRange}
              onLongPress={plusLongValue}
              onPressOut={handlePressOut}
              disabled={!selectedAwayTeam && !selectedHomeTeam}>
              <Icon type="Feather" name="plus" style={styles.barIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.oddsBar}>
        <Text style={styles.description}>
          Tap team logo for odds. Tap +/- to input lines and see movement. Press
          and hold +/- for faster advance.
        </Text>
      </View>
    </View>
  );
};

export default SpreadBaseball;
