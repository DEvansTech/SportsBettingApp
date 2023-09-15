import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

export const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: Colors.whiteGrey
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.regular,
    color: 'white',
    marginLeft: 10 * scale
  },
  backIcon: {
    fontSize: 28 * scale,
    color: 'white'
  },
  headerSmallText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    color: 'white'
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  obisayList: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: -1,
    paddingRight: 10 * scale
  },
  listNumber: {
    width: 70 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listNumberBg1: {
    backgroundColor: Colors.grey
  },
  listNumberBg2: {
    backgroundColor: Colors.lightGrey
  },
  listNumberText: {
    fontSize: 38 * scale,
    fontFamily: Fonts.black,
    color: 'white'
  },
  listDescription: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20 * scale,
    paddingLeft: 15 * scale
  },
  listTitleText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.regular,
    flex: 0.9
  },
  rightArrowIcon: {
    fontSize: 25 * scale,
    color: Colors.green
  },
  wordballon: {
    paddingTop: 10 * scale,
    width: deviceWidth,
    height: 82 * scale
  },
  obiLogo: {
    width: 186 * scale,
    height: 190 * scale,
    alignSelf: 'center',
    marginTop: -25 * scale,
    marginRight: -18 * scale
  },
  descView: {
    paddingHorizontal: 20 * scale,
    paddingVertical: 15 * scale
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: 'white'
  },
  detailListNumber: {
    backgroundColor: 'black',
    width: 80 * scale,
    height: 70 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailTitle: {
    fontSize: 20 * scale,
    fontFamily: Fonts.black,
    color: 'black',
    marginLeft: 20 * scale,
    width: '70%'
  },
  detailListNumberText: {
    fontSize: 38 * scale,
    fontFamily: Fonts.black,
    color: Colors.green
  },
  descDefaultText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    lineHeight: 25 * scale
  },
  descBoldText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.black
  },
  textStyle: {
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    lineHeight: 30 * scale
  },
  footerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20 * scale
  },
  dotImg: {
    width: 10 * scale,
    height: 10 * scale
  },
  roisayImg: {
    width: 100 * scale,
    height: 110 * scale,
    marginTop: 15 * scale
  }
});

export const HTMLStyle = StyleSheet.create({
  p: {
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    lineHeight: 25 * scale
  }
});
