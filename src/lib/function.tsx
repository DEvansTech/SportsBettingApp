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
    if (data?.algRatingAwayWin) {
      return Number(data.algRatingAwayWin);
    }
    return undefined;
  }

  const rangleValue = Number(data?.moneyline_last_outcome_away);
  return getWinAwayRatingValue(data, rangleValue);
};

export const getHomeWinValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    if (data?.algRatingHomeWin) {
      return Number(data.algRatingHomeWin);
    }
    return undefined;
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
    algRatingCalcGreenOver: 18.4,
    algRatingCalcGreenSpread: 5.8,
    algRatingCalcGreenSpreadAway: 5.8,
    algRatingCalcGreenUnder: 18.4,
    algRatingCalcGreenWin: 5.8,
    algRatingCalcGreenWinAway: 5.8,
    algRatingCalcSuperOver: 24,
    algRatingCalcSuperSpread: 7.1,
    algRatingCalcSuperSpreadAway: 7.1,
    algRatingCalcSuperUnder: 24,
    algRatingCalcSuperWin: 7.1,
    algRatingCalcSuperWinAway: 7.1,
    algRatingCalcYellowOver: 16.6,
    algRatingCalcYellowSpread: 4.5,
    algRatingCalcYellowSpreadAway: 4.5,
    algRatingCalcYellowUnder: 16.6,
    algRatingCalcYellowWin: 4.5,
    algRatingCalcYellowWinAway: 4.5,
    algRatingHomeSpread: 1,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 1,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -120,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: -1.6,
    algRatingPredHomeSpread: 1.6,
    algRatingPredTotal: 221.1,
    algRatingUnder: 2,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-31T02:41:11.757',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '52-24',
    awayTeamIcon: 'BOS_Logo.png',
    awayTeamId: 9,
    away_points: '140',
    away_team_abbr: 'BOS',
    away_team_market: 'Boston',
    away_team_name: 'Celtics',
    away_uuid: '583eccfa-fb46-11e1-82cb-f4ce4684ea4c',
    bFreeOffer: false,
    boxscoreUpdatedLast: '2023-03-31T02:19:58.523',
    clock: null,
    dateTimeUpdated: '2023-03-31T02:19:58.523',
    gameID: 2491,
    gameUTCDateTime: '2023-03-30T23:30:00',
    game_uuid: 'a869bf1f-05b4-418f-be25-168d0a9230a9',
    homeRecord: '55-21',
    homeTeamIcon: 'MIL_Logo.png',
    homeTeamId: 15,
    home_points: '99',
    home_team_abbr: 'MIL',
    home_team_market: 'Milwaukee',
    home_team_name: 'Bucks',
    home_uuid: '583ecefd-fb46-11e1-82cb-f4ce4684ea4c',
    location_team_abbr: null,
    moneyline_last_outcome_away: '+114',
    moneyline_last_outcome_home: '-135',
    moneyline_open_outcome_away: '+135',
    moneyline_open_outcome_home: '-155',
    odds_generated_at_last: '2023-03-31T01:49:56+00:00',
    odds_generated_at_orig: '2023-03-29T16:03:22+00:00',
    period: null,
    possession_team_abbr: null,
    sport_name: 'NBA',
    spread_last_outcome_away: '-110',
    spread_last_outcome_home: '-110',
    spread_last_spread_away: '2.0',
    spread_last_spread_home: '-2',
    spread_open_outcome_away: '-110',
    spread_open_outcome_home: '-110',
    spread_open_spread_away: '3.5',
    spread_open_spread_home: '-3.5',
    standingUpdatedLast: '2023-03-30T23:49:50.283',
    status: 'complete',
    statusId: 0,
    total_last_outcome_over_odds: '-110',
    total_last_outcome_over_total: '238',
    total_last_outcome_under_odds: '-110',
    total_last_outcome_under_total: '238',
    total_last_total: '238',
    total_open_outcome_over_odds: '-110',
    total_open_outcome_over_total: '236.5',
    total_open_outcome_under_odds: '-110',
    total_open_outcome_under_total: '236.5',
    total_open_total: '236.5',
    venueCity: 'Milwaukee',
    venueName: 'Fiserv Forum',
    venueState: 'WI'
  },
  {
    algRatingAwaySpread: 1,
    algRatingAwaySpreadPct: null,
    algRatingAwayWin: 1,
    algRatingAwayWinPct: null,
    algRatingCalcGreenOver: 18.4,
    algRatingCalcGreenSpread: 5.8,
    algRatingCalcGreenSpreadAway: 5.8,
    algRatingCalcGreenUnder: 18.4,
    algRatingCalcGreenWin: 5.8,
    algRatingCalcGreenWinAway: 5.8,
    algRatingCalcSuperOver: 24,
    algRatingCalcSuperSpread: 7.1,
    algRatingCalcSuperSpreadAway: 7.1,
    algRatingCalcSuperUnder: 24,
    algRatingCalcSuperWin: 7.1,
    algRatingCalcSuperWinAway: 7.1,
    algRatingCalcYellowOver: 16.6,
    algRatingCalcYellowSpread: 4.5,
    algRatingCalcYellowSpreadAway: 4.5,
    algRatingCalcYellowUnder: 16.6,
    algRatingCalcYellowWin: 4.5,
    algRatingCalcYellowWinAway: 4.5,
    algRatingHomeSpread: 2,
    algRatingHomeSpreadPct: null,
    algRatingHomeWin: 3,
    algRatingHomeWinPct: null,
    algRatingMoneySpread: -120,
    algRatingMoneyTotal: -120,
    algRatingMoneyWin: -140,
    algRatingOver: 1,
    algRatingOverPct: null,
    algRatingPredAwaySpread: 6.7,
    algRatingPredHomeSpread: -6.7,
    algRatingPredTotal: 226.3,
    algRatingUnder: 1,
    algRatingUnderPct: null,
    algRatingUpdatedLast: '2023-03-31T02:41:11.85',
    algWinnerHomeSpread: null,
    algWinnerHomeWin: null,
    algWinnerOver: null,
    awayRecord: '38-38',
    awayTeamIcon: 'NOP_Logo.png',
    awayTeamId: 23,
    away_points: '28',
    away_team_abbr: 'NOP',
    away_team_market: 'New Orleans',
    away_team_name: 'Pelicans',
    away_uuid: '583ecc9a-fb46-11e1-82cb-f4ce4684ea4c',
    bFreeOffer: false,
    boxscoreUpdatedLast: null,
    clock: '08:58',
    dateTimeUpdated: '2023-03-31T02:34:10.127',
    gameID: 2492,
    gameUTCDateTime: '2023-03-31T02:00:00',
    game_uuid: '0244f1a5-151c-4603-b5d0-e52ee59869d2',
    homeRecord: '51-24',
    homeTeamIcon: 'DEN_Logo.png',
    homeTeamId: 20,
    home_points: '23',
    home_team_abbr: 'DEN',
    home_team_market: 'Denver',
    home_team_name: 'Nuggets',
    home_uuid: '583ed102-fb46-11e1-82cb-f4ce4684ea4c',
    location_team_abbr: null,
    moneyline_last_outcome_away: '+106',
    moneyline_last_outcome_home: '-126',
    moneyline_open_outcome_away: '+320',
    moneyline_open_outcome_home: '-390',
    odds_generated_at_last: '2023-03-31T02:19:58+00:00',
    odds_generated_at_orig: '2023-03-29T16:03:22+00:00',
    period: '2',
    possession_team_abbr: null,
    sport_name: 'NBA',
    spread_last_outcome_away: '-113',
    spread_last_outcome_home: '-107',
    spread_last_spread_away: '2.0',
    spread_last_spread_home: '-2',
    spread_open_outcome_away: '-110',
    spread_open_outcome_home: '-110',
    spread_open_spread_away: '9.0',
    spread_open_spread_home: '-9',
    standingUpdatedLast: '2023-03-31T02:19:58.543',
    status: 'inprogress',
    statusId: 0,
    total_last_outcome_over_odds: '-110',
    total_last_outcome_over_total: '224.5',
    total_last_outcome_under_odds: '-110',
    total_last_outcome_under_total: '224.5',
    total_last_total: '224.5',
    total_open_outcome_over_odds: '-110',
    total_open_outcome_over_total: '232.5',
    total_open_outcome_under_odds: '-110',
    total_open_outcome_under_total: '232.5',
    total_open_total: '232.5',
    venueCity: 'Denver',
    venueName: 'Ball Arena',
    venueState: 'CO'
  }
];
