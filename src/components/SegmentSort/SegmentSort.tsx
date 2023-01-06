import React, { useContext } from 'react';
import { View, Button, Text } from 'native-base';

import { MainContext, MainContextType } from '@Context/MainContext';
import styles from './styles';

const SegmentSort: React.FC = () => {
  const { setMatchSort, matchSort } = useContext(
    MainContext
  ) as MainContextType;

  return (
    <View style={styles.segmentView}>
      <Button
        first
        success
        small
        style={styles.segmentBtn1}
        active={matchSort === 'best'}
        bordered={matchSort !== 'best'}
        onPress={() => setMatchSort('best')}>
        <Text>Top Ranked</Text>
      </Button>
      <Button
        last
        success
        small
        style={styles.segmentBtn2}
        active={matchSort === 'all'}
        bordered={matchSort !== 'all'}
        onPress={() => setMatchSort('all')}>
        <Text>All</Text>
      </Button>
    </View>
  );
};

export default SegmentSort;
