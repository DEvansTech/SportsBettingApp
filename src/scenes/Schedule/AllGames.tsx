import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Container, Content, View, Text } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {
  SubHeader,
  SegmentSort,
  NFLWatch,
  MLBWatch,
  NCAAFWatch,
  NBAWatch,
  Loading,
  NCAABWatch
} from '@Components';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import { RootState } from '@Store/store';
import { getGamedata } from '@Store/schedule/actions';

import styles from './styles';
import { Props } from './types';

const AllGames: React.FC<Props> = ({ selectedDate, sportName }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { matchSort } = useContext(MainContext) as MainContextType;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { gameData, loading, exitGame } = useSelector(
    (state: RootState) => state.schedule
  );

  const [mlbSelections, setMlbselections] = useState<number[]>();
  const [nflSelections, setNflselections] = useState<number[]>();
  const [ncaafSelections, setNcaafselections] = useState<number[]>();
  const [nbaSelections, setNbaselections] = useState<number[]>();
  const [ncaabSelections, setNcaabselections] = useState<number[]>();

  const [loadingBar, setLoadingBar] = useState(true);

  const saveSelection = async (gameID: number, gameSort: string) => {
    if (user) {
      const selection = `${gameSort}Selections`;
      const docRef = await firestore().collection(selection).doc(user.uid);
      docRef.get().then(async (thisDoc: any) => {
        if (thisDoc.exists) {
          const selections = [...thisDoc.data().gameIDs];
          if (!selections.includes(gameID)) {
            selections.push(gameID);
          } else {
            const index = selections.indexOf(gameID);
            selections.splice(index, 1);
          }
          docRef
            .update({
              gameIDs: selections
            })
            .then(() => {
              getSelections();
            });
        } else {
          const selections = [gameID];
          docRef
            .set({
              uid: user.uid,
              gameIDs: selections
            })
            .then(() => {
              getSelections();
            });
        }
      });
    }
  };

  const getSelections = async () => {
    if (user) {
      await firestore()
        .collection('mlbSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setMlbselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setMlbselections([]);
        });
      await firestore()
        .collection('nflSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setNflselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setNflselections([]);
        });
      await firestore()
        .collection('ncaafSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setNcaafselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setNcaafselections([]);
        });
      await firestore()
        .collection('nbaSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setNbaselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setNbaselections([]);
        });
      await firestore()
        .collection('ncaabSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setNcaabselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setNcaabselections([]);
        });
    }
  };

  const checkSelectionState = (gameID: number, gameSort: string) => {
    switch (gameSort) {
      case 'mlb':
        return mlbSelections?.includes(gameID);
      case 'nfl':
        return nflSelections?.includes(gameID);
      case 'ncaaf':
        return ncaafSelections?.includes(gameID);
      case 'nba':
        return nbaSelections?.includes(gameID);
      case 'ncaab':
        return ncaabSelections?.includes(gameID);
      default:
        return false;
    }
  };

  useEffect(() => {
    (async function () {
      await dispatch(
        getGamedata(selectedDate, matchSort, sportName.trim(), 'all', true)
      );
    })();
    setLoadingBar(true);
  }, [selectedDate, sportName, matchSort]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        getGamedata(selectedDate, matchSort, sportName.trim(), 'all', false)
      );
    }, 10000);
    if (!isFocused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocused, selectedDate, matchSort]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setLoadingBar(loading), 2000);
    } else {
      setLoadingBar(loading);
    }
  }, [loading]);

  useEffect(() => {
    (async function () {
      await getSelections();
      await dispatch(
        getGamedata(selectedDate, matchSort, sportName.trim(), 'all', false)
      );
    })();
  }, [isFocused]);

  const renderItem = (match: any, index: number) => {
    return (
      <>
        {match.sport_name === 'MLB' && (
          <MLBWatch
            data={match}
            key={index}
            saveSelection={saveSelection}
            selectionState={checkSelectionState(match.gameID, 'mlb')}
            lastGame={gameData.length === index + 1}
          />
        )}
        {match.sport_name === 'NFL' && (
          <NFLWatch
            data={match}
            key={index}
            saveSelection={saveSelection}
            selectionState={checkSelectionState(match.gameID, 'nfl')}
            lastGame={gameData.length === index + 1}
          />
        )}
        {match.sport_name === 'NCAAFB' && (
          <NCAAFWatch
            data={match}
            key={index}
            saveSelection={saveSelection}
            selectionState={checkSelectionState(match.gameID, 'ncaaf')}
            lastGame={gameData.length === index + 1}
          />
        )}
        {match.sport_name === 'NBA' && (
          <NBAWatch
            data={match}
            key={index}
            saveSelection={saveSelection}
            selectionState={checkSelectionState(match.gameID, 'nba')}
            lastGame={gameData.length === index + 1}
          />
        )}
        {match.sport_name === 'NCAAM' && (
          <NCAABWatch
            data={match}
            key={index}
            saveSelection={saveSelection}
            selectionState={checkSelectionState(match.gameID, 'ncaab')}
            lastGame={gameData.length === index + 1}
          />
        )}
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.headerDateText}>
          {exitGame ? 'No games.' : 'No recommendation.'}
        </Text>
      </View>
    );
  };

  if (loadingBar) {
    return <Loading />;
  }

  return (
    <Container style={styles.background}>
      <SubHeader />
      <SegmentSort />
      <Content contentContainerStyle={styles.contentView}>
        <FlatList
          data={gameData}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item: any) => item.game_uuid}
          ListEmptyComponent={renderEmpty}
        />
      </Content>
    </Container>
  );
};

export default AllGames;
