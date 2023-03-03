import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: Colors.grey
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    height: 100 * scale,
    borderColor: 'transparent'
  },
  headerView: {
    paddingHorizontal: 15 * scale,
    paddingVertical: 10 * scale,
    position: 'relative'
  },
  subHeader: {
    backgroundColor: Colors.black,
    paddingVertical: 15 * scale,
    paddingHorizontal: 20 * scale
  },
  subHeaderText: {
    color: Colors.white,
    fontSize: 25 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black
  },
  subHeaderThinText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: 25 * scale,
    textTransform: 'uppercase'
  },

  headerSubTitle: {
    color: Colors.white,
    fontSize: 20 * scale,
    textTransform: 'uppercase',
    fontFamily: Fonts.black
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 30 * scale,
    fontFamily: Fonts.medium,
    marginTop: 5 * scale
  },
  closeIcon: {
    fontSize: 26 * scale,
    position: 'absolute',
    top: 5 * scale,
    right: 15 * scale,
    color: Colors.white
  },
  controlBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15 * scale,
    right: 5 * scale
  },
  controlIcon: {
    fontSize: 24 * scale,
    color: Colors.white,
    marginHorizontal: 8 * scale
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  content: {
    padding: 20 * scale
  },
  body: {
    flexDirection: 'row',
    marginTop: 10 * scale
  },
  firstView: {
    width: deviceWidth * 0.5
  },
  imageView: {
    width: '100%',
    height: deviceWidth
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  topRankedText: {
    fontSize: 16 * scale,
    color: Colors.white,
    fontFamily: Fonts.bold,
    paddingHorizontal: 10 * scale,
    paddingVertical: 3 * scale,
    backgroundColor: Colors.green,
    borderRadius: 5 * scale,
    lineHeight: 20 * scale,
    overflow: 'hidden'
  },
  allText: {
    fontSize: 16 * scale,
    color: Colors.green,
    fontFamily: Fonts.bold,
    paddingHorizontal: 5 * scale,
    paddingVertical: 3 * scale,
    backgroundColor: Colors.white,
    borderWidth: 2 * scale,
    borderColor: Colors.green,
    borderRadius: 5 * scale,
    overflow: 'hidden'
  },
  normalText: {
    fontSize: 14 * scale,
    color: Colors.black,
    fontFamily: Fonts.regular,
    lineHeight: 23 * scale
  },
  blackBoldText: {
    fontSize: 14 * scale,
    color: Colors.black,
    fontFamily: Fonts.black
  },
  greenBoldText: {
    fontSize: 14 * scale,
    color: Colors.green,
    fontFamily: Fonts.black
  },
  secondView: {
    width: deviceWidth * 0.45,
    paddingHorizontal: 10 * scale
  },
  mainIcon: {
    marginVertical: 20 * scale
  },
  mt20: {
    marginTop: 20 * scale
  }
});
