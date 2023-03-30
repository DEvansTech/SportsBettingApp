import { Dimensions, PixelRatio } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Toast } from 'native-base';
import { Images } from '@Theme';
import { getTeamLogo, GameDataType } from '@Store/types';

export const ToastMessage = (msg: string, type: any, position: any) => {
  return Toast.show({
    text: msg,
    buttonText: 'Okay',
    type: type,
    position: position,
    duration: 3000
  });
};

export const existUser = async (email: string | undefined) => {
  try {
    return await firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          return true;
        } else {
          return false;
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const responseFontSize = (
  value: string,
  width: number,
  defaultValue: number
) => {
  const deviceWidth = Dimensions.get('window').width;
  const screenWidth = deviceWidth * width;
  const elemWidth = value.length;
  const expectValue = PixelRatio.roundToNearestPixel(screenWidth / elemWidth);
  const resultValue = expectValue > defaultValue ? defaultValue : expectValue;
  return resultValue;
};

export const checkTeamIcon = (
  sportName: string | undefined,
  teamName: string | undefined
) => {
  switch (sportName?.trim()) {
    case 'mlb':
    case 'MLB':
      if (`MLB_${teamName}` in Images) {
        return getTeamLogo(Images)(`MLB_${teamName}` as any);
      } else {
        return getTeamLogo(Images)(`MLB_Empty` as any);
      }
    case 'nfl':
    case 'NFL':
      if (`NFL_${teamName}` in Images) {
        return getTeamLogo(Images)(`NFL_${teamName}` as any);
      } else {
        return getTeamLogo(Images)(`NFL_Empty` as any);
      }
    case 'ncaafb':
    case 'NCAAFB':
      if (`NCAA_${teamName}` in Images) {
        return getTeamLogo(Images)(`NCAA_${teamName}` as any);
      } else {
        return getTeamLogo(Images)(`NCAA_helmet.svg` as any);
      }
    case 'ncaab':
    case 'NCAAM':
      if (`NCAA_${teamName}` in Images) {
        return getTeamLogo(Images)(`NCAA_${teamName}` as any);
      } else {
        return getTeamLogo(Images)(`NCAA_Generic.png` as any);
      }
    case 'nba':
    case 'NBA':
      if (`NBA_${teamName}` in Images) {
        return getTeamLogo(Images)(`NBA_${teamName}` as any);
      } else {
        return getTeamLogo(Images)(`NBA_Empty_Logo` as any);
      }
    default:
      return;
  }
};

export const compareScore = (
  awayPoints: string | undefined,
  homePoints: string | undefined
) => {
  if (Number(awayPoints) === Number(homePoints)) {
    return 'same';
  }
  if (Number(awayPoints) > Number(homePoints)) {
    return 'away';
  } else {
    return 'home';
  }
};

export const checkSpread = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    const homeSpread = Number(data.spread_last_spread_home);
    const awaySpread = Number(data.spread_last_spread_away);
    const homeScore = Number(data.home_points);
    const awayScore = Number(data.away_points);
    const homeSocreDef = homeScore - awayScore;
    const awaySocreDef = awayScore - homeScore;

    if (homeSpread > 0) {
      if (homeSocreDef >= 0) return 'home';
      if (homeSocreDef < 0) {
        if (Math.abs(homeSocreDef) <= homeSpread) return 'home';
      }
    } else {
      if (homeSocreDef >= Math.abs(homeSpread)) return 'home';
    }
    if (awaySpread > 0) {
      if (awaySocreDef >= 0) return 'away';
      if (awaySocreDef < 0) {
        if (Math.abs(awaySocreDef) <= awaySpread) return 'away';
      }
    } else {
      if (awaySocreDef >= Math.abs(awaySpread)) return 'away';
    }
  }
};

export const checkSpreadPushHome = (data: GameDataType) => {
  if (data.sport_name === 'MLB') {
    if (data.status === 'closed' || data.status === 'complete') {
      if (
        Number(data.home_runs) -
          Number(data.away_runs) +
          Math.abs(Number(data.run_line_last_spread_home)) ===
        0
      )
        return 'same';
    }
    return '';
  }

  if (data.status === 'closed' || data.status === 'complete') {
    if (
      Number(data.home_points) -
        Number(data.away_points) +
        Number(data.spread_last_spread_home) ===
      0
    )
      return 'same';
  }
  return '';
};

export const checkSpreadPushAway = (data: GameDataType) => {
  if (data.sport_name === 'MLB') {
    if (data.status === 'closed' || data.status === 'complete') {
      if (
        Number(data.away_runs) -
          Number(data.home_runs) +
          Math.abs(Number(data.run_line_last_spread_away)) ===
        0
      )
        return 'same';
    }
    return '';
  }

  if (data.status === 'closed' || data.status === 'complete') {
    if (
      Number(data.away_points) -
        Number(data.home_points) +
        Number(data.spread_last_spread_away) ===
      0
    )
      return 'same';
  }
  return '';
};

export const checkWinPush = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (Number(data.home_points) === Number(data.away_points)) return 'same';
  }
  return '';
};

export const checkOU = (data: GameDataType) => {
  let totalScore = Number(data.away_points) + Number(data.home_points);
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

export const checkWin = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    return Number(data.home_points) > Number(data.away_points)
      ? 'home'
      : 'away';
  }
};

