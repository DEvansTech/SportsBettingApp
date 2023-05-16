import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

export const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    height: 65 * scale,
    borderColor: 'transparent',
    marginHorizontal: 10 * scale
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 28 * scale,
    color: 'white'
  },
  headerText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.regular,
    color: 'white',
    marginLeft: 10 * scale
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentView: {
    position: 'relative',
    flexGrow: 1,
    paddingBottom: 20 * scale
  },
  lineSourceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20 * scale,
    borderBottomWidth: 1 * scale,
    borderBottomColor: Colors.darkGrey
  },
  teamLogoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  teamStatusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20 * scale,
    backgroundColor: Colors.lightGrey,
    borderWidth: 1 * scale,
    borderColor: Colors.darkGrey
  },
  teamInfoView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  activeTeam: {
    backgroundColor: Colors.white
  },

  teamLogo: {
    width: 80 * scale,
    height: 80 * scale
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
  segementView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth
  },
  segementBtn: {
    borderWidth: 1 * scale,
    borderLeftWidth: 0.5 * scale,
    borderRightWidth: 0.5 * scale,
    borderTopColor: Colors.darkGrey,
    borderBottomColor: Colors.darkGrey,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    width: deviceWidth / 2,
    paddingVertical: 15 * scale,
    justifyContent: 'center'
  },
  activeBtn: {
    backgroundColor: 'white'
  },
  disactiveBtn: {
    backgroundColor: Colors.darkGrey
  },
  btnText: {
    fontSize: 22 * scale,
    fontFamily: Fonts.black,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  activeBtnText: {
    color: 'black'
  },
  disactiveBtnText: {
    color: 'white'
  },

  titleText: {
    fontFamily: Fonts.regular,
    fontSize: 13 * scale,
    textTransform: 'uppercase'
  },

  ///////--- spread --- ///////
  spreadView: {
    paddingHorizontal: 15 * scale,
    paddingTop: 15 * scale
  },
  spreadBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  spreadTitle: {
    marginLeft: 15 * scale
  },
  oddsValueView: {
    marginTop: 40 * scale
  },
  oddsBar: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  leftBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  rightBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  centerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 * scale
  },
  blackBar: {
    backgroundColor: 'black'
  },
  lightGrayBar: {
    backgroundColor: Colors.lightGrey
  },
  grayBar: {
    backgroundColor: Colors.darkGrey
  },
  yellowBar: {
    backgroundColor: Colors.yellow
  },
  redBar: {
    backgroundColor: Colors.red
  },
  greenBar: {
    backgroundColor: Colors.green
  },
  statusText: {
    fontSize: 28 * scale,
    fontFamily: Fonts.regular,
    color: 'white'
  },
  statusBar: {
    borderRadius: 30 * scale,
    paddingVertical: 7 * scale,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  moneyLineBar: {
    width: 140 * scale
  },
  smallBar: {
    width: 90 * scale
  },
  mediumBar: {
    width: 170 * scale,
    marginHorizontal: 8 * scale
  },
  bigBar: {
    width: 210 * scale,
    marginHorizontal: 8 * scale
  },
  barIcon: {
    fontSize: 30 * scale
  },
  rangerView: {
    marginTop: 5 * scale,
    marginBottom: 35 * scale
  },
  rangerText: {
    textAlign: 'center'
  },
  rangerScaleView: {
    position: 'relative',
    marginTop: 10 * scale
  },
  totalBarView: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 15 * scale
  },
  overBarView: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 15 * scale
  },
  overUnderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -35 * scale
  },
  overBarText: {
    marginBottom: 10 * scale
  },
  underBarText: {
    marginTop: 10 * scale
  },
  overBar: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  overTotalBar: {
    width: 110 * scale
  },
  overValueBar: {
    width: 110 * scale,
    marginHorizontal: 8 * scale
  },
  errTextView: {
    position: 'absolute',
    top: -40 * scale,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  errText: {
    color: Colors.red,
    fontSize: 14 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.bold
  },
  superText: {
    color: Colors.green,
    fontSize: 15 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.bold,
    textAlign: 'center',
    marginTop: 5 * scale
  },
  betCircleIcon: {
    position: 'absolute',
    top: 7 * scale
  },
  betSuperText: {
    color: Colors.green,
    fontSize: 17 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black,
    textAlign: 'right',
    marginTop: 5 * scale,
    marginRight: 15 * scale
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 15 * scale,
    textAlign: 'center',
    paddingHorizontal: 10 * scale,
    marginTop: 30 * scale
  },
  oddsLeftBtn: {
    borderTopLeftRadius: 30 * scale,
    borderBottomLeftRadius: 30 * scale,
    paddingVertical: 10 * scale,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 75 * scale
  },
  oddsRightBtn: {
    borderTopRightRadius: 30 * scale,
    borderBottomRightRadius: 30 * scale,
    paddingVertical: 10 * scale,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 75 * scale
  }
});
