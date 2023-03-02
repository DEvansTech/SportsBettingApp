import React from 'react';
import { Icon, View, Text } from 'native-base';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import swipeDirections from 'react-native-swipe-gestures';

import { dateFormat } from '@Lib/utilities';
import { Colors } from '@Theme';

import { Props, CalendarDateType } from './types';
import styles, { calenderTheme } from './styles';

const ModalCalendar: React.FC<Props> = ({
  isModalVisible,
  selectDate,
  selectedDate,
  toggleModal,
  maxDate
}) => {
  const onDayPress = (day: CalendarDateType) => {
    selectDate(day.dateString);
    setTimeout(() => {
      toggleModal();
    }, 1000);
  };
  const setToday = () => {
    const currentDate = dateFormat(Date.now());
    selectDate(currentDate);
    setTimeout(() => {
      toggleModal();
    }, 1000);
  };

  const onSwipe = (gestureName: string) => {
    const { SWIPE_DOWN }: any = swipeDirections;

    switch (gestureName) {
      case SWIPE_DOWN:
        toggleModal();
        return;
    }
  };

  return (
    <GestureRecognizer onSwipe={direction => onSwipe(direction)}>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={300}
        animationOutTiming={300}>
        <View style={styles.modalContainer}>
          <Icon
            type="AntDesign"
            name="close"
            color={Colors.black}
            onPress={toggleModal}
            style={styles.modalCloseIcon}
          />
          <Text style={styles.calendarTitle}>Select Date</Text>
          <Calendar
            current={selectedDate}
            onDayPress={onDayPress}
            style={styles.calendarBody}
            enableSwipeMonths={true}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true
              }
            }}
            theme={calenderTheme}
            maxDate={maxDate}
          />
          <TouchableOpacity style={styles.modalBtn} onPress={setToday}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

export default ModalCalendar;
