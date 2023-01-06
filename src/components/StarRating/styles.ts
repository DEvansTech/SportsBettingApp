import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  scoreView: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  emptyIcon: {
    fontSize: 16 * scale,
    lineHeight: 16 * scale,
    color: Colors.grey
  },
  fillIcon: {
    fontSize: 16 * scale,
    lineHeight: 16 * scale,
    color: Colors.green
  },
  notRatedText: {
    fontSize: 12 * scale,
    fontFamily: Fonts.light,
    color: Colors.black
  }
});
