import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import { MainContext, MainContextType } from '@Context/MainContext';
import styles from './styles';

const SegmentSort: React.FC = () => {
  const { setMatchSort, matchSort } = useContext(
    MainContext
  ) as MainContextType;

  return (
    <View style={styles.segmentView}>
      <TouchableOpacity
        style={[
          styles.segmentBtn,
          matchSort === 'best' && styles.activeSegmentBtn
        ]}
        onPress={() => setMatchSort('best')}>
        <Text
          style={[
            styles.segmentBtnText,
            matchSort === 'best' && styles.activeSegmentBtnText
          ]}>
          Top Ranked
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.segmentBtn,
          matchSort === 'all' && styles.activeSegmentBtn
        ]}
        onPress={() => setMatchSort('all')}>
        <Text
          style={[
            styles.segmentBtnText,
            matchSort === 'all' && styles.activeSegmentBtnText
          ]}>
          All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SegmentSort;
