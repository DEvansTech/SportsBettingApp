import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
    height: 60 * scale,
    borderColor: 'transparent'
  },
  headerLeft: {
    marginLeft: 15 * scale,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerDateText: {
    fontSize: 18 * scale,
    color: Colors.white,
    fontFamily: Fonts.semiBold
  },
  headerRight: {
    marginRight: 11 * scale,
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerBody: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.55,
    marginHorizontal: 5 * scale
  },
  chevronIcon: {
    fontSize: 35 * scale,
    color: Colors.white
  },
  selectIcon: {
    fontSize: 20 * scale,
    color: Colors.white
  }
});

export const pickerSelectStyles = (fontSize: number) =>
  StyleSheet.create({
    inputIOS: {
      fontSize: fontSize * scale,
      letterSpacing: scale,
      fontFamily: Fonts.black,
      height: 50 * scale,
      borderColor: Colors.transparent,
      backgroundColor: Colors.transparent,
      color: Colors.white,
      paddingRight: 10 * scale
    },
    inputAndroid: {
      fontSize: fontSize * scale,
      letterSpacing: scale,
      fontFamily: Fonts.black,
      height: 50 * scale,
      borderColor: Colors.transparent,
      backgroundColor: Colors.transparent,
      color: Colors.white,
      paddingRight: 25 * scale,
      width: '100%'
    },
    iconContainer: {
      top: 15 * scale,
      right: 3 * scale
    }
  });
