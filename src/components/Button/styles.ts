import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  btnNormal: {
    marginTop: 15 * scale,
    borderRadius: 50 * scale,
    width: '100%',
    paddingHorizontal: 15 * scale,
    paddingVertical: 12 * scale,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18 * scale,
    fontFamily: Fonts.regular
  }
});
