import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  container: {
    width: 70 * scale,
    height: 70 * scale,
    backgroundColor: 'white'
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});
