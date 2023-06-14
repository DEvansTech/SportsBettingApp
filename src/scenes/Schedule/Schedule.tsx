import React, { useContext } from 'react';
import { Container, Content } from 'native-base';

import { MainContext, MainContextType } from '@Context/MainContext';
import { SubHeader, SegmentSort } from '@Components';
import AllGames from './AllGames';
import MLB from './MLB';
import NFL from './NFL';
import NCAAF from './NCAAF';
import NBA from './NBA';
import NCAAB from './NCAAB';

import styles from './styles';

const Schedule: React.FC = () => {
  const { scheduleDate, sportName } = useContext(
    MainContext
  ) as MainContextType;

  return (
    <Container style={styles.background}>
      <SubHeader />
      <SegmentSort />
      <Content contentContainerStyle={styles.contentView}>
        {sportName === 'all' && (
          <AllGames selectedDate={scheduleDate} sportName={sportName} />
        )}
        {sportName === 'mlb' && (
          <MLB selectedDate={scheduleDate} sportName={sportName} />
        )}
        {sportName === 'nfl' && (
          <NFL selectedDate={scheduleDate} sportName={sportName} />
        )}
        {sportName === 'ncaafb' && (
          <NCAAF selectedDate={scheduleDate} sportName={sportName} />
        )}
        {sportName === 'nba' && (
          <NBA selectedDate={scheduleDate} sportName={sportName} />
        )}
        {sportName.trim() === 'ncaab' && (
          <NCAAB selectedDate={scheduleDate} sportName={sportName} />
        )}
      </Content>
    </Container>
  );
};

export default Schedule;
