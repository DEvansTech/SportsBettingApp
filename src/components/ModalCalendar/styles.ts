import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  modalContainer: {
    position: 'relative',
    backgroundColor: 'white',
    paddingVertical: 30 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10 * scale,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalCloseIcon: {
    fontSize: 20 * scale,
    position: 'absolute',
    top: 15 * scale,
    right: 15 * scale
  },

  calendarBody: {
    width: deviceWidth - 70 * scale
  },
  calendarTitle: {
    fontSize: 28 * scale,
    fontFamily: Fonts.light
  },
  modalBtn: {
    alignSelf: 'center',
    marginTop: 10 * scale,
    marginHorizontal: 5 * scale,
    backgroundColor: Colors.green,
    paddingHorizontal: 30 * scale,
    paddingVertical: 10 * scale,
    borderRadius: 20 * scale
  },
  todayText: {
    fontSize: 18 * scale,
    fontFamily: Fonts.regular,
    color: 'white'
  }
});

export const calenderTheme = {
  textSectionTitleColor: Colors.black,
  textSectionTitleDisabledColor: Colors.black,
  selectedDayBackgroundColor: Colors.green,
  selectedDayTextColor: '#ffffff',
  todayTextColor: Colors.green,
  dayTextColor: Colors.black,
  textDisabledColor: Colors.grey,
  disabledArrowColor: Colors.black,
  monthTextColor: Colors.black,
  indicatorColor: 'blue',
  textDayFontFamily: Fonts.light,
  textMonthFontFamily: Fonts.black,
  textDayHeaderFontFamily: Fonts.black,
  arrowColor: Colors.black,
  textDayFontSize: 17 * scale,
  textMonthFontSize: 18 * scale,
  textDayHeaderFontSize: 12 * scale
};
