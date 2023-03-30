import React, { useState, useContext, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { View } from 'native-base';
import { TouchableHighlight, Vibration } from 'react-native';
import { Text } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { BetStatus, LoadingImage, BarRating, BetCalculator } from '@Components';
import { convertEST, ordinalSuffixOf } from '@Lib/utilities';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';
import {
  checkTeamIcon,
  compareScore,
  getMLBSpreadAwayRatingValue,
  getMLBSpreadHomeRatingValue,
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
  checkAwayWinWhiteCircle,
  checkSpreadPushAway,
  checkSpreadPushHome
} from '@Lib/function';
import { Svgs } from '@Theme';

import { Props } from './types';
import styles, { scale } from './styles';

const MLBWatch: React.FC<Props> = ({
  data,
  saveSelection,
  selectionState = false,
  lastGame
}) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const [pressGlass, setPressGlass] = useState(false);
  const [pressRater, setPressRater] = useState(false);

  let outs = data.outs;
  let base1 = data.runnerBase1;
  let base2 = data.runnerBase2;
  let base3 = data.runnerBase3;
  let totalScore = Number(data.away_runs) + Number(data.home_runs);

  const checkInning = () => {
    if (data.status === 'inprogress') {
      if (data.inning_half === 'T') {
        if (Number(data.outs) === 3) {
          outs = undefined;
          base1 = false;
          base2 = false;
          base3 = false;
          return ordinalSuffixOf(data.inning);
        } else if (Number(data.outs) > 3) {
          outs = undefined;
          base1 = false;
          base2 = false;
          base3 = false;
          return 'Mid ' + ordinalSuffixOf(data.inning);
        } else {
          return 'Top ' + ordinalSuffixOf(data.inning);
        }
      } else if (data.inning_half === 'B') {
        if (Number(data.outs) === 3) {
          outs = undefined;
          base1 = false;
          base2 = false;
          base3 = false;
          return ordinalSuffixOf(data.inning);
        } else if (Number(data.outs) > 3) {
          outs = undefined;
          base1 = false;
          base2 = false;
          base3 = false;
          return 'End ' + ordinalSuffixOf(data.inning);
        } else {
          return 'Bottom ' + ordinalSuffixOf(data.inning);
        }
      }
    } else if (data.status === 'closed' || data.status === 'complete') {
      base1 = false;
      base2 = false;
      base3 = false;
      return 'Final';
    } else if (data.status === 'scheduled') {
      return `${convertEST(data.gameUTCDateTime)}`;
    } else {
      return 'Delayed';
    }
  };

  const checkSpread = () => {
    if (data.status === 'closed' || data.status === 'complete') {
      const homeSpread = Number(data.run_line_last_spread_home);
      const awaySpread = Number(data.run_line_last_spread_away);
      const homeScore = Number(data.home_runs);
      const awayScore = Number(data.away_runs);
      const homeSocreDef = homeScore - awayScore;
      const awaySocreDef = awayScore - homeScore;

      if (homeSpread === 1.5) {
        if (homeSocreDef >= 1 || homeSocreDef === -1) {
          return 'home';
        }
      } else {
        if (homeSocreDef >= 2) {
          return 'home';
        }
      }
      if (awaySpread === 1.5) {
        if (awaySocreDef >= 1 || awaySocreDef === -1) {
          return 'away';
        }
      } else {
        if (awaySocreDef >= 2) {
          return 'away';
        }
      }
    }
  };

  const checkWin = () => {
    if (data.status === 'closed' || data.status === 'complete') {
      return Number(data.home_runs) > Number(data.away_runs) ? 'home' : 'away';
    }
  };

  const checkOU = () => {
    if (data.status === 'closed' || data.status === 'complete') {
      if (totalScore > Number(data.total_last_outcome_over_total)) {
        return 'away';
      }
      if (totalScore < Number(data.total_last_outcome_under_total)) {
        return 'home';
      }
      return 'same';
    }
  };

  const checkOuts = (out: string | undefined) => {
    if (out) {
      if (Number(out) > 1 || Number(out) === 0) {
        return out + ' outs';
      } else {
        return out + ' out';
      }
    } else {
      return '';
    }
  };

  const saveToSelection = () => {
    if (user && saveSelection) {
      saveSelection(data.gameID, 'mlb');
      Vibration.vibrate();
    } else {
      navigation.navigate(Routes.Watch);
    }
  };

  const openLineRater = () => {
    navigation.navigate(Routes.LineRater, { gameData: data });
  };

  const getAwaySpreadValue = () => {
    if (
      !(data?.run_line_last_outcome_away && data?.run_line_last_spread_away)
    ) {
      return undefined;
    }
    if (data.status === 'closed' || data.status === 'complete') {
      return Number(data.algRatingAwaySpread);
    }
    const rangeValue = Number(data?.run_line_last_outcome_away);
    const oddType =
      Number(data?.run_line_last_spread_away) > 0 ? 'plus' : 'minus';

    return getMLBSpreadAwayRatingValue(data, rangeValue, oddType);
  };

  const getHomeSpreadValue = () => {
    if (
      !(data?.run_line_last_outcome_home && data?.run_line_last_spread_home)
    ) {
      return undefined;
    }
    if (data.status === 'closed' || data.status === 'complete') {
      return Number(data.algRatingHomeSpread);
    }
    const rangeValue = Number(data?.run_line_last_outcome_home);
    const oddType =
      Number(data?.run_line_last_spread_home) > 0 ? 'plus' : 'minus';

    return getMLBSpreadHomeRatingValue(data, rangeValue, oddType);
  };

  useEffect(() => {
    setPressGlass(selectionState);
  }, [selectionState]);

  return (
    <View style={[styles.container, lastGame && styles.noBorder]}>
      <View style={styles.gameView}>
        <View style={styles.teamStatusView}>
          <LoadingImage
            source={checkTeamIcon('mlb', data.away_team_abbr)}
            style={styles.teamLogo}
          />
          <Text style={styles.teamNameText}>{data.away_team_abbr}</Text>
          <Text style={styles.teamRecordText}>{data.awayRecord}</Text>
        </View>
        <View style={styles.scoreView}>
          {data.status === 'inprogress' ? (
            <View style={styles.processStatus}>
              <Text style={styles.inningText}>{checkInning()}</Text>
              <Text style={styles.outsText}>{checkOuts(outs)}</Text>
            </View>
          ) : (
            <Text style={styles.finalText}>{checkInning()}</Text>
          )}
          <View style={styles.resultView}>
            <View style={styles.childLR}>
              {data.status === 'inprogress' ? (
                <Text
                  style={
                    Number(data.away_runs) > 19
                      ? styles.scoreText1_1
                      : styles.scoreText1
                  }>
                  {data.away_runs}
                </Text>
              ) : (
                <Text
                  style={
                    compareScore(data.away_runs, data.home_runs) === 'same' ||
                    compareScore(data.away_runs, data.home_runs) === 'away'
                      ? Number(data.away_runs) > 19
                        ? styles.scoreText1_1
                        : styles.scoreText1
                      : Number(data.away_runs) > 19
                      ? styles.scoreText2_2
                      : styles.scoreText2
                  }>
                  {data.away_runs}
                </Text>
              )}
            </View>
            <View style={styles.childCenter}>
              <BetStatus base1={base1} base2={base2} base3={base3} />
            </View>
            <View style={styles.childLR}>
              {data.status === 'inprogress' ? (
                <Text
                  style={
                    Number(data.home_runs) > 19
                      ? styles.scoreText1_1
                      : styles.scoreText1
                  }>
                  {data.home_runs}
                </Text>
              ) : (
                <Text
                  style={
                    compareScore(data.away_runs, data.home_runs) === 'same' ||
                    compareScore(data.away_runs, data.home_runs) === 'home'
                      ? Number(data.home_runs) > 19
                        ? styles.scoreText1_1
                        : styles.scoreText1
                      : Number(data.home_runs) > 19
                      ? styles.scoreText2_2
                      : styles.scoreText2
                  }>
                  {data.home_runs}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.teamStatusView}>
          <LoadingImage
            source={checkTeamIcon('mlb', data.home_team_abbr)}
            style={styles.teamLogo}
          />
          <Text style={styles.teamNameText}>{data.home_team_abbr}</Text>
          <Text style={styles.teamRecordText}>{data.homeRecord}</Text>
        </View>
      </View>
      <View style={styles.betValueView}>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getAwaySpreadValue()}
              status={data.status}
              outCome={checkSpread() === 'away'}
              pushScore={checkSpreadPushAway(data)}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkAwaySpreadWhiteCircle(data)}
            />
            <BetCalculator
              outCome={checkSpread() === 'away'}
              matchType="away"
              value1={data.run_line_last_spread_away}
              value2={data.run_line_last_outcome_away}
              status={data.status}
              rating={getAwaySpreadValue()}
              points={data.home_runs || data.away_runs}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>Spread</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkSpread() === 'home'}
              matchType="home"
              value1={data.run_line_last_spread_home}
              value2={data.run_line_last_outcome_home}
              status={data.status}
              rating={getHomeSpreadValue()}
              points={data.home_runs || data.away_runs}
            />
            <BarRating
              value={getHomeSpreadValue()}
              status={data.status}
              outCome={checkSpread() === 'home'}
              pushScore={checkSpreadPushHome(data)}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkHomeSpreadWhiteCircle(data)}
            />
          </View>
        </View>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getAwayWinValue(data)}
              status={data.status}
              outCome={checkWin() === 'away'}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkAwayWinWhiteCircle(data)}
            />
            <BetCalculator
              outCome={checkWin() === 'away'}
              matchType="away"
              value1=""
              value2={data.moneyline_last_outcome_away}
              status={data.status}
              rating={getAwayWinValue(data)}
              points={data.home_runs || data.away_runs}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>Win</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkWin() === 'home'}
              matchType="home"
              value1=""
              value2={data.moneyline_last_outcome_home}
              status={data.status}
              rating={getHomeWinValue(data)}
              points={data.home_runs || data.away_runs}
            />
            <BarRating
              value={getHomeWinValue(data)}
              status={data.status}
              outCome={checkWin() === 'home'}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkHomeWinWhiteCircle(data)}
            />
          </View>
        </View>
        <View style={styles.betRow}>
          <View style={styles.ratingRow}>
            <BarRating
              value={getOverRating(data)}
              status={data.status}
              outCome={checkOU() === 'away'}
              pushScore={checkOU()}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkOverWhiteCircle(data)}
            />
            <BetCalculator
              outCome={checkOU() === 'away'}
              matchType="away"
              value1={data.total_last_outcome_under_total}
              value2={data.total_last_outcome_under_odds}
              status={data.status}
              rating={getOverRating(data)}
              valueType="OU"
              points={data.home_runs || data.away_runs}
            />
          </View>
          <View style={styles.betTitleView}>
            <Text style={styles.betTitleText}>O/U</Text>
          </View>
          <View style={styles.ratingRow}>
            <BetCalculator
              outCome={checkOU() === 'home'}
              matchType="home"
              value1={data.total_last_outcome_over_total}
              value2={data.total_last_outcome_over_odds}
              status={data.status}
              rating={getUnderRating(data)}
              points={data.home_runs || data.away_runs}
              valueType="OU"
            />
            <BarRating
              value={getUnderRating(data)}
              status={data.status}
              outCome={checkOU() === 'home'}
              pushScore={checkOU()}
              points={data.home_runs || data.away_runs}
              whiteCircle={checkUnderWhiteCircle(data)}
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
                  <Text style={styles.betMatchBtnText}>WATCHING</Text>
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
                  <Text style={styles.betMatchBtnText}>LINEMASTER</Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default MLBWatch;
