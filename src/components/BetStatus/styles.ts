import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  scoreView: {
    position: 'relative',
    width: 40 * scale,
    height: 30 * scale
  },
  icon1: {
    position: 'absolute',
    fontSize: 15 * scale,
    transform: [{ rotate: '45deg' }],
    top: 13 * scale,
    left: 0 * scale
  },
  icon2: {
    position: 'absolute',
    fontSize: 15 * scale,
    top: 0,
    left: 13 * scale,
    transform: [{ rotate: '45deg' }]
  },
  icon3: {
    position: 'absolute',
    fontSize: 15 * scale,
    transform: [{ rotate: '45deg' }],
    top: 13 * scale,
    left: 26 * scale
  },
  color1: {
    color: Colors.lightGrey
  },
  color2: {
    color: Colors.blue
  }
});
