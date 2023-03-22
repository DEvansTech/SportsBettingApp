import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60 * scale,
    borderColor: 'transparent',
    borderBottomColor: Colors.black,
    borderWidth: 0.5 * scale
  },
  headerLeft: {
    marginLeft: 15 * scale,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerDateText: {
    fontSize: 18 * scale,
    color: Colors.black,
    fontFamily: Fonts.light
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
    color: Colors.black
  },
  selectIcon: {
    fontSize: 20 * scale,
    color: Colors.black
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
      color: Colors.black,
      paddingRight: 10 * scale
    },
    inputAndroid: {
      fontSize: fontSize * scale,
      letterSpacing: scale,
      fontFamily: Fonts.black,
      height: 50 * scale,
      borderColor: Colors.transparent,
      backgroundColor: Colors.transparent,
      color: Colors.black,
      paddingRight: 25 * scale,
      width: '100%'
    },
    iconContainer: {
      top: 15 * scale,
      right: 3 * scale
    }
  });
