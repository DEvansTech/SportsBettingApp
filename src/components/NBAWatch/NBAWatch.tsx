import React, { useState, useContext, useEffect } from 'react';
import { TouchableHighlight, Vibration } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { View, Text } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { BarRating, BetCalculator, LoadingImage } from '@Components';
import { convertEST, ordinalSuffixOf } from '@Lib/utilities';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Svgs } from '@Theme';
import { Routes } from '@Navigators/routes';
import {
  checkTeamIcon,
  compareScore,
  checkSpread,
  checkSpreadPushHome,
  checkSpreadPushAway,
  checkOU,
  checkWin,
  getAwaySpreadValue,
  getHomeSpreadValue,
  checkWinPush,
  getAwayWinValue,
  getHomeWinValue,
  getOverRating,
  getUnderRating,
  checkLineMasterState,
  checkAwaySpreadWhiteCircle,
  checkHomeSpreadWhiteCircle,
  checkOverWhiteCircle,
  checkUnderWhiteCircle,
  checkHomeWinWhiteCircle,
  checkAwayWinWhiteCircle
} from '@Lib/function';

import { Props } from './types';
import styles, { scale } from './styles';

const NBAWatch: React.FC<Props> = ({
  data,
  saveSelection,
  selectionState = false,
  lastGame
}) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const [pressGlass, setPressGlass] = useState(false);
  const [pressRater, setPressRater] = useState(false);

  const checkPeriod = () => {
    if (!checkStatus() && data.period) {
      if (Number(data.period) > 4) return 'Overtime';
      return `${ordinalSuffixOf(data.period)} Quarter`;
    }
  };

  const checkStatus = () => {
    if (
      (data.status === 'closed' || data.status === 'complete') &&
      data.away_points &&
      data.home_points
    ) {
      return 'Final';
    } else if (
      data.status === 'halftime' ||
      (Number(data.period) === 2 && data.clock === '00:00')
    ) {
      return 'Halftime';
    } else if (data.status === 'delayed') {
      return 'Delayed';
    } else if (data.status === 'postponed') {
      return 'Postponed';
    }
  };

  const checkClock = () => {
    if (!checkStatus()) {
      if (Number(data.period) === 2 && data.clock === '00:00') return;
      if (
        data.status === 'inprogress' ||
        (data.home_points && data.away_points && data.period && data.clock)
      ) {
        return data.clock;
      } else {
        return `${convertEST(data.gameUTCDateTime)}`;
      }
    }
  };

  const saveToSelection = () => {
    if (user && saveSelection) {
      saveSelection(data.gameID, 'nba');
      Vibration.vibrate();
    } else {
      navigation.navigate(Routes.Watch);
    }
  };

  const openLineRater = () => {
    navigation.navigate(Routes.LineRater, { gameData: data });
  };

  useEffect(() => {
    setPressGlass(selectionState);
  }, [selectionState]);

  return (
    <View style={[styles.container, lastGame && styles.noBorder]}>
      <View style={styles.gameView}>
        <View style={styles.teamStatusView}>
          <LoadingImage
            source={checkTeamIcon('nba', data.away_team_abbr)}
            style={styles.teamLogo}
            type="svg"
          />
          <Text style={styles.teamNameText}>{data.away_team_abbr}</Text>
          <Text style={styles.teamRecordText}>{data.awayRecord}</Text>
        </View>
        <View style={styles.scoreView}>
          {checkPeriod() && (
            <View style={styles.processStatus}>
              <Text style={styles.inningText}>{checkPeriod()}</Text>
            </View>
          )}
          {checkStatus() && (
            <View style={styles.processStatus}>
              <Text style={styles.finalText}>{checkStatus()}</Text>
            </View>
          )}
          <View style={styles.processStatus}>
            <Text style={!checkPeriod() ? styles.finalText : styles.clockText}>
              {checkClock()}
            </Text>
          </View>
          <View style={styles.resultView}>
            <View style={styles.childLR}>
              {checkStatus() ? (
                <Text
                  style={
                    compareScore(data.away_points, data.home_points) ===
                      'same' ||
                    compareScore(data.away_points, data.home_points) === 'away'
                      ? styles.scoreText1
                      : styles.scoreText2
                  }>
                  {data.away_points}
                </Text>
              ) : (
                <Text style={styles.scoreText1}>{data.away_points}</Text>
              )}
            </View>
            <View style={styles.childLR}>
              {checkStatus() ? (
                <Text
                  style={
                    compareScore(data.away_points, data.home_points) ===
                      'same' ||
                    compareScore(data.away_points, data.home_points) === 'home'
                      ? styles.scoreText1
                      : styles.scoreText2
                  }>
                  {data.home_points}
                </Text>
              ) : (
                <Text style={styles.scoreText1}>{data.home_points}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.teamStatusView}>
          <LoadingImage
            source={checkTeamIcon('nba', data.home_team_abbr)}
            style={styles.teamLogo}
            type="svg"
          />
          <Text style={styles.teamNameText}>{data.home_team_abbr}</Text>
          <Text style={styles.teamRecordText}>{data.homeRecord}</Text>
        </View>
      </View>
      <View style={styles.betValueView}>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getAwaySpreadValue(data)}
              status={data.status}
              outCome={checkSpread(data) === 'away'}
              pushScore={checkSpreadPushAway(data)}
              points={data.home_points || data.away_points}
              whiteCircle={checkAwaySpreadWhiteCircle(data)}
            />
            <BetCalculator
              outCome={checkSpread(data) === 'away'}
              matchType="away"
              value1={data.spread_last_spread_away}
              value2={data.spread_last_outcome_away}
              status={data.status}
              rating={getAwaySpreadValue(data)}
              points={data.home_points || data.away_points}
              pushScore={checkSpreadPushAway(data)}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>Spread</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkSpread(data) === 'home'}
              matchType="home"
              value1={data.spread_last_spread_home}
              value2={data.spread_last_outcome_home}
              status={data.status}
              rating={getHomeSpreadValue(data)}
              points={data.home_points || data.away_points}
              pushScore={checkSpreadPushHome(data)}
            />
            <BarRating
              value={getHomeSpreadValue(data)}
              status={data.status}
              outCome={checkSpread(data) === 'home'}
              pushScore={checkSpreadPushHome(data)}
              points={data.home_points || data.away_points}
              whiteCircle={checkHomeSpreadWhiteCircle(data)}
            />
          </View>
        </View>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getAwayWinValue(data)}
              status={data.status}
              pushScore={checkWinPush(data)}
              outCome={checkWin(data) === 'away'}
              points={data.home_points || data.away_points}
              whiteCircle={checkAwayWinWhiteCircle(data)}
            />
            <BetCalculator
              outCome={checkWin(data) === 'away'}
              matchType="away"
              value1=""
              value2={data.moneyline_last_outcome_away}
              status={data.status}
              rating={getAwayWinValue(data)}
              points={data.home_points || data.away_points}
              pushScore={checkWinPush(data)}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>Win</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkWin(data) === 'home'}
              matchType="home"
              value1=""
              value2={data.moneyline_last_outcome_home}
              status={data.status}
              rating={getHomeWinValue(data)}
              pushScore={checkWinPush(data)}
              points={data.home_points || data.away_points}
            />
            <BarRating
              value={getHomeWinValue(data)}
              status={data.status}
              pushScore={checkWinPush(data)}
              outCome={checkWin(data) === 'home'}
              whiteCircle={checkHomeWinWhiteCircle(data)}
              points={data.home_points || data.away_points}
            />
          </View>
        </View>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getOverRating(data)}
              status={data.status}
              outCome={checkOU(data) === 'away'}
              pushScore={checkOU(data)}
              whiteCircle={checkOverWhiteCircle(data)}
              points={data.home_points || data.away_points}
            />
            <BetCalculator
              outCome={checkOU(data) === 'away'}
              matchType="away"
              value1={data.total_last_outcome_under_total}
              value2={data.total_last_outcome_under_odds}
              status={data.status}
              rating={getOverRating(data)}
              valueType="OU"
              points={data.home_points || data.away_points}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>O/U</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkOU(data) === 'home'}
              matchType="home"
              value1={data.total_last_outcome_over_total}
              value2={data.total_last_outcome_over_odds}
              status={data.status}
              rating={getUnderRating(data)}
              valueType="OU"
              points={data.home_points || data.away_points}
            />
            <BarRating
              value={getUnderRating(data)}
              status={data.status}
              outCome={checkOU(data) === 'home'}
              pushScore={checkOU(data)}
              whiteCircle={checkUnderWhiteCircle(data)}
              points={data.home_points || data.away_points}
            />
          </View>
        </View>
        {data.status !== 'closed' && data.status !== 'complete' && (
          <View style={styles.watchBtns}>
            {saveSelection && (
              <TouchableHighlight
                underlayColor="transparent"
                onShowUnderlay={() => setPressGlass(true)}
                onHideUnderlay={() => setPressGlass(!selectionState)}
                onPress={saveToSelection}>
                <View style={styles.betMatchWatch}>
                  <SvgXml
                    xml={pressGlass ? Svgs.glassGreenIcon : Svgs.watchIcon}
                    width={40 * scale}
                    height={35 * scale}
                  />
                  <Text
                    style={[
                      styles.betMatchBtnText,
                      pressGlass && styles.betMatchBtnGreenText
                    ]}>
                    {pressGlass ? 'WATCHING' : 'WATCH'}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            {checkLineMasterState(data) && (
              <TouchableHighlight
                underlayColor="transparent"
                onShowUnderlay={() => setPressRater(true)}
                onHideUnderlay={() => setPressRater(false)}
                onPress={openLineRater}>
                <View style={styles.betMatchWatch}>
                  <SvgXml
                    xml={
                      pressRater
                        ? Svgs.lineRaterGreenIcon
                        : Svgs.lineRaterBlackIcon
                    }
                    width={35 * scale}
                    height={35 * scale}
                  />
                  <Text
                    style={[
                      styles.betMatchBtnText,
                      pressRater && styles.betMatchBtnGreenText
                    ]}>
                    LINEMASTER
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default NBAWatch;
