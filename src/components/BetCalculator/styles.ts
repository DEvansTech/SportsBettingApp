import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  betResultRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  betBlackText: {
    color: Colors.black,
    fontSize: 13 * scale,
    fontFamily: Fonts.regular
  },
  betBoldBalckText: {
    color: Colors.mediumGrey,
    fontSize: 13 * scale,
    fontFamily: Fonts.black
  },
  betGreenText: {
    color: Colors.green,
    fontSize: 13 * scale,
    fontFamily: Fonts.black
  },
  homeTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  awayTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  }
});
