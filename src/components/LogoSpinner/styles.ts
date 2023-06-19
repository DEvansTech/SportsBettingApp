import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    opacity: 1,
    zIndex: 1
  },
  logo: {
    height: 150 * scale,
    width: 150 * scale
  },
  Rletter: {
    position: 'absolute',
    height: 74 * scale,
    width: 70 * scale
  }
});
