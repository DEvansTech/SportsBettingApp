import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  barView: {
    width: 54 * scale,
    height: 14 * scale,
    borderRadius: 13 * scale,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  redBar: {
    backgroundColor: Colors.red
  },
  greenBar: {
    backgroundColor: Colors.green
  },
  yellowBar: {
    backgroundColor: Colors.yellow
  },
  mediumGreyBar: {
    backgroundColor: Colors.mediumGrey
  },
  lightGreyBar: {
    backgroundColor: Colors.lightGrey
  },
  notRatedText: {
    fontSize: 12 * scale,
    fontFamily: Fonts.light,
    color: Colors.black
  },
  stateText: {
    fontSize: 9 * scale,
    lineHeight: 12 * scale,
    fontFamily: Fonts.black,
    color: 'white',
    textTransform: 'uppercase'
  },
  rippleBar: {
    position: 'relative'
  },
  whiteBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    height: 14 * scale,
    width: 4 * scale,
    zIndex: 1
  },
  firstBar: {
    backgroundColor: Colors.black,
    height: 14 * scale,
    width: 7 * scale
  },
  secondBar: {
    opacity: 0.6
  },
  rightBar: {
    borderTopRightRadius: 10 * scale,
    borderBottomRightRadius: 10 * scale
  },
  leftBar: {
    borderTopLeftRadius: 10 * scale,
    borderBottomLeftRadius: 10 * scale
  },
  whiteCircle: {
    width: 8 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    backgroundColor: 'white',
    position: 'absolute'
  }
});
