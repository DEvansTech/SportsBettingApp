import React, { useCallback, useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { getUnderRatingValue, getOverRatingValue } from '@Lib/function';
import { Svgs } from '@Theme';
import { OUProps } from './types';
import styles, { scale, deviceWidth } from './styles';

const OverUnder: React.FC<OUProps> = ({ gameData }) => {
  const [ovRangeValue, setOvRangeValue] = useState(0);
  const [unRangeValue, setUnRangeValue] = useState(0);
  const [selectOver, setSelectOver] = useState(true);
  const [selectUnder, setSelectUnder] = useState(false);
  const [totalScore, setTotalScore] = useState(
    Number(gameData.total_last_total)
  );
  const [countML, setCountML] = useState(0);
  const changeTimer: React.MutableRefObject<any> = useRef(null);

  const plusRange = (state: string, team: string) => {
    if (state === 'ou') {
      if (team === 'over') {
        setSelectOver(true);
        setSelectUnder(false);
      }
      if (team === 'under') {
        setSelectOver(false);
        setSelectUnder(true);
      }
      if (selectOver) {
        if (ovRangeValue >= 200) {
          setOvRangeValue(200);
          return;
        }

        if (ovRangeValue + 5 > -99 && ovRangeValue + 5 < 99) {
          setOvRangeValue(100);
          setCountML(countML + 1);
          return;
        }
        setOvRangeValue(ovRangeValue + 5);
        setCountML(countML + 1);
      }

      if (selectUnder) {
        if (unRangeValue >= 200) {
          setUnRangeValue(200);
        }
        if (unRangeValue + 5 > -99 && unRangeValue + 5 < 99) {
          setUnRangeValue(100);
          setCountML(countML + 1);
          return;
        }
        setUnRangeValue(unRangeValue + 5);
        setCountML(countML + 1);
      }
    } else {
      setTotalScore(totalScore + 0.5);
    }
  };

  const plusLongRange = (state: string, team: string) => {
    const past = Date.now();
    const rate = 500;
    if (state === 'ou') {
      if (team === 'over') {
        setSelectOver(true);
        setSelectUnder(false);
      }
      if (team === 'under') {
        setSelectOver(false);
        setSelectUnder(true);
      }

      if (selectOver) {
        changeTimer.current = setInterval(() => {
          const diff = Math.floor((Date.now() - past) / rate);
          setOvRangeValue(prev => {
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
      }

      if (selectUnder) {
        changeTimer.current = setInterval(() => {
          const diff = Math.floor((Date.now() - past) / rate);
          setUnRangeValue(prev => {
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
      }
    } else {
      changeTimer.current = setInterval(() => {
        const diff = Math.floor((Date.now() - past) / rate);
        setTotalScore(prev => {
          return prev + (1 + diff);
        });
      }, 100);
    }
  };

  const minusRange = (state: string, team: string | undefined) => {
    if (state === 'ou') {
      if (team === 'over') {
        setSelectOver(true);
        setSelectUnder(false);
      }
      if (team === 'under') {
        setSelectOver(false);
        setSelectUnder(true);
      }
      if (selectOver) {
        if (ovRangeValue <= -200) {
          setOvRangeValue(-200);
        }
        if (ovRangeValue - 5 < 99 && ovRangeValue - 5 > -99) {
          setOvRangeValue(-100);
          setCountML(countML - 1);
          return;
        }
        setOvRangeValue(ovRangeValue - 5);
        setCountML(countML - 1);
      }
      if (selectUnder) {
        if (unRangeValue <= -200) {
          setUnRangeValue(-200);
        }
        if (unRangeValue - 5 < 99 && unRangeValue - 5 > -99) {
          setUnRangeValue(-100);
          setCountML(countML - 1);
          return;
        }
        setUnRangeValue(unRangeValue - 5);
        setCountML(countML - 1);
      }
    } else {
      if (totalScore <= 0) {
        setTotalScore(0);
      } else {
        setTotalScore(totalScore - 0.5);
      }
    }
  };

  const minusLongRange = (state: string, team: string) => {
    const past = Date.now();
    const rate = 500;
    if (state === 'ou') {
      if (team === 'over') {
        setSelectOver(true);
        setSelectUnder(false);
      }
      if (team === 'under') {
        setSelectOver(false);
        setSelectUnder(true);
      }

      if (selectOver) {
        changeTimer.current = setInterval(() => {
          const diff = Math.floor((Date.now() - past) / rate);
          setOvRangeValue(prev => {
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
      }

      if (selectUnder) {
        changeTimer.current = setInterval(() => {
          const diff = Math.floor((Date.now() - past) / rate);
          setUnRangeValue(prev => {
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
      }
    } else {
      changeTimer.current = setInterval(() => {
        const diff = Math.floor((Date.now() - past) / rate);
        setTotalScore(prev => {
          if (prev <= 0) {
            return 0;
          }
          return prev - (1 + diff);
        });
      }, 100);
    }
  };

  const handlePressOut = () => {
    clearInterval(changeTimer.current);
    changeTimer.current = null;
  };

  const selectOverBar = () => {
    setSelectOver(true);
    setSelectUnder(false);
  };

  const selectUnderBar = () => {
    setSelectOver(false);
    setSelectUnder(true);
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
          if (selectOver) {
            result =
              ((gameData?.algRatingCalcYellowOver || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore)) /
              10;
          }
          if (selectUnder) {
            result =
              ((gameData?.algRatingCalcYellowUnder || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore) * -1) /
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

          if (selectOver) {
            result =
              ((gameData?.algRatingCalcGreenOver || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore)) /
              ((gameData?.algRatingCalcGreenOver || 0) -
                (gameData?.algRatingCalcYellowOver || 0));
          }
          if (selectUnder) {
            result =
              ((gameData?.algRatingCalcGreenUnder || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore) * -1) /
              ((gameData?.algRatingCalcGreenUnder || 0) -
                (gameData?.algRatingCalcYellowUnder || 0));
          }

          result -= countML * 0.02;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 3:
          startBar = 2 * basic;
          endBar = 3 * basic - 34 * scale;

          if (selectOver) {
            result =
              ((gameData?.algRatingCalcSuperOver || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore)) /
              ((gameData?.algRatingCalcSuperOver || 0) -
                (gameData?.algRatingCalcGreenOver || 0));
          }
          if (selectUnder) {
            result =
              ((gameData?.algRatingCalcSuperUnder || 0) -
                ((gameData?.algRatingPredTotal || 0) - totalScore) * -1) /
              ((gameData?.algRatingCalcSuperUnder || 0) -
                (gameData?.algRatingCalcGreenUnder || 0));
          }

          result -= countML * 0.02;

          if (result <= 0) return endBar;
          if (result >= 1) return startBar;
          if (startBar + basic * (1 - result) >= endBar) return endBar;

          return startBar + basic * (1 - result);
        case 4:
          startBar = 3 * basic;
          endBar = 4 * basic - 34 * scale;

          if (selectOver) {
            result =
              ((gameData?.algRatingCalcSuperOver || 0) +
                10 -
                ((gameData?.algRatingPredTotal || 0) - totalScore)) /
              10;
          }
          if (selectUnder) {
            result =
              ((gameData?.algRatingCalcSuperUnder || 0) +
                10 -
                ((gameData?.algRatingPredTotal || 0) - totalScore) * -1) /
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
    [countML, totalScore, selectOver, selectUnder]
  );

  const getBarValue = useCallback(() => {
    if (selectOver) {
      return getOverRatingValue(gameData, totalScore, ovRangeValue);
    }
    if (selectUnder) {
      return getUnderRatingValue(gameData, totalScore, unRangeValue);
    }
  }, [unRangeValue, totalScore, selectUnder, selectOver]);

  useEffect(() => {
    setOvRangeValue(Number(gameData?.total_last_outcome_over_odds));
    setUnRangeValue(Number(gameData?.total_last_outcome_under_odds));
  }, [selectOver, selectUnder]);

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
      <View style={styles.overUnderBar}>
        <View style={styles.totalBarView}>
          <Text style={[styles.titleText, styles.overBarText]}>Total</Text>
          <View style={styles.leftBar}>
            <TouchableOpacity
              onPress={() => minusRange('total', '')}
              onLongPress={() => minusLongRange('total', '')}
              onPressOut={handlePressOut}>
              <Icon type="Feather" name="minus" style={styles.barIcon} />
            </TouchableOpacity>
            <View
              style={[styles.statusBar, styles.overTotalBar, styles.blackBar]}>
              <Text style={styles.statusText}>{totalScore}</Text>
            </View>
            <TouchableOpacity
              onPress={() => plusRange('total', '')}
              onLongPress={() => plusLongRange('total', '')}
              onPressOut={handlePressOut}>
              <Icon type="Feather" name="plus" style={styles.barIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overBarView}>
          <Text style={[styles.titleText, styles.overBarText]}>Over</Text>
          <View style={styles.rightBar}>
            <TouchableOpacity
              onPress={() => minusRange('ou', 'over')}
              onLongPress={() => minusLongRange('ou', 'over')}
              onPressOut={handlePressOut}>
              <Icon type="Feather" name="minus" style={styles.barIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusBar,
                styles.overValueBar,
                selectOver ? styles.blackBar : styles.lightGrayBar
              ]}
              onPress={selectOverBar}>
              <Text style={styles.statusText}>
                {ovRangeValue > 0 ? `+${ovRangeValue}` : ovRangeValue}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => plusRange('ou', 'over')}
              onLongPress={() => plusLongRange('ou', 'over')}
              onPressOut={handlePressOut}>
              <Icon type="Feather" name="plus" style={styles.barIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.overBarView}>
        <View style={styles.rightBar}>
          <TouchableOpacity
            onPress={() => minusRange('ou', 'under')}
            onLongPress={() => minusLongRange('ou', 'under')}
            onPressOut={handlePressOut}>
            <Icon type="Feather" name="minus" style={styles.barIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusBar,
              styles.overValueBar,
              selectUnder ? styles.blackBar : styles.lightGrayBar
            ]}
            onPress={selectUnderBar}>
            <Text style={styles.statusText}>
              {unRangeValue > 0 ? `+${unRangeValue}` : unRangeValue}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => plusRange('ou', 'under')}
            onLongPress={() => plusLongRange('ou', 'under')}
            onPressOut={handlePressOut}>
            <Icon type="Feather" name="plus" style={styles.barIcon} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.titleText, styles.underBarText]}>Under</Text>
      </View>
      <Text style={styles.description}>
        Tap team logo for odds. Tap +/- to input lines and see movement. Press
        and hold +/- for faster advance.
      </Text>
    </View>
  );
};

export default OverUnder;
