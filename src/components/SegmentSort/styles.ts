import { StyleSheet, Dimensions } from 'react-native';

import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  segmentView: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  segmentBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 15 * scale,
    backgroundColor: Colors.grey,
    borderBottomWidth: 0.5 * scale,
    borderColor: Colors.darkGrey
  },
  activeSegmentBtn: {
    backgroundColor: Colors.white
  },
  segmentBtnText: {
    color: 'white',
    fontFamily: Fonts.extraBold,
    fontSize: 22 * scale,
    textTransform: 'uppercase'
  },
  activeSegmentBtnText: {
    color: 'black'
  }
});
