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
    return Number(data.algRatingAwaySpread);
  }
  if (!data.algRatingAwaySpread) {
    return undefined;
  }

  const oddsTypeValue = Number(data?.spread_last_spread_away);
  const oddsValue = Number(data?.spread_last_outcome_away);

  return getSpreadAwayRatingValue(data, oddsTypeValue, oddsValue);
};

export const getHomeSpreadValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    return Number(data.algRatingHomeSpread);
  }
  if (!data.algRatingHomeSpread) {
    return undefined;
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
    return Number(data.algRatingAwayWin);
  }
  if (!data.algRatingAwayWin) {
    return undefined;
  }
  const rangleValue = Number(data?.moneyline_last_outcome_away);
  return getWinAwayRatingValue(data, rangleValue);
};

export const getHomeWinValue = (data: GameDataType) => {
  if (data.status === 'closed' || data.status === 'complete') {
    return Number(data.algRatingHomeWin);
  }
  if (!data.algRatingHomeWin) {
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
    return Number(gameData.algRatingOver);
  }
  if (!gameData.algRatingOver) {
    return undefined;
  }
  const ovRangeValue = Number(gameData?.total_last_outcome_over_odds);
  const totalScore = Number(gameData.total_last_total);
  return getOverRatingValue(gameData, totalScore, ovRangeValue);
};

export const getUnderRating = (gameData: GameDataType) => {
  if (gameData.status === 'closed' || gameData.status === 'complete') {
    return Number(gameData.algRatingUnder);
  }
  if (!gameData.algRatingUnder) {
    return undefined;
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
  if (
    Number(data?.algRatingPredAwaySpread) < Number(data.spread_last_spread_away)
  ) {
    return true;
  }
  return false;
};

export const checkHomeSpreadWhiteCircle = (data: GameDataType) => {
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
