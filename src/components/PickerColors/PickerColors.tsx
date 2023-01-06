import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';
import { ordinalSuffixOf, getTeamLogoColor } from '@Lib/utilities';
import { Colors } from '@Theme';
import styles, { scale } from './styles';
import { Props } from './types';

const PickerColors: React.FC<Props> = ({
  status,
  teamLogo,
  ballPosition,
  locationTeamAbbr,
  awayTeamAbbr,
  homeTeamAbbr,
  locationYardline,
  situationDown,
  situationYfd
}) => {
  const [yardLine, setYardLine] = useState(0);
  // const [awayTeamColor, setAwayTeamColor] = useState('#000000');
  // const [homeTeamColor, setHomeTeamColor] = useState('#f8f8ff');

  useEffect(() => {
    if (locationTeamAbbr) {
      setYardLine((Number(locationYardline) / 10) * 7.5);
    }
  }, [locationTeamAbbr, locationYardline]);

  // useEffect(() => {
  //   (async function () {
  //     const awayColor: any = await getTeamLogoColor(awayTeamAbbr);
  //     const homeColor: any = await getTeamLogoColor(homeTeamAbbr);
  //     setAwayTeamColor(awayColor);
  //     setAwayTeamColor(homeColor);
  //   })();
  // }, []);

  return (
    <View style={styles.content}>
      {status === 'inprogress' ? (
        <>
          <View
            style={[
              styles.logoCover,
              { [`${ballPosition}`]: yardLine * 2 * scale }
            ]}>
            <Image source={teamLogo as any} style={styles.teamLogo} />
          </View>
          <View style={styles.pickerView}>
            <View
              style={[
                styles.colorView,
                styles.leftWhitePickerView,
                { backgroundColor: Colors.black }
              ]}
            />

            <View
              style={[
                styles.colorView,
                styles.rightWhitePickerView,
                { backgroundColor: Colors.darkGreen }
              ]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.lightGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.lightGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.lightGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.lightGreen }]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkGreen }]}
            />
            <View
              style={[
                styles.colorView,
                styles.leftWhitePickerView,
                { backgroundColor: Colors.lightGreen }
              ]}
            />
            <View
              style={[
                styles.colorView,
                styles.rightWhitePickerView,
                { backgroundColor: Colors.darkerGrey }
              ]}
            />
          </View>

          <Text style={styles.colorDesc}>
            {ordinalSuffixOf(situationDown)} and {situationYfd},{' '}
            {locationTeamAbbr} {locationYardline}
          </Text>
        </>
      ) : (
        <>
          <View style={styles.pickerView}>
            <View
              style={[
                styles.colorView,
                styles.leftWhitePickerView,
                { backgroundColor: Colors.mediumGrey }
              ]}
            />
            <View
              style={[
                styles.colorView,
                styles.rightWhitePickerView,
                { backgroundColor: Colors.darkerGrey }
              ]}
            />
            <View
              style={[
                styles.colorView,
                { backgroundColor: Colors.lighterGrey }
              ]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkerGrey }]}
            />
            <View
              style={[
                styles.colorView,
                { backgroundColor: Colors.lighterGrey }
              ]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkerGrey }]}
            />
            <View
              style={[
                styles.colorView,
                { backgroundColor: Colors.lighterGrey }
              ]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkerGrey }]}
            />
            <View
              style={[
                styles.colorView,
                { backgroundColor: Colors.lighterGrey }
              ]}
            />
            <View
              style={[styles.colorView, { backgroundColor: Colors.darkerGrey }]}
            />
            <View
              style={[
                styles.colorView,
                styles.leftWhitePickerView,
                { backgroundColor: Colors.lighterGrey }
              ]}
            />
            <View
              style={[
                styles.colorView,
                styles.rightWhitePickerView,
                { backgroundColor: Colors.mediumGrey }
              ]}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PickerColors;
