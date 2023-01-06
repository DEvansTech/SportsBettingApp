import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  rangerView: {
    width: '70%',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 20 * scale
  },
  thumbImageStyle: {
    width: 22 * scale,
    height: 22 * scale
  },
  thumbStyle: {
    backgroundColor: 'transparent',
    width: 22 * scale,
    height: 22 * scale,
    borderRadius: 50 * scale
  },
  trackStyle: {
    height: 2 * scale
  }
});
