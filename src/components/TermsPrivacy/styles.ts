import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20 * scale
  },
  verticalText: {
    fontSize: 30 * scale,
    color: 'white'
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18 * scale,
    color: 'white',
    textDecorationLine: 'underline',
    fontStyle: 'italic'
  }
});
