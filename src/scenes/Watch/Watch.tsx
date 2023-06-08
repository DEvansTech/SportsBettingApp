import React, { useContext } from 'react';
import { Container, Content } from 'native-base';

import { MainHeader, SubHeader, SignIn } from '@Components';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import MLB from './MLB';
import NFL from './NFL';
import NCAAF from './NCAAF';
import NCAAB from './NCAAB';
import NBA from './NBA';
import AllGames from './AllGames';

import styles from './styles';

const Watch: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { scheduleDate, sportName } = useContext(
    MainContext
  ) as MainContextType;

  return (
    <Container style={styles.background}>
      <SubHeader />
      {user ? (
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
          {sportName.trim() === 'ncaab' && (
            <NCAAB selectedDate={scheduleDate} sportName={sportName} />
          )}
          {sportName === 'nba' && (
            <NBA selectedDate={scheduleDate} sportName={sportName} />
          )}
        </Content>
      ) : (
        <SignIn />
      )}
    </Container>
  );
};

export default Watch;
