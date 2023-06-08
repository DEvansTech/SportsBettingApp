import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';

import { MLBWatch, LogoSpinner } from '@Components';
import { dateCompare } from '@Lib/utilities';
import { RootState } from '@Store/store';
import { getGamedata } from '@Store/schedule/actions';

import styles from './styles';
import { Props } from './types';
import { GameDataType } from '@Store/types';

const MLB: React.FC<Props> = ({ selectedDate, sportName }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { matchSort } = useContext(MainContext) as MainContextType;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { gameData, loading, exitGame } = useSelector(
    (state: RootState) => state.schedule
  );

  const [mySelections, setMyselections] = useState<number[]>([]);
  const [loadingBar, setLoadingBar] = useState(true);

  const saveSelection = async (gameID: number) => {
    if (user) {
      const docRef = await firestore()
        .collection('mlbSelections')
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
        .collection('mlbSelections')
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
    return mySelections.includes(gameID);
  };

  useEffect(() => {
    (async function () {
      await getSelections();
      await dispatch(
        getGamedata(selectedDate, matchSort, sportName.trim(), 'baseball', true)
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
          'baseball',
          false
        )
      );
    }, 10000);
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
          'baseball',
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

  return (
    <>
      {loadingBar ? (
        <LogoSpinner />
      ) : (
        <View style={styles.container}>
          {gameData.length > 0 ? (
            gameData.map((match: GameDataType, index: number) => (
              <MLBWatch
                key={index}
                data={match}
                saveSelection={saveSelection}
                selectionState={checkSelectionState(match.gameID)}
                lastGame={gameData.length === index + 1}
              />
            ))
          ) : (
            <View style={styles.noDataView}>
              <Text style={styles.headerDateText}>
                {exitGame
                  ? 'No games.'
                  : dateCompare(selectedDate)
                  ? 'Not yet rated.'
                  : 'No recommendation.'}
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default MLB;
