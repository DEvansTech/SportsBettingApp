import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content, Text, Icon, View } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { SubHeader, MLBWatch, Loading } from '@Components';
import { getTeamsGamedata, getSelectionGameData } from '@Store/watch/actions';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';
import { Colors } from '@Theme';
import { RootState } from '@Store/store';
import { GameDataType } from '@Store/types';

import { Props, FavortriteType } from './types';
import styles from './styles';

const MLB: React.FC<Props> = ({ selectedDate, sportName }) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { user } = useContext(AuthContext) as AuthContextType;

  const { teamsGamedata, selectionsGamedata, teamsLoading, selectionsLoading } =
    useSelector((state: RootState) => state.watch);

  const [favoriteTeams, setFavoriteTeams] = useState<number[]>([]);
  const [mySelections, setMyselections] = useState<number[]>([]);
  const [loadingBar, setLoadingBar] = useState(true);

  const closeSelection = async (gameID: number) => {
    let selections = [...mySelections];
    if (selections.includes(gameID)) {
      selections = await removeSelection(selections, gameID);
    }
    setMyselections(selections);
    saveSelections(selections);
  };

  const removeSelection = (selections: number[], gameID: number) => {
    return selections.filter(selection => selection !== gameID);
  };

  const saveSelections = (gameIDs: number[]) => {
    if (user) {
      const docRef = firestore().collection('mlbSelections').doc(user.uid);
      docRef.get().then(thisDoc => {
        if (thisDoc.exists) {
          docRef.update({
            gameIDs: gameIDs
          });
        }
      });
    }
  };

  const getFavoriteTeams = async () => {
    if (user) {
      firestore()
        .collection('favoriteTeams')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            let teams = [];
            if (doc.data().teams.length > 0) {
              teams = doc
                .data()
                .teams.map((team: FavortriteType) => {
                  if (team.teamSort === 'mlb') return team.teamID;
                })
                .filter(
                  (notUndefined: undefined) => notUndefined !== undefined
                );
            }
            setFavoriteTeams(teams);
          }
        })
        .catch(() => {
          setFavoriteTeams([]);
        });
    }
  };
  const getSelections = async () => {
    if (user) {
      firestore()
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

  useEffect(() => {
    dispatch(
      getTeamsGamedata(
        selectedDate,
        favoriteTeams.join(),
        sportName,
        'baseball',
        true
      )
    );
    dispatch(
      getSelectionGameData(
        selectedDate,
        mySelections.join(),
        sportName,
        'baseball',
        true
      )
    );
  }, [selectedDate]);

  useEffect(() => {
    dispatch(
      getSelectionGameData(
        selectedDate,
        mySelections.join(),
        sportName,
        'baseball',
        false
      )
    );
  }, [mySelections]);

  useEffect(() => {
    dispatch(
      getTeamsGamedata(
        selectedDate,
        favoriteTeams.join(),
        sportName,
        'baseball',
        false
      )
    );
  }, [favoriteTeams]);

  useEffect(() => {
    getFavoriteTeams();
    getSelections();
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        getTeamsGamedata(
          selectedDate,
          favoriteTeams.join(),
          sportName,
          'baseball',
          false
        )
      );
      dispatch(
        getSelectionGameData(
          selectedDate,
          mySelections.join(),
          sportName,
          'baseball',
          false
        )
      );
    }, 10000);
    if (!isFocused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocused, mySelections, selectedDate, favoriteTeams]);

  useEffect(() => {
    if (!teamsLoading || !selectionsLoading) {
      setTimeout(() => setLoadingBar(teamsLoading || selectionsLoading), 2000);
    } else {
      setLoadingBar(teamsLoading || selectionsLoading);
    }
  }, [teamsLoading, selectionsLoading]);

  if (loadingBar) {
    return <Loading />;
  }
  return (
    <Container style={styles.background}>
      <SubHeader />
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.myTeamsView}>
            <Text style={styles.teamPlusText}>My Teams</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.MyTeam)}>
              <Icon
                type="AntDesign"
                name="pluscircleo"
                color={Colors.black}
                style={styles.teamPlusIcon}
              />
            </TouchableOpacity>
          </View>
          {teamsGamedata.length > 0 &&
            teamsGamedata.map((match: GameDataType, index: number) => (
              <MLBWatch
                data={match}
                key={index}
                lastGame={teamsGamedata.length === index + 1}
              />
            ))}
          <View style={styles.myTeamsView}>
            <Text style={styles.teamPlusText}>My Selections</Text>
          </View>
          {selectionsGamedata.length > 0 &&
            selectionsGamedata.map((match: GameDataType, index: number) => (
              <View style={styles.selectionIconView} key={index}>
                <TouchableOpacity onPress={() => closeSelection(match.gameID)}>
                  <Icon
                    type="AntDesign"
                    name="minuscircleo"
                    color={Colors.black}
                    style={styles.teamCloseIcon}
                  />
                </TouchableOpacity>
                <View style={styles.selectionView}>
                  <MLBWatch
                    data={match}
                    lastGame={selectionsGamedata.length === index + 1}
                  />
                </View>
              </View>
            ))}
        </View>
      </Content>
    </Container>
  );
};

export default MLB;
