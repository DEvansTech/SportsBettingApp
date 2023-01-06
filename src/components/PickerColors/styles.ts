import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';
const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  pickerView: {
    marginTop: 25 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5 * scale
  },
  leftWhitePickerView: {
    borderRightColor: 'white',
    borderRightWidth: 1 * scale
  },
  rightWhitePickerView: {
    borderLeftColor: 'white',
    borderLeftWidth: 1 * scale
  },
  leftYellowPickerView: {
    borderRightColor: Colors.yellow,
    borderRightWidth: 1 * scale
  },
  rightYellowPickerView: {
    borderLeftColor: Colors.yellow,
    borderLeftWidth: 1 * scale
  },
  colorView: {
    width: 16 * scale,
    height: 14 * scale,
    marginHorizontal: -0.5 * scale
  },
  colorDesc: {
    color: Colors.black,
    fontSize: 12 * scale,
    fontFamily: Fonts.regular
  },
  logoCover: {
    position: 'absolute',
    top: 0,
    width: 28 * scale,
    height: 24 * scale,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
    zIndex: 1
  },
  teamLogo: {
    width: 27 * scale,
    height: 25 * scale,
    transform: [{ rotate: '-45deg' }]
  }
});
