import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Text, View, Header } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';

import { ModalCalendar } from '@Components';
import { MainContext, MainContextType } from '@Context/MainContext';
import { getNextDate, getPreviousDate } from '@Lib/utilities';
import { sportSorts } from '@Lib/constants';
import { responseFontSize } from '@Lib/function';
import { Colors, Svgs } from '@Theme';

import styles, { pickerSelectStyles, scale } from './styles';

const placeholder = {};
const SubHeader: React.FC = () => {
  const { setScheduleDate, scheduleDate, setSportName, sportName } = useContext(
    MainContext
  ) as MainContextType;

  const previousDate = () => {
    const previous = getPreviousDate(scheduleDate);
    setScheduleDate(previous);
  };

  const nextDate = () => {
    const next = getNextDate(scheduleDate);
    setScheduleDate(next);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Header
      style={styles.header}
      iosBarStyle={'light-content'}
      androidStatusBarColor={Colors.black}>
      <View style={styles.headerLeft}>
        <RNPickerSelect
          items={sportSorts}
          onValueChange={value => setSportName(value)}
          value={sportName}
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
          Icon={() => (
            <Icon
              name="chevron-down"
              style={styles.selectIcon}
              color={Colors.white}
            />
          )}
          style={pickerSelectStyles(responseFontSize(sportName, 0.3, 21))}
          placeholder={placeholder}
        />
      </View>
      <View style={styles.headerBody}>
        <TouchableOpacity onPress={previousDate}>
          <Icon type="Feather" name="chevron-left" style={styles.chevronIcon} />
        </TouchableOpacity>
        <Text style={styles.headerDateText}>
          {moment(scheduleDate).format('ll')}
        </Text>
        <TouchableOpacity onPress={nextDate}>
          <Icon
            type="Feather"
            name="chevron-right"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.headerRight} onPress={toggleModal}>
        <SvgXml
          xml={Svgs.calendarIcon}
          width={40 * scale}
          height={40 * scale}
        />
      </TouchableOpacity>
      <ModalCalendar
        isModalVisible={isModalVisible}
        selectDate={setScheduleDate}
        selectedDate={scheduleDate}
        toggleModal={toggleModal}
      />
    </Header>
  );
};

export default SubHeader;
