import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  modalContainer: {
    position: 'relative',
    backgroundColor: 'white',
    paddingVertical: 40 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10 * scale,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 50 * scale,
    marginTop: 20 * scale
  },
  checkIcon: {
    fontSize: 100 * scale,
    color: Colors.green
  },
  checkText: {
    fontSize: 18 * scale,
    fontFamily: Fonts.bold,
    color: Colors.green,
    marginTop: 10 * scale
  }
});
