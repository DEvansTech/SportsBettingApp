import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { Text, Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {
  MLBWatch,
  NFLWatch,
  NCAAFWatch,
  NCAABWatch,
  LogoSpinner,
  NBAWatch
} from '@Components';
import {
  getTeamsAllGamedata,
  getSelectionAllGameData
} from '@Store/watch/actions';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Colors } from '@Theme';
import { RootState } from '@Store/store';
import { Routes } from '@Navigators/routes';
import { GameDataType } from '@Store/types';

import { Props, FavortriteType } from './types';
import styles from './styles';

const AllGames: React.FC<Props> = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const { user } = useContext(AuthContext) as AuthContextType;

  const { teamsGamedata, selectionsGamedata, teamsLoading, selectionsLoading } =
    useSelector((state: RootState) => state.watch);

  const [mlbSelections, setMlbselections] = useState<number[]>([]);
  const [nflSelections, setNflselections] = useState<number[]>([]);
  const [ncaafSelections, setNcaafselections] = useState<number[]>([]);
  const [ncaabSelections, setNcaabselections] = useState<number[]>([]);
  const [nbaSelections, setNbaselections] = useState<number[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<FavortriteType[]>([]);

  const [loadingBar, setLoadingBar] = useState(true);

  const closeSelection = async (
    gameID: number,
    sportName: string | undefined
  ) => {
    let selections: number[] = [];

    switch (sportName) {
      case 'MLB':
        selections = mlbSelections;
        break;
      case 'NFL':
        selections = nflSelections;
        break;
      case 'NCAAFB':
        selections = ncaafSelections;
        break;
      case 'NCAAM':
        selections = ncaabSelections;
        break;
      case 'NBA':
        selections = nbaSelections;
        break;
      default:
        break;
    }

    if (selections.includes(gameID)) {
      selections = await removeSelection(selections, gameID);
    }
    saveSelections(selections, sportName);
    switch (sportName) {
      case 'MLB':
        setMlbselections(selections);
        break;
      case 'NFL':
        setNflselections(selections);
        break;
      case 'NCAAFB':
        setNcaafselections(selections);
        break;
      case 'NCAAM':
        setNcaabselections(selections);
        break;
      case 'NBA':
        setNbaselections(selections);
        break;
      default:
        break;
    }
  };

  const removeSelection = (selections: number[], gameID: number) => {
    return selections.filter(selection => selection !== gameID);
  };

  const saveSelections = (gameIDs: number[], sportName: string | undefined) => {
    if (user) {
      let selections = '';
      switch (sportName) {
        case 'MLB':
          selections = 'mlbSelections';
          break;
        case 'NFL':
          selections = 'nflSelections';
          break;
        case 'NCAAFB':
          selections = 'ncaafSelections';
          break;
        case 'NCAAM':
          selections = 'ncaabSelections';
          break;
        case 'NBA':
          selections = 'nbaSelections';
          break;
        default:
          break;
      }
      const docRef = firestore().collection(selections).doc(user.uid);
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
      const favDoc: any = await firestore()
        .collection('favoriteTeams')
        .doc(user.uid)
        .get();

      if (favDoc.exists) {
        setFavoriteTeams(favDoc.data().teams);
      } else {
        setFavoriteTeams([]);
      }
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
    }
  };

  useEffect(() => {
    const mySelections = {
      mlb: mlbSelections,
      nfl: nflSelections,
      ncaaf: ncaafSelections,
      ncaab: ncaabSelections,
      nba: nbaSelections
    };
    dispatch(getTeamsAllGamedata(selectedDate, favoriteTeams, true));
    dispatch(getSelectionAllGameData(selectedDate, mySelections, true));
  }, [selectedDate]);

  useEffect(() => {
    const mySelections = {
      mlb: mlbSelections,
      nfl: nflSelections,
      ncaaf: ncaafSelections,
      ncaab: ncaabSelections,
      nba: nbaSelections
    };
    dispatch(getSelectionAllGameData(selectedDate, mySelections, false));
  }, [
    mlbSelections,
    nflSelections,
    ncaafSelections,
    ncaabSelections,
    nbaSelections
  ]);

  useEffect(() => {
    dispatch(getTeamsAllGamedata(selectedDate, favoriteTeams, false));
  }, [favoriteTeams]);

  useEffect(() => {
    getFavoriteTeams();
    getSelections();
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mySelections = {
        mlb: mlbSelections,
        nfl: nflSelections,
        ncaaf: ncaafSelections,
        ncaab: ncaabSelections,
        nba: nbaSelections
      };

      dispatch(getTeamsAllGamedata(selectedDate, favoriteTeams, false));
      dispatch(getSelectionAllGameData(selectedDate, mySelections, false));
    }, 10000);
    if (!isFocused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    isFocused,
    mlbSelections,
    nflSelections,
    ncaafSelections,
    ncaabSelections,
    nbaSelections,
    selectedDate,
    favoriteTeams
  ]);

  useEffect(() => {
    if (!teamsLoading || !selectionsLoading) {
      setTimeout(() => setLoadingBar(teamsLoading || selectionsLoading), 3000);
    } else {
      setLoadingBar(teamsLoading || selectionsLoading);
    }
  }, [teamsLoading, selectionsLoading]);

  return (
    <>
      {loadingBar ? (
        <LogoSpinner />
      ) : (
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
              <View key={index}>
                {match.sport_name === 'MLB' && (
                  <MLBWatch
                    data={match}
                    lastGame={teamsGamedata.length === index + 1}
                  />
                )}
                {match.sport_name === 'NFL' && (
                  <NFLWatch
                    data={match}
                    lastGame={teamsGamedata.length === index + 1}
                  />
                )}
                {match.sport_name === 'NCAAFB' && (
                  <NCAAFWatch
                    data={match}
                    lastGame={teamsGamedata.length === index + 1}
                  />
                )}
                {match.sport_name === 'NCAAM' && (
                  <NCAABWatch
                    data={match}
                    lastGame={teamsGamedata.length === index + 1}
                  />
                )}
                {match.sport_name === 'NBA' && (
                  <NBAWatch
                    data={match}
                    lastGame={teamsGamedata.length === index + 1}
                  />
                )}
              </View>
            ))}
          <View style={styles.myTeamsView}>
            <Text style={styles.teamPlusText}>My Selections</Text>
          </View>
          {selectionsGamedata.length > 0 &&
            selectionsGamedata.map((match: GameDataType, index: number) => (
              <View style={styles.selectionIconView} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    closeSelection(match.gameID, match.sport_name)
                  }>
                  <Icon
                    type="AntDesign"
                    name="minuscircleo"
                    color={Colors.black}
                    style={styles.teamCloseIcon}
                  />
                </TouchableOpacity>
                <View style={styles.selectionView}>
                  {match.sport_name === 'MLB' && (
                    <MLBWatch
                      data={match}
                      lastGame={teamsGamedata.length === index + 1}
                    />
                  )}
                  {match.sport_name === 'NFL' && (
                    <NFLWatch
                      data={match}
                      lastGame={teamsGamedata.length === index + 1}
                    />
                  )}
                  {match.sport_name === 'NCAAFB' && (
                    <NCAAFWatch
                      data={match}
                      lastGame={teamsGamedata.length === index + 1}
                    />
                  )}
                  {match.sport_name === 'NCAAM' && (
                    <NCAABWatch
                      data={match}
                      lastGame={teamsGamedata.length === index + 1}
                    />
                  )}
                  {match.sport_name === 'NBA' && (
                    <NBAWatch
                      data={match}
                      lastGame={teamsGamedata.length === index + 1}
                    />
                  )}
                </View>
              </View>
            ))}
        </View>
      )}
    </>
  );
};

export default AllGames;
