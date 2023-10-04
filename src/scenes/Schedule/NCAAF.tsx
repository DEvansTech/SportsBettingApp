import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Container, Content, View, Text } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { SubHeader, SegmentSort, NCAAFWatch, Loading } from '@Components';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';

import { RootState } from '@Store/store';
import { getGamedata } from '@Store/schedule/actions';
import { checkTopRankedGame } from '@Lib/function';

import styles from './styles';
import { Props } from './types';
import { GameDataType } from '@Store/types';

const NCAAF: React.FC<Props> = ({ selectedDate, sportName }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { matchSort } = useContext(MainContext) as MainContextType;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { gameData, loading, exitGame } = useSelector(
    (state: RootState) => state.schedule
  );
  const [mySelections, setMyselections] = useState<number[]>();
  const [loadingBar, setLoadingBar] = useState(true);
  const [loadGameData, setLoadGameData] = useState<GameDataType[]>([]);

  const saveSelection = async (gameID: number) => {
    if (user) {
      const docRef = await firestore()
        .collection('ncaafSelections')
        .doc(user.uid);
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
        .collection('ncaafSelections')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            setMyselections(doc.data().gameIDs);
          }
        })
        .catch(() => {
          setMyselections([]);
        });
    }
  };

  const checkSelectionState = (gameID: number) => {
    return mySelections?.includes(gameID);
  };

  useEffect(() => {
    (async function () {
      await getSelections();

      await dispatch(
        getGamedata(selectedDate, matchSort, sportName.trim(), 'football', true)
      );
    })();
    setLoadingBar(true);
  }, [selectedDate, sportName, matchSort]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        getGamedata(
          selectedDate,
          matchSort,
          sportName.trim(),
          'football',
          false
        )
      );
    }, 2000);
    if (!isFocused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocused, selectedDate, matchSort]);

  useEffect(() => {
    (async function () {
      await getSelections();
      await dispatch(
        getGamedata(
          selectedDate,
          matchSort,
          sportName.trim(),
          'football',
          false
        )
      );
    })();
  }, [isFocused]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setLoadingBar(loading), 2000);
    } else {
      setLoadingBar(loading);
    }
  }, [loading]);

  useEffect(() => {
    // if (gameData?.length > 0) {
      if (matchSort === 'best') {
        const data = gameData.filter((game: GameDataType) =>
          checkTopRankedGame(game)
        );
        setLoadGameData(data);
      } else {
        setLoadGameData(gameData);
      }
    // }
  }, [gameData]);

  const renderItem = (match: GameDataType, index: number) => {
    return (
      <NCAAFWatch
        data={match}
        saveSelection={saveSelection}
        selectionState={checkSelectionState(match.gameID)}
        lastGame={loadGameData.length === index + 1}
      />
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
          data={loadGameData}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item: any) => item.game_uuid}
          ListEmptyComponent={renderEmpty}
        />
      </Content>
    </Container>
  );
};

export default NCAAF;
