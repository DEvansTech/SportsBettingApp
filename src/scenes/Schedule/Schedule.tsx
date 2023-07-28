import React, { useContext } from 'react';

import { MainContext, MainContextType } from '@Context/MainContext';
import AllGames from './AllGames';
import MLB from './MLB';
import NFL from './NFL';
import NCAAF from './NCAAF';
import NBA from './NBA';
import NCAAB from './NCAAB';

const Schedule: React.FC = () => {
  const { scheduleDate, sportName } = useContext(
    MainContext
  ) as MainContextType;

  if (sportName === 'all') {
    return <AllGames selectedDate={scheduleDate} sportName={sportName} />;
  }
  if (sportName === 'mlb') {
    return <MLB selectedDate={scheduleDate} sportName={sportName} />;
  }
  if (sportName === 'nfl') {
    return <NFL selectedDate={scheduleDate} sportName={sportName} />;
  }
  if (sportName === 'ncaafb') {
    return <NCAAF selectedDate={scheduleDate} sportName={sportName} />;
  }
  if (sportName === 'nba') {
    return <NBA selectedDate={scheduleDate} sportName={sportName} />;
  }
  if (sportName === 'ncaab') {
    return <NCAAB selectedDate={scheduleDate} sportName={sportName} />;
  }
  return <></>;
};

export default Schedule;
