import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { getWinAwayRatingValue, getWinHomeRatingValue } from '@Lib/function';
import { Svgs } from '@Theme';
import { WinProps } from './types';
import styles, { scale, deviceWidth } from './styles';

const Win: React.FC<WinProps> = ({
  gameData,
  selectedAwayTeam,
  selectedHomeTeam
}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [oddsValueSymbol, setOddsValueSymbol] = useState('');
  const [countML, setCountML] = useState(0);
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

  const plusLongRange = () => {
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

  const minusLongRange = () => {
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

  // const selectBar = (value: number | undefined) => {
  //   switch (value) {
  //     case 1:
  //       return styles.redBar;
  //     case 2:
  //       return styles.yellowBar;
  //     case 3:
  //       return styles.greenBar;
  //     case 4:
  //       return styles.greenBar;
  //     default:
  //       return styles.grayBar;
  //   }
  // };

  const positionCircle = useCallback(
    (value: number | undefined) => {
      const basic = (deviceWidth - 30 * scale) / 4;
      let result = 0;
      let startBar = 0;
      let endBar = 0;
      switch (value) {
        case 1:
          endBar = basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcYellowWinAway || 0) -
                (gameData?.algRatingPredAwaySpread || 0) * -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcYellowWin || 0) -
                (gameData?.algRatingPredHomeSpread || 0) * -1) /
              10;
          }
          result -= countML * 0.01;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 2:
          startBar = basic;
          endBar = 2 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcGreenWinAway || 0) -
                (gameData?.algRatingPredAwaySpread || 0) * -1) /
              ((gameData?.algRatingCalcGreenWinAway || 0) -
                (gameData?.algRatingCalcYellowWinAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcGreenWin || 0) -
                (gameData?.algRatingPredHomeSpread || 0) * -1) /
              ((gameData?.algRatingCalcGreenWin || 0) -
                (gameData?.algRatingCalcYellowWin || 0));
          }

          result -= countML * 0.01;
          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 3:
          startBar = 2 * basic;
          endBar = 3 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcSuperWinAway || 0) -
                (gameData?.algRatingPredAwaySpread || 0) * -1) /
              ((gameData?.algRatingCalcSuperWinAway || 0) -
                (gameData?.algRatingCalcGreenWinAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperWin || 0) -
                (gameData?.algRatingPredHomeSpread || 0) * -1) /
              ((gameData?.algRatingCalcSuperWin || 0) -
                (gameData?.algRatingCalcGreenWin || 0));
          }
          result -= countML * 0.01;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 4:
          startBar = 3 * basic;
          endBar = 4 * basic - 34 * scale;

          if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
            result =
              ((gameData?.algRatingCalcSuperWinAway || 0) +
                10 -
                (gameData?.algRatingPredAwaySpread || 0) * -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperWin || 0) +
                10 -
                (gameData?.algRatingPredHomeSpread || 0) * -1) /
              10;
          }
          result -= countML * 0.01;

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

  const getBarValue = useCallback(() => {
    if (selectedAwayTeam) {
      return getWinAwayRatingValue(gameData, rangeValue);
    }
    if (selectedHomeTeam) {
      return getWinHomeRatingValue(gameData, rangeValue);
    }
  }, [rangeValue]);

  useEffect(() => {
    if (rangeValue >= 200) {
      setOddsValueSymbol('>=');
      setRangeValue(200);
    } else if (rangeValue <= -200) {
      setOddsValueSymbol('<');
      setRangeValue(-200);
    } else {
      setOddsValueSymbol('');
    }
  }, [rangeValue]);

  useEffect(() => {
    if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
      setRangeValue(Number(gameData?.moneyline_last_outcome_away));
    }
    if (selectedHomeTeam) {
      setRangeValue(Number(gameData?.moneyline_last_outcome_home));
    }
    setCountML(0);
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
      <View style={styles.oddsBar}>
        <Text style={styles.titleText}>MONEY LINE</Text>
        <View style={styles.centerBar}>
          <TouchableOpacity
            onPress={minusRange}
            onLongPress={minusLongRange}
            onPressOut={handlePressOut}
            disabled={!selectedAwayTeam && !selectedHomeTeam}>
            <Icon type="Feather" name="minus" style={styles.barIcon} />
          </TouchableOpacity>
          <View
            style={[
              styles.statusBar,
              styles.bigBar,
              !selectedAwayTeam && !selectedHomeTeam && styles.grayBar,
              styles.blackBar
            ]}>
            <Text style={styles.statusText}>
              {oddsValueSymbol} {rangeValue > 0 ? `+${rangeValue}` : rangeValue}
            </Text>
          </View>
          <TouchableOpacity
            onPress={plusRange}
            onLongPress={plusLongRange}
            onPressOut={handlePressOut}
            disabled={!selectedAwayTeam && !selectedHomeTeam}>
            <Icon type="Feather" name="plus" style={styles.barIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>
        Tap team logo for odds. Tap +/- to input lines and see movement. Press
        and hold +/- for faster advance.
      </Text>
    </View>
  );
};

export default Win;
