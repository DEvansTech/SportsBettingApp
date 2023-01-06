import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  segmentView: {
    marginTop: 10 * scale,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  segmentBtn1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  segmentBtn2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
});
