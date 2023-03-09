import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Text, View } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';

import { ModalCalendar } from '@Components';
import { MainContext, MainContextType } from '@Context/MainContext';
import { getNextDate, getPreviousDate } from '@Lib/utilities';
import { responseFontSize } from '@Lib/function';
import { Colors, Svgs } from '@Theme';

import styles, { pickerSelectStyles, scale } from './styles';

const options = [
  {
    label: 'ALL',
    value: 'all'
  },
  {
    label: 'MLB',
    value: 'mlb'
  },
  {
    label: 'NBA',
    value: 'nba'
  },
  {
    label: 'NCAAB',
    value: 'ncaab '
  },
  {
    label: 'NCAAF',
    value: 'ncaafb'
  },
  {
    label: 'NFL',
    value: 'nfl'
  }
];
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
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <RNPickerSelect
          items={options}
          onValueChange={value => setSportName(value)}
          value={sportName}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Icon
              name="chevron-down"
              style={styles.selectIcon}
              color={Colors.black}
            />
          )}
          style={pickerSelectStyles(responseFontSize(sportName, 0.29, 23))}
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
    </View>
  );
};

export default SubHeader;
