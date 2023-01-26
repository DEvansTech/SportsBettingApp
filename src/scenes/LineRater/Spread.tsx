import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import {
  getSpreadAwayRatingValue,
  getSpreadHomeRatingValue
} from '@Lib/function';

import { Svgs } from '@Theme';
import { SpreadProps } from './types';
import styles, { scale, deviceWidth } from './styles';

const Spread: React.FC<SpreadProps> = ({
  gameData,
  selectedAwayTeam,
  selectedHomeTeam
}) => {
  const [oddsValue, setOddsValue] = useState(0);
  const [oddsTypeValue, setOddsTypeValue] = useState(0);
  const [oddsValueSymbol, setOddsValueSymbol] = useState('');
  const [countML, setCountML] = useState(0);
  const [barState, setBarState] = useState(0);
  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const plusValue = () => {
    if (oddsValue >= 200) {
      setOddsValue(200);
      return;
    }
    if (oddsValue + 5 > -99 && oddsValue + 5 < 99) {
      setOddsValue(100);
      setCountML(countML + 1);
      return;
    }
    setOddsValue(oddsValue + 5);
    setCountML(countML + 1);
  };

  const plusLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);
      setOddsValue(prev => {
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

  const minusValue = () => {
    if (oddsValue <= -200) {
      setOddsValue(-200);
      return;
    }
    if (oddsValue - 5 < 99 && oddsValue - 5 > -99) {
      setOddsValue(-100);
      setCountML(countML - 1);
      return;
    }
    setOddsValue(oddsValue - 5);
    setCountML(countML - 1);
  };

  const minusLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);
      setOddsValue(prev => {
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

  const plusTypeValue = () => {
    if (oddsTypeValue >= 110) {
      setOddsTypeValue(110);
    } else {
      setOddsTypeValue(fixedTo(oddsTypeValue + 0.5));
    }
  };

  const plusTypeLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);
      setOddsTypeValue(prev => {
        if (prev + (1 + diff) >= 110) {
          return 110;
        }
        return fixedTo(prev + (1 + diff));
      });
    }, 100);
  };

  const minusTypeValue = () => {
    if (oddsTypeValue <= -110) {
      setOddsTypeValue(-110);
    } else {
      setOddsTypeValue(fixedTo(oddsTypeValue - 0.5));
    }
  };

  const minusTypeLongValue = () => {
    const past = Date.now();
    const rate = 500;
    changeTimer.current = setInterval(() => {
      const diff = Math.floor((Date.now() - past) / rate);
      setOddsTypeValue(prev => {
        if (prev - (1 + diff) <= -110) {
          return -110;
        }
        return fixedTo(prev - (1 + diff));
      });
    }, 100);
  };

  const fixedTo = (number: number) => {
    const k = Math.pow(10, 1);
    return Math.round(number * k) / k;
  };

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
              ((gameData?.algRatingCalcYellowSpreadAway || 0) -
                ((gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue) *
                  -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcYellowSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue) *
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
                ((gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue) *
                  -1) /
              ((gameData?.algRatingCalcGreenSpreadAway || 0) -
                (gameData?.algRatingCalcYellowSpreadAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcGreenSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue) *
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
                ((gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue) *
                  -1) /
              ((gameData?.algRatingCalcSuperSpreadAway || 0) -
                (gameData?.algRatingCalcGreenSpreadAway || 0));
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperSpread || 0) -
                ((gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue) *
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
                ((gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue) *
                  -1) /
              10;
          }
          if (selectedHomeTeam) {
            result =
              ((gameData?.algRatingCalcSuperSpread || 0) +
                10 -
                ((gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue) *
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
    [countML, oddsTypeValue]
  );

  const getBarValue = useCallback(() => {
    if (selectedAwayTeam) {
      return getSpreadAwayRatingValue(gameData, oddsTypeValue, oddsValue);
    }
    if (selectedHomeTeam) {
      return getSpreadHomeRatingValue(gameData, oddsTypeValue, oddsValue);
    }
  }, [oddsTypeValue, oddsValue]);

  useEffect(() => {
    if (oddsValue >= 200) {
      setOddsValueSymbol('>=');
    } else if (oddsValue <= -200) {
      setOddsValueSymbol('<=');
    } else {
      setOddsValueSymbol('');
    }
  }, [oddsValue]);

  useEffect(() => {
    setCountML(0);
  }, [barState]);

  useEffect(() => {
    setBarState(getBarValue() || 0);
  });

  useEffect(() => {
    if (selectedAwayTeam || (!selectedAwayTeam && !selectedHomeTeam)) {
      setOddsValue(Number(gameData?.spread_last_outcome_away));
      setOddsTypeValue(Number(gameData?.spread_last_spread_away));
    }
    if (selectedHomeTeam) {
      setOddsValue(Number(gameData?.spread_last_outcome_home));
      setOddsTypeValue(Number(gameData?.spread_last_spread_home));
    }
  }, [selectedAwayTeam, selectedHomeTeam]);

  return (
    <View style={styles.spreadView}>
      <View style={styles.spreadBarView}>
        <View style={styles.oddsBar}>
          <Text style={styles.titleText}>Points</Text>
          <View style={styles.centerBar}>
            <TouchableOpacity
              onPress={minusTypeValue}
              onLongPress={minusTypeLongValue}
              onPressOut={handlePressOut}
              disabled={!selectedAwayTeam && !selectedHomeTeam}>
              <Icon type="Feather" name="minus" style={styles.barIcon} />
            </TouchableOpacity>
            <View
              style={[
                styles.smallBar,
                !selectedAwayTeam && !selectedHomeTeam
                  ? styles.grayBar
                  : styles.blackBar,
                styles.statusBar
              ]}>
              <Text style={styles.statusText}>
                {oddsTypeValue > 0 ? `+${oddsTypeValue}` : oddsTypeValue}
              </Text>
            </View>
            <TouchableOpacity
              onPress={plusTypeValue}
              onLongPress={plusTypeLongValue}
              onPressOut={handlePressOut}
              disabled={!selectedAwayTeam && !selectedHomeTeam}>
              <Icon type="Feather" name="plus" style={styles.barIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.oddsBar}>
          <Text style={styles.titleText}>MONEY LINE</Text>
          <View style={styles.centerBar}>
            <TouchableOpacity
              onPress={minusValue}
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
                {oddsValueSymbol} {oddsValue > 0 && '+'}
                {oddsValue}
              </Text>
            </View>
            <TouchableOpacity
              onPress={plusValue}
              onLongPress={plusLongValue}
              onPressOut={handlePressOut}
              disabled={!selectedAwayTeam && !selectedHomeTeam}>
              <Icon type="Feather" name="plus" style={styles.barIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
      {/* <Ranger
          rangeValue={oddsValue}
          setRangeValue={setOddsValue}
          minimumValue={-200}
          maximumValue={200}
          disabled={!selectedAwayTeam && !selectedHomeTeam}
        /> */}
    </View>
  );
};

export default Spread;