export const getSpreadAwayRatingValue = (
  gameData: GameDataType,
  oddsTypeValue: number,
  oddsValue: number
) => {
  if (
    (gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcYellowSpreadAway || 0) * -1 &&
    (gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue >
      (gameData?.algRatingCalcGreenSpreadAway || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcGreenSpreadAway || 0) * -1 &&
    (gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue >
      (gameData?.algRatingCalcSuperSpreadAway || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 3;

  if (
    (gameData?.algRatingPredAwaySpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcSuperSpreadAway || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 4;
  return 1;
};

export const getSpreadHomeRatingValue = (
  gameData: GameDataType,
  oddsTypeValue: number,
  oddsValue: number
) => {
  if (
    (gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcYellowSpread || 0) * -1 &&
    (gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue >
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 2;

  if (
    (gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    (gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue >
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 3;

  if (
    (gameData?.algRatingPredHomeSpread || 0) - oddsTypeValue <=
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    oddsValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 4;

  return 1;
};

export const getMLBSpreadAwayRatingValue = (
  gameData: GameDataType,
  rangeValue: number,
  oddType: string
) => {
  let LINE = oddType === 'plus' ? 1.5 : -1.5;

  if (
    !(
      gameData?.algRatingPredAwaySpread ||
      gameData?.algRatingCalcYellowSpread ||
      gameData?.algRatingMoneySpread ||
      gameData?.algRatingCalcGreenSpread ||
      gameData?.algRatingCalcSuperSpread
    )
  )
    return undefined;
  if (
    (gameData?.algRatingPredAwaySpread || 0) - LINE <=
      (gameData?.algRatingCalcYellowSpread || 0) * -1 &&
    (gameData?.algRatingPredAwaySpread || 0) - LINE >
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredAwaySpread || 0) - LINE <=
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    (gameData?.algRatingPredAwaySpread || 0) - LINE >
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredAwaySpread || 0) - LINE <=
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 4;
  return 1;
};

export const getMLBSpreadHomeRatingValue = (
  gameData: GameDataType,
  rangeValue: number,
  oddType: string
) => {
  let LINE = oddType === 'plus' ? 1.5 : -1.5;
  if (
    !(
      gameData?.algRatingPredHomeSpread ||
      gameData?.algRatingCalcYellowSpread ||
      gameData?.algRatingMoneySpread ||
      gameData?.algRatingCalcGreenSpread ||
      gameData?.algRatingCalcSuperSpread
    )
  )
    return undefined;
  if (
    (gameData?.algRatingPredHomeSpread || 0) - LINE <=
      (gameData?.algRatingCalcYellowSpread || 0) * -1 &&
    (gameData?.algRatingPredHomeSpread || 0) - LINE >
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredHomeSpread || 0) - LINE <=
      (gameData?.algRatingCalcGreenSpread || 0) * -1 &&
    (gameData?.algRatingPredHomeSpread || 0) - LINE >
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredHomeSpread || 0) - LINE <=
      (gameData?.algRatingCalcSuperSpread || 0) * -1 &&
    rangeValue >= (gameData?.algRatingMoneySpread || 0)
  )
    return 4;
  return 1;
};

export const getAwaySpreadValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (!data.algRatingAwaySpread) {
      return undefined;
    }
    return Number(data.algRatingAwaySpread);
  }

  const oddsTypeValue = Number(data?.spread_last_spread_away);
  const oddsValue = Number(data?.spread_last_outcome_away);

  return getSpreadAwayRatingValue(data, oddsTypeValue, oddsValue);
};

export const getHomeSpreadValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (!data.algRatingHomeSpread) {
      return undefined;
    }
    return Number(data.algRatingHomeSpread);
  }

  const oddsTypeValue = Number(data?.spread_last_spread_home);
  const oddsValue = Number(data?.spread_last_outcome_home);

  return getSpreadHomeRatingValue(data, oddsTypeValue, oddsValue);
};

export const getWinAwayRatingValue = (
  gameData: GameDataType,
  rangeValue: number
) => {
  if (
    (gameData?.algRatingPredAwaySpread || 0) * -1 >=
      (gameData?.algRatingCalcYellowWinAway || 0) &&
    (gameData?.algRatingPredAwaySpread || 0) * -1 <
      (gameData?.algRatingCalcGreenWinAway || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredAwaySpread || 0) * -1 >=
      (gameData?.algRatingCalcGreenWinAway || 0) &&
    (gameData?.algRatingPredAwaySpread || 0) * -1 <
      (gameData?.algRatingCalcSuperWinAway || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredAwaySpread || 0) * -1 >=
      (gameData?.algRatingCalcSuperWinAway || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 4;
  return 1;
};

export const getWinHomeRatingValue = (
  gameData: GameDataType,
  rangeValue: number
) => {
  if (
    (gameData?.algRatingPredHomeSpread || 0) * -1 >=
      (gameData?.algRatingCalcYellowWin || 0) &&
    (gameData?.algRatingPredHomeSpread || 0) * -1 <
      (gameData?.algRatingCalcGreenWin || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 2;

  if (
    (gameData?.algRatingPredHomeSpread || 0) * -1 >=
      (gameData?.algRatingCalcGreenWin || 0) &&
    (gameData?.algRatingPredHomeSpread || 0) * -1 <
      (gameData?.algRatingCalcSuperWin || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredHomeSpread || 0) * -1 >=
      (gameData?.algRatingCalcSuperWin || 0) &&
    rangeValue >= (gameData?.algRatingMoneyWin || 0)
  )
    return 4;
  return 1;
};

export const getAwayWinValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (!data.algRatingAwayWin) {
      return undefined;
    }
    return Number(data.algRatingAwayWin);
  }

  const rangleValue = Number(data?.moneyline_last_outcome_away);
  return getWinAwayRatingValue(data, rangleValue);
};

export const getHomeWinValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (!data.algRatingHomeWin) {
      return undefined;
    }
    return Number(data.algRatingHomeWin);
  }

  const rangleValue = Number(data?.moneyline_last_outcome_home);
  return getWinHomeRatingValue(data, rangleValue);
};

export const getOverRatingValue = (
  gameData: GameDataType,
  totalScore: number,
  ovRangeValue: number
) => {
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore >=
      (gameData?.algRatingCalcYellowOver || 0) &&
    (gameData?.algRatingPredTotal || 0) - totalScore <
      (gameData?.algRatingCalcGreenOver || 0) &&
    ovRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore >=
      (gameData?.algRatingCalcGreenOver || 0) &&
    (gameData?.algRatingPredTotal || 0) - totalScore <
      (gameData?.algRatingCalcSuperOver || 0) &&
    ovRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore >=
      (gameData?.algRatingCalcSuperOver || 0) &&
    ovRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 4;
  return 1;
};

export const getUnderRatingValue = (
  gameData: GameDataType,
  totalScore: number,
  unRangeValue: number
) => {
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore <=
      (gameData?.algRatingCalcYellowUnder || 0) * -1 &&
    (gameData?.algRatingPredTotal || 0) - totalScore >
      (gameData?.algRatingCalcGreenUnder || 0) * -1 &&
    unRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 2;
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore <=
      (gameData?.algRatingCalcGreenUnder || 0) * -1 &&
    (gameData?.algRatingPredTotal || 0) - totalScore >
      (gameData?.algRatingCalcSuperUnder || 0) * -1 &&
    unRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 3;
  if (
    (gameData?.algRatingPredTotal || 0) - totalScore <=
      (gameData?.algRatingCalcSuperUnder || 0) * -1 &&
    unRangeValue >= (gameData?.algRatingMoneyTotal || 0)
  )
    return 4;
  return 1;
};

export const getOverRating = (gameData: GameDataType) => {
  if (gameData.status === 'closed' || gameData.status === 'complete') {
    if (!gameData.algRatingOver) {
      return undefined;
    }
    return Number(gameData.algRatingOver);
  }

  const ovRangeValue = Number(gameData?.total_last_outcome_over_odds);
  const totalScore = Number(gameData.total_last_total);
  return getOverRatingValue(gameData, totalScore, ovRangeValue);
};

export const getUnderRating = (gameData: GameDataType) => {
  if (gameData.status === 'closed' || gameData.status === 'complete') {
    if (!gameData.algRatingUnder) {
      return undefined;
    }
    return Number(gameData.algRatingUnder);
  }

  const unRangeValue = Number(gameData?.total_last_outcome_under_odds);
  const totalScore = Number(gameData.total_last_total);
  return getUnderRatingValue(gameData, totalScore, unRangeValue);
};

export const checkLineMasterState = (data: GameDataType) => {
  return (
    data.algRatingAwaySpread ||
    data.algRatingHomeSpread ||
    data.algRatingAwayWin ||
    data.algRatingHomeWin ||
    data.algRatingOver ||
    data.algRatingUnder
  );
};

export const checkAwaySpreadWhiteCircle = (data: GameDataType) => {
  if (data.sport_name === 'MLB') {
    if (
      Number(data?.algRatingPredAwaySpread) <
      Number(data.run_line_last_spread_away)
    ) {
      return true;
    }
    return false;
  }

  if (
    Number(data?.algRatingPredAwaySpread) < Number(data.spread_last_spread_away)
  ) {
    return true;
  }
  return false;
};

export const checkHomeSpreadWhiteCircle = (data: GameDataType) => {
  if (data.sport_name === 'MLB') {
    if (
      Number(data?.algRatingPredHomeSpread) <
      Number(data.run_line_last_spread_home)
    ) {
      return true;
    }
    return false;
  }

  if (
    Number(data?.algRatingPredHomeSpread) < Number(data.spread_last_spread_home)
  ) {
    return true;
  }
  return false;
};

export const checkUnderWhiteCircle = (data: GameDataType) => {
  if (Number(data?.algRatingPredTotal) < Number(data.total_last_total)) {
    return true;
  }
  return false;
};

export const checkOverWhiteCircle = (data: GameDataType) => {
  if (Number(data?.algRatingPredTotal) > Number(data.total_last_total)) {
    return true;
  }
  return false;
};

export const checkHomeWinWhiteCircle = (data: GameDataType) => {
  if (Number(data?.algRatingPredHomeSpread) < 0) {
    return true;
  }
  return false;
};

export const checkAwayWinWhiteCircle = (data: GameDataType) => {
  if (Number(data?.algRatingPredAwaySpread) < 0) {
    return true;
  }
  return false;
};

const a = [
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 2,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -2,
    algRatingPredHomeSpread: 2,
    algRatingPredTotal: 9.8,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.59',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'ATL_Logo.png',
    awayTeamId: 29,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'ATL',
    away_team_market: 'Atlanta',
    away_team_name: 'Braves',
    away_uuid: '12079497-e414-450a-8bf2-29f91de646bf',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.567',
    gameID: 8604,
    gameUTCDateTime: '2023-03-30T17:05:00',
    game_uuid: '5cb26125-ff19-4503-aebb-a65d7475ad2b',
    homeRecord: '0-0',
    homeTeamIcon: 'WSH_Logo.png',
    homeTeamId: 30,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'WSH',
    home_team_market: 'Washington',
    home_team_name: 'Nationals',
    home_uuid: 'd89bed32-3aee-4407-99e3-4103641b999a',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-248',
    moneyline_last_outcome_home: '+204',
    moneyline_open_outcome_away: '-210',
    moneyline_open_outcome_home: '+180',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-138',
    run_line_last_outcome_home: '+117',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '-125',
    run_line_open_outcome_home: '+105',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.557',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-102',
    total_last_outcome_over_total: '8',
    total_last_outcome_under_odds: '-118',
    total_last_outcome_under_total: '8',
    total_last_total: '8',
    total_open_outcome_over_odds: '-107',
    total_open_outcome_over_total: '8',
    total_open_outcome_under_odds: '-113',
    total_open_outcome_under_total: '8',
    total_open_total: '8',
    venueCity: 'Washington',
    venueName: 'Nationals Park',
    venueState: 'DC'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 1.7,
    algRatingPredHomeSpread: -1.7,
    algRatingPredTotal: 7.9,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:56.01',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'SF_Logo.png',
    awayTeamId: 23,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'SF',
    away_team_market: 'San Francisco',
    away_team_name: 'Giants',
    away_uuid: 'a7723160-10b7-4277-a309-d8dd95a8ae65',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.7',
    gameID: 10072,
    gameUTCDateTime: '2023-03-30T17:05:00',
    game_uuid: 'f3f0ae8e-cb65-4e96-9530-c6f868738f09',
    homeRecord: '0-0',
    homeTeamIcon: 'NYY_Logo.png',
    homeTeamId: 5,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'NYY',
    home_team_market: 'New York',
    home_team_name: 'Yankees',
    home_uuid: 'a09ec676-f887-43dc-bbb3-cf4bbaee9a18',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+156',
    moneyline_last_outcome_home: '-185',
    moneyline_open_outcome_away: '+145',
    moneyline_open_outcome_home: '-170',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-143',
    run_line_last_outcome_home: '+121',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-165',
    run_line_open_outcome_home: '+140',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.69',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '+101',
    total_last_outcome_over_total: '7.5',
    total_last_outcome_under_odds: '-121',
    total_last_outcome_under_total: '7.5',
    total_last_total: '7.5',
    total_open_outcome_over_odds: '-105',
    total_open_outcome_over_total: '7.5',
    total_open_outcome_under_odds: '-115',
    total_open_outcome_under_total: '7.5',
    total_open_total: '7.5',
    venueCity: 'Bronx',
    venueName: 'Yankee Stadium',
    venueState: 'NY'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 2,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -0.1,
    algRatingPredHomeSpread: 0.1,
    algRatingPredTotal: 11.1,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:56.12',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'BAL_Logo.png',
    awayTeamId: 3,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'BAL',
    away_team_market: 'Baltimore',
    away_team_name: 'Orioles',
    away_uuid: '75729d34-bca7-4a0f-b3df-6f26c6ad3719',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.73',
    gameID: 9357,
    gameUTCDateTime: '2023-03-30T18:10:00',
    game_uuid: 'aab4a9b9-2d61-4619-8f89-45ee2ede92fa',
    homeRecord: '0-0',
    homeTeamIcon: 'BOS_Logo.png',
    homeTeamId: 4,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'BOS',
    home_team_market: 'Boston',
    home_team_name: 'Red Sox',
    home_uuid: '93941372-eb4c-4c40-aced-fe3267174393',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+106',
    moneyline_last_outcome_home: '-126',
    moneyline_open_outcome_away: '+110',
    moneyline_open_outcome_home: '-130',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-180',
    run_line_last_outcome_home: '+153',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-180',
    run_line_open_outcome_home: '+155',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.72',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-110',
    total_last_outcome_over_total: '9',
    total_last_outcome_under_odds: '-110',
    total_last_outcome_under_total: '9',
    total_last_total: '9',
    total_open_outcome_over_odds: '-110',
    total_open_outcome_over_total: '9.5',
    total_open_outcome_under_odds: '-110',
    total_open_outcome_under_total: '9.5',
    total_open_total: '9.5',
    venueCity: 'Boston',
    venueName: 'Fenway Park',
    venueState: 'MA'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 2,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 0.2,
    algRatingPredHomeSpread: -0.2,
    algRatingPredTotal: 9.8,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:54.84',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'MIL_Logo.png',
    awayTeamId: 20,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'MIL',
    away_team_market: 'Milwaukee',
    away_team_name: 'Brewers',
    away_uuid: 'dcfd5266-00ce-442c-bc09-264cd20cf455',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.383',
    gameID: 7946,
    gameUTCDateTime: '2023-03-30T18:20:00',
    game_uuid: '1506ae41-f6e1-4d94-bd5a-5adcf6a3a967',
    homeRecord: '0-0',
    homeTeamIcon: 'CHC_Logo.png',
    homeTeamId: 18,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'CHC',
    home_team_market: 'Chicago',
    home_team_name: 'Cubs',
    home_uuid: '55714da8-fcaf-4574-8443-59bfb511a524',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-143',
    moneyline_last_outcome_home: '+122',
    moneyline_open_outcome_away: '-120',
    moneyline_open_outcome_home: '+100',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '+122',
    run_line_last_outcome_home: '-145',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '+150',
    run_line_open_outcome_home: '-175',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.373',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-104',
    total_last_outcome_over_total: '7.5',
    total_last_outcome_under_odds: '-116',
    total_last_outcome_under_total: '7.5',
    total_last_total: '7.5',
    total_open_outcome_over_odds: '-112',
    total_open_outcome_over_total: '7.5',
    total_open_outcome_under_odds: '-108',
    total_open_outcome_under_total: '7.5',
    total_open_total: '7.5',
    venueCity: 'Chicago',
    venueName: 'Wrigley Field',
    venueState: 'IL'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 2.4,
    algRatingPredHomeSpread: -2.4,
    algRatingPredTotal: 7.6,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.293',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'DET_Logo.png',
    awayTeamId: 9,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'DET',
    away_team_market: 'Detroit',
    away_team_name: 'Tigers',
    away_uuid: '575c19b7-4052-41c2-9f0a-1c5813d02f99',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.48',
    gameID: 8290,
    gameUTCDateTime: '2023-03-30T19:10:00',
    game_uuid: '3b971c26-65bc-4038-afca-26f6b6fa6d93',
    homeRecord: '0-0',
    homeTeamIcon: 'TB_Logo.png',
    homeTeamId: 2,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'TB',
    home_team_market: 'Tampa Bay',
    home_team_name: 'Rays',
    home_uuid: 'bdc11650-6f74-49c4-875e-778aeb7632d9',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+189',
    moneyline_last_outcome_home: '-230',
    moneyline_open_outcome_away: '+175',
    moneyline_open_outcome_home: '-205',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-122',
    run_line_last_outcome_home: '+102',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-135',
    run_line_open_outcome_home: '+115',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.47',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '+103',
    total_last_outcome_over_total: '7',
    total_last_outcome_under_odds: '-122',
    total_last_outcome_under_total: '7',
    total_last_total: '7',
    total_open_outcome_over_odds: '-118',
    total_open_outcome_over_total: '6.5',
    total_open_outcome_under_odds: '-102',
    total_open_outcome_under_total: '6.5',
    total_open_total: '6.5',
    venueCity: 'St. Petersburg',
    venueName: 'Tropicana Field',
    venueState: 'FL'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 2,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -0.8,
    algRatingPredHomeSpread: 0.8,
    algRatingPredTotal: 8.4,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.823',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'PHI_Logo.png',
    awayTeamId: 26,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'PHI',
    away_team_market: 'Philadelphia',
    away_team_name: 'Phillies',
    away_uuid: '2142e1ba-3b40-445c-b8bb-f1f8b1054220',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.633',
    gameID: 8843,
    gameUTCDateTime: '2023-03-30T20:05:00',
    game_uuid: '75e74431-0ce3-498c-a915-41855361f439',
    homeRecord: '0-0',
    homeTeamIcon: 'TEX_Logo.png',
    homeTeamId: 14,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'TEX',
    home_team_market: 'Texas',
    home_team_name: 'Rangers',
    home_uuid: 'd99f919b-1534-4516-8e8a-9cd106c6d8cd',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+114',
    moneyline_last_outcome_home: '-134',
    moneyline_open_outcome_away: '-105',
    moneyline_open_outcome_home: '-115',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-217',
    run_line_last_outcome_home: '+177',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '+170',
    run_line_open_outcome_home: '-200',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.623',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-116',
    total_last_outcome_over_total: '6.5',
    total_last_outcome_under_odds: '-103',
    total_last_outcome_under_total: '6.5',
    total_last_total: '6.5',
    total_open_outcome_over_odds: '-110',
    total_open_outcome_over_total: '6.5',
    total_open_outcome_under_odds: '-110',
    total_open_outcome_under_total: '6.5',
    total_open_total: '6.5',
    venueCity: 'Arlington',
    venueName: 'Globe Life Field',
    venueState: 'TX'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -2,
    algRatingPredHomeSpread: 2,
    algRatingPredTotal: 9.8,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:56.403',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'MIN_Logo.png',
    awayTeamId: 10,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'MIN',
    away_team_market: 'Minnesota',
    away_team_name: 'Twins',
    away_uuid: 'aa34e0ed-f342-4ec6-b774-c79b47b60e2d',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.857',
    gameID: 8534,
    gameUTCDateTime: '2023-03-30T20:10:00',
    game_uuid: '54ff1f8d-4f97-44d3-baab-98e5f6fd9f46',
    homeRecord: '0-0',
    homeTeamIcon: 'KC_Logo.png',
    homeTeamId: 6,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'KC',
    home_team_market: 'Kansas City',
    home_team_name: 'Royals',
    home_uuid: '833a51a9-0d84-410f-bd77-da08c3e5e26e',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-145',
    moneyline_last_outcome_home: '+124',
    moneyline_open_outcome_away: '-145',
    moneyline_open_outcome_home: '+125',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '+113',
    run_line_last_outcome_home: '-135',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '+105',
    run_line_open_outcome_home: '-125',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.847',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-101',
    total_last_outcome_over_total: '9',
    total_last_outcome_under_odds: '-119',
    total_last_outcome_under_total: '9',
    total_last_total: '9',
    total_open_outcome_over_odds: '-112',
    total_open_outcome_over_total: '8.5',
    total_open_outcome_under_odds: '-108',
    total_open_outcome_under_total: '8.5',
    total_open_total: '8.5',
    venueCity: 'Kansas City',
    venueName: 'Kauffman Stadium',
    venueState: 'MO'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 4,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -0.5,
    algRatingPredHomeSpread: 0.5,
    algRatingPredTotal: 10.5,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:56.31',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'NYM_Logo.png',
    awayTeamId: 27,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'NYM',
    away_team_market: 'New York',
    away_team_name: 'Mets',
    away_uuid: 'f246a5e5-afdb-479c-9aaa-c68beeda7af6',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.793',
    gameID: 8587,
    gameUTCDateTime: '2023-03-30T20:10:00',
    game_uuid: '5b1598dc-7758-4a80-8763-5a7cffea40f2',
    homeRecord: '0-0',
    homeTeamIcon: 'MIA_Logo.png',
    homeTeamId: 28,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'MIA',
    home_team_market: 'Miami',
    home_team_name: 'Marlins',
    home_uuid: '03556285-bdbb-4576-a06d-42f71f46ddc5',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-120',
    moneyline_last_outcome_home: '+101',
    moneyline_open_outcome_away: '-120',
    moneyline_open_outcome_home: '+100',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '+150',
    run_line_last_outcome_home: '-178',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '+145',
    run_line_open_outcome_home: '-170',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.787',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-110',
    total_last_outcome_over_total: '6.5',
    total_last_outcome_under_odds: '-110',
    total_last_outcome_under_total: '6.5',
    total_last_total: '6.5',
    total_open_outcome_over_odds: '-105',
    total_open_outcome_over_total: '6.5',
    total_open_outcome_under_odds: '-115',
    total_open_outcome_under_total: '6.5',
    total_open_total: '6.5',
    venueCity: 'Miami',
    venueName: 'loanDepot park',
    venueState: 'FL'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 0.7,
    algRatingPredHomeSpread: -0.7,
    algRatingPredTotal: 6.2,
    algRatingUnder: 3,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.167',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'PIT_Logo.png',
    awayTeamId: 17,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'PIT',
    away_team_market: 'Pittsburgh',
    away_team_name: 'Pirates',
    away_uuid: '481dfe7e-5dab-46ab-a49f-9dcc2b6e2cfd',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.45',
    gameID: 8904,
    gameUTCDateTime: '2023-03-30T20:10:00',
    game_uuid: '7b3a83da-7d15-4db3-b346-b5aeafaa51b3',
    homeRecord: '0-0',
    homeTeamIcon: 'CIN_Logo.png',
    homeTeamId: 16,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'CIN',
    home_team_market: 'Cincinnati',
    home_team_name: 'Reds',
    home_uuid: 'c874a065-c115-4e7d-b0f0-235584fb0e6f',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+119',
    moneyline_last_outcome_home: '-140',
    moneyline_open_outcome_away: '+120',
    moneyline_open_outcome_home: '-140',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-172',
    run_line_last_outcome_home: '+144',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-150',
    run_line_open_outcome_home: '+130',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.44',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-109',
    total_last_outcome_over_total: '8.5',
    total_last_outcome_under_odds: '-111',
    total_last_outcome_under_total: '8.5',
    total_last_total: '8.5',
    total_open_outcome_over_odds: '-110',
    total_open_outcome_over_total: '8.5',
    total_open_outcome_under_odds: '-110',
    total_open_outcome_under_total: '8.5',
    total_open_total: '8.5',
    venueCity: 'Cincinnati',
    venueName: 'Great American Ball Park',
    venueState: 'OH'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 2,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -0.1,
    algRatingPredHomeSpread: 0.1,
    algRatingPredTotal: 9.7,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.73',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'TOR_Logo.png',
    awayTeamId: 1,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'TOR',
    away_team_market: 'Toronto',
    away_team_name: 'Blue Jays',
    away_uuid: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.6',
    gameID: 9739,
    gameUTCDateTime: '2023-03-30T20:10:00',
    game_uuid: 'd2ce4add-68ca-4072-8d7c-bf7a6d6a2b87',
    homeRecord: '0-0',
    homeTeamIcon: 'STL_Logo.png',
    homeTeamId: 19,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'STL',
    home_team_market: 'St. Louis',
    home_team_name: 'Cardinals',
    home_uuid: '44671792-dc02-4fdd-a5ad-f5f17edaa9d7',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-118',
    moneyline_last_outcome_home: '-101',
    moneyline_open_outcome_away: '+100',
    moneyline_open_outcome_home: '-120',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '+147',
    run_line_last_outcome_home: '-175',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '+170',
    run_line_open_outcome_home: '-200',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.587',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-109',
    total_last_outcome_over_total: '7.5',
    total_last_outcome_under_odds: '-111',
    total_last_outcome_under_total: '7.5',
    total_last_total: '7.5',
    total_open_outcome_over_odds: '-105',
    total_open_outcome_over_total: '7.5',
    total_open_outcome_under_odds: '-115',
    total_open_outcome_under_total: '7.5',
    total_open_total: '7.5',
    venueCity: 'St. Louis',
    venueName: 'Busch Stadium',
    venueState: 'MO'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 3,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 3.4,
    algRatingPredHomeSpread: -3.4,
    algRatingPredTotal: 7.2,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.027',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'COL_Logo.png',
    awayTeamId: 24,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'COL',
    away_team_market: 'Colorado',
    away_team_name: 'Rockies',
    away_uuid: '29dd9a87-5bcc-4774-80c3-7f50d985068b',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.413',
    gameID: 9866,
    gameUTCDateTime: '2023-03-30T20:10:00',
    game_uuid: 'dde4a8ec-ba54-454f-aa38-863028b006f2',
    homeRecord: '0-0',
    homeTeamIcon: 'SD_Logo.png',
    homeTeamId: 25,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'SD',
    home_team_market: 'San Diego',
    home_team_name: 'Padres',
    home_uuid: 'd52d5339-cbdd-43f3-9dfa-a42fd588b9a3',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+172',
    moneyline_last_outcome_home: '-205',
    moneyline_open_outcome_away: '+160',
    moneyline_open_outcome_home: '-190',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-130',
    run_line_last_outcome_home: '+108',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-145',
    run_line_open_outcome_home: '+125',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.407',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-105',
    total_last_outcome_over_total: '7.5',
    total_last_outcome_under_odds: '-114',
    total_last_outcome_under_total: '7.5',
    total_last_total: '7.5',
    total_open_outcome_over_odds: '-104',
    total_open_outcome_over_total: '7.5',
    total_open_outcome_under_odds: '-116',
    total_open_outcome_under_total: '7.5',
    total_open_total: '7.5',
    venueCity: 'San Diego',
    venueName: 'PETCO Park',
    venueState: 'CA'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 2.3,
    algRatingPredHomeSpread: -2.3,
    algRatingPredTotal: 6.9,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.403',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'CWS_Logo.png',
    awayTeamId: 8,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'CWS',
    away_team_market: 'Chicago',
    away_team_name: 'White Sox',
    away_uuid: '47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.51',
    gameID: 9429,
    gameUTCDateTime: '2023-03-30T23:08:00',
    game_uuid: 'b2c40205-d486-4242-a6d7-39c15ef0ba1e',
    homeRecord: '0-0',
    homeTeamIcon: 'HOU_Logo.png',
    homeTeamId: 15,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'HOU',
    home_team_market: 'Houston',
    home_team_name: 'Astros',
    home_uuid: 'eb21dadd-8f10-4095-8bf3-dfb3b779f107',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+132',
    moneyline_last_outcome_home: '-155',
    moneyline_open_outcome_away: '+145',
    moneyline_open_outcome_home: '-170',
    odds_generated_at_last: '2023-03-29T16:31:27+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:56+00:00',
    outs: null,
    run_line_last_outcome_away: '-171',
    run_line_last_outcome_home: '+144',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-140',
    run_line_open_outcome_home: '+120',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.5',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-119',
    total_last_outcome_over_total: '7',
    total_last_outcome_under_odds: '-100',
    total_last_outcome_under_total: '7',
    total_last_total: '7',
    total_open_outcome_over_odds: '-125',
    total_open_outcome_over_total: '7',
    total_open_outcome_under_odds: '+105',
    total_open_outcome_under_total: '7',
    total_open_total: '7',
    venueCity: 'Houston',
    venueName: 'Minute Maid Park',
    venueState: 'TX'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -1.6,
    algRatingPredHomeSpread: 1.6,
    algRatingPredTotal: 8.2,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:56.217',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'LAA_Logo.png',
    awayTeamId: 12,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'LAA',
    away_team_market: 'Los Angeles',
    away_team_name: 'Angels',
    away_uuid: '4f735188-37c8-473d-ae32-1f7e34ccf892',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.76',
    gameID: 8570,
    gameUTCDateTime: '2023-03-31T02:07:00',
    game_uuid: '599a9815-46be-451a-9fb3-7af8595ecdc9',
    homeRecord: '0-0',
    homeTeamIcon: 'OAK_Logo.png',
    homeTeamId: 13,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'OAK',
    home_team_market: 'Oakland',
    home_team_name: 'Athletics',
    home_uuid: '27a59d3b-ff7c-48ea-b016-4798f560f5e1',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-222',
    moneyline_last_outcome_home: '+184',
    moneyline_open_outcome_away: '-225',
    moneyline_open_outcome_home: '+190',
    odds_generated_at_last: '2023-03-29T18:03:32+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:57+00:00',
    outs: null,
    run_line_last_outcome_away: '-121',
    run_line_last_outcome_home: '+101',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '-135',
    run_line_open_outcome_home: '+115',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.75',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-108',
    total_last_outcome_over_total: '7',
    total_last_outcome_under_odds: '-112',
    total_last_outcome_under_total: '7',
    total_last_total: '7',
    total_open_outcome_over_odds: '-105',
    total_open_outcome_over_total: '7',
    total_open_outcome_under_odds: '-115',
    total_open_outcome_under_total: '7',
    total_open_total: '7',
    venueCity: 'Oakland',
    venueName: 'Oakland Coliseum',
    venueState: 'CA'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 4,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -2.8,
    algRatingPredHomeSpread: 2.8,
    algRatingPredTotal: 7.1,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.917',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'CLE_Logo.png',
    awayTeamId: 7,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'CLE',
    away_team_market: 'Cleveland',
    away_team_name: 'Guardians',
    away_uuid: '80715d0d-0d2a-450f-a970-1b9a3b18c7e7',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.67',
    gameID: 7990,
    gameUTCDateTime: '2023-03-31T02:10:00',
    game_uuid: '191dd5c3-2a36-411a-82f8-f22d3082fe4b',
    homeRecord: '0-0',
    homeTeamIcon: 'SEA_Logo.png',
    homeTeamId: 11,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'SEA',
    home_team_market: 'Seattle',
    home_team_name: 'Mariners',
    home_uuid: '43a39081-52b4-4f93-ad29-da7f329ea960',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '-100',
    moneyline_last_outcome_home: '-119',
    moneyline_open_outcome_away: '+100',
    moneyline_open_outcome_home: '-120',
    odds_generated_at_last: '2023-03-29T18:03:32+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:57+00:00',
    outs: null,
    run_line_last_outcome_away: '+187',
    run_line_last_outcome_home: '-228',
    run_line_last_spread_away: '-1.5',
    run_line_last_spread_home: '1.5',
    run_line_open_outcome_away: '+175',
    run_line_open_outcome_home: '-205',
    run_line_open_spread_away: '-1.5',
    run_line_open_spread_home: '1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.66',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-122',
    total_last_outcome_over_total: '6.5',
    total_last_outcome_under_odds: '+101',
    total_last_outcome_under_total: '6.5',
    total_last_total: '6.5',
    total_open_outcome_over_odds: '-119',
    total_open_outcome_over_total: '6.5',
    total_open_outcome_under_odds: '-101',
    total_open_outcome_under_total: '6.5',
    total_open_total: '6.5',
    venueCity: 'Seattle',
    venueName: 'T-Mobile Park',
    venueState: 'WA'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 2.6,
    algRatingCalcGreenSpread: 1.9,
    algRatingCalcGreenSpreadAway: 1.9,
    algRatingCalcGreenUnder: 2.1,
    algRatingCalcGreenWin: 1.9,
    algRatingCalcGreenWinAway: 2.3,
    algRatingCalcSuperOver: 3,
    algRatingCalcSuperSpread: 2.3,
    algRatingCalcSuperSpreadAway: 2.3,
    algRatingCalcSuperUnder: 2.6,
    algRatingCalcSuperWin: 2.3,
    algRatingCalcSuperWinAway: 2.7,
    algRatingCalcYellowOver: 1.8,
    algRatingCalcYellowSpread: 1.4,
    algRatingCalcYellowSpreadAway: 1.4,
    algRatingCalcYellowUnder: 1.4,
    algRatingCalcYellowWin: 1.4,
    algRatingCalcYellowWinAway: 1.8,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -140,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 0.9,
    algRatingPredHomeSpread: -0.9,
    algRatingPredTotal: 6.2,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-29T16:29:55.497',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '0-0',
    awayTeamIcon: 'ARI_Logo.png',
    awayTeamId: 22,
    away_errors: null,
    away_hits: null,
    away_runs: null,
    away_team_abbr: 'ARI',
    away_team_market: 'Arizona',
    away_team_name: 'Diamondbacks',
    away_uuid: '25507be1-6a68-4267-bd82-e097d94b359b',
    bFreeOffer: false,
    balls: null,
    boxscoreUpdatedLast: null,
    dateTimeUpdated: '2023-03-29T18:03:33.537',
    gameID: 8238,
    gameUTCDateTime: '2023-03-31T02:10:00',
    game_uuid: '369e97d0-e711-405e-9821-55e8e30e085f',
    homeRecord: '0-0',
    homeTeamIcon: 'LAD_Logo.png',
    homeTeamId: 21,
    home_errors: null,
    home_hits: null,
    home_runs: null,
    home_team_abbr: 'LAD',
    home_team_market: 'Los Angeles',
    home_team_name: 'Dodgers',
    home_uuid: 'ef64da7f-cfaf-4300-87b0-9313386b977c',
    inning: null,
    inning_half: null,
    moneyline_last_outcome_away: '+150',
    moneyline_last_outcome_home: '-176',
    moneyline_open_outcome_away: '+145',
    moneyline_open_outcome_home: '-170',
    odds_generated_at_last: '2023-03-29T18:03:32+00:00',
    odds_generated_at_orig: '2023-03-27T22:11:57+00:00',
    outs: null,
    run_line_last_outcome_away: '-149',
    run_line_last_outcome_home: '+126',
    run_line_last_spread_away: '1.5',
    run_line_last_spread_home: '-1.5',
    run_line_open_outcome_away: '-180',
    run_line_open_outcome_home: '+155',
    run_line_open_spread_away: '1.5',
    run_line_open_spread_home: '-1.5',
    runnerBase1: null,
    runnerBase2: null,
    runnerBase3: null,
    sport_name: 'MLB',
    standingUpdatedLast: '2023-03-29T18:03:33.527',
    status: 'scheduled',
    statusId: 0,
    strikes: null,
    total_last_outcome_over_odds: '-105',
    total_last_outcome_over_total: '7.5',
    total_last_outcome_under_odds: '-115',
    total_last_outcome_under_total: '7.5',
    total_last_total: '7.5',
    total_open_outcome_over_odds: '-111',
    total_open_outcome_over_total: '7',
    total_open_outcome_under_odds: '-108',
    total_open_outcome_under_total: '7',
    total_open_total: '7',
    venueCity: 'Los Angeles',
    venueName: 'Dodger Stadium',
    venueState: 'CA'
  }
];
