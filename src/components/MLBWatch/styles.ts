import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  container: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5 * scale
  },
  noBorder: {
    borderBottomWidth: 0,
    borderColor: 'transparent'
  },
  gameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20 * scale,
    paddingHorizontal: 15 * scale,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 0.5 * scale
  },
  teamStatusView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  teamLogo: {
    width: 70 * scale,
    height: 70 * scale
  },
  teamNameText: {
    color: Colors.black,
    fontSize: 18 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black,
    marginTop: 5 * scale
  },
  teamRecordText: {
    color: Colors.black,
    fontSize: 12 * scale,
    fontFamily: Fonts.regular,
    marginTop: 5 * scale
  },
  scoreView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  processStatus: {
    alignItems: 'center'
  },
  inningText: {
    color: Colors.black,
    fontSize: 20 * scale,
    fontFamily: Fonts.regular
  },
  outsText: {
    color: Colors.black,
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    marginTop: 5 * scale
  },
  finalText: {
    color: Colors.black,
    fontSize: 18 * scale,
    fontFamily: Fonts.black,
    textTransform: 'uppercase'
  },
  resultView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  childLR: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  childCenter: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scoreText1: {
    color: Colors.black,
    fontSize: 70 * scale,
    fontFamily: Fonts.extraBold
  },
  scoreText2: {
    color: Colors.black,
    fontSize: 70 * scale,
    fontFamily: Fonts.regular
  },
  scoreText1_1: {
    color: Colors.black,
    fontSize: 60 * scale,
    fontFamily: Fonts.extraBold
  },
  scoreText2_2: {
    color: Colors.black,
    fontSize: 60 * scale,
    fontFamily: Fonts.regular
  },
  betValueView: {
    paddingHorizontal: 12 * scale,
    paddingVertical: 20 * scale
  },
  betRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3 * scale
  },
  ratingRow: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  betTitleView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  betGreenText: {
    color: Colors.green,
    fontSize: 12 * scale,
    fontFamily: Fonts.black
  },
  betBlackText: {
    color: Colors.black,
    fontSize: 12 * scale,
    fontFamily: Fonts.regular
  },
  betWinView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  betWinIconView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  betTitleText: {
    color: Colors.black,
    fontSize: 13 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black
  },
  betMatchWatch: {
    alignItems: 'center'
  },
  watchBtns: {
    width: deviceWidth * 0.4,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20 * scale
  },
  betMatchBtnText: {
    color: Colors.black,
    fontSize: 8 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black
  }
});
