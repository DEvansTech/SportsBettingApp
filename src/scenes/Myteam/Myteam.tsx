import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Icon,
  Input,
  Header
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { LogoSpinner, LoadingImage } from '@Components';
import { Routes } from '@Navigators/routes';
import { RootState } from '@Store/store';
import { getTeamsList } from '@Store/watch/actions';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import { checkTeamIcon } from '@Lib/function';
import { Colors } from '@Theme';
import { TeamType, FavortriteType } from './types';
import styles from './styles';

const Myteam: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user } = useContext(AuthContext) as AuthContextType;
  const { sportName } = useContext(MainContext) as MainContextType;
  const { myTeams, allTeams, teamsLoading } = useSelector(
    (state: RootState) => state.watch
  );

  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const [totalList, setTotalTeamList] = useState<TeamType[]>([]);
  const [allTeamList, setAllTeamList] = useState<TeamType[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<FavortriteType[]>([]);

  const [loadingBar, setLoadingBar] = useState(true);
  const [searchKey, setSearchKey] = useState('');

  const saveUserTeam = async (
    teamID: number,
    teamMarket: string,
    teamName: string,
    teamSort: string,
    team: TeamType
  ) => {
    let teams = [...favoriteTeams];
    const checkTeamIDs = totalList.filter(
      team =>
        team.team_market === teamMarket &&
        team.team_name === teamName &&
        team.team_sort !== teamSort
    );

    let existingTeams = [];

    if (checkTeamIDs.length > 0) {
      for (let i = 0; i < checkTeamIDs.length; i++) {
        existingTeams.push({
          teamID: checkTeamIDs[i].teamID,
          teamSort: checkTeamIDs[i].team_sort
        });
      }
    }

    existingTeams.push({ teamID, teamSort });

    const teamIDs = existingTeams.filter(
      (v, i, a) =>
        a.findIndex(
          v2 => v2.teamID === v.teamID && v2.teamSort === v.teamSort
        ) === i
    );

    for (let i = 0; i < teamIDs.length; i++) {
      let findIndex = teams.findIndex(
        (team: FavortriteType) =>
          team.teamID === teamIDs[i].teamID &&
          team.teamSort === teamIDs[i].teamSort
      );
      if (findIndex > -1) {
        teams.splice(findIndex, 1);
      } else {
        teams.push(teamIDs[i]);
      }
    }
    setFavoriteTeams(teams);
    saveFavoriteTeams(teams);
  };

  const checkFavoriteTeam = (teamID: number, teamSort: string) => {
    let findIndex = favoriteTeams.findIndex(
      (team: FavortriteType) =>
        team.teamID === teamID && team.teamSort === teamSort
    );
    return findIndex > -1 ? true : false;
  };

  const saveFavoriteTeams = (teams: FavortriteType[]) => {
    const docRef = firestore().collection('favoriteTeams').doc(user.uid);
    docRef.get().then(thisDoc => {
      if (thisDoc.exists) {
        docRef.update({
          teams: teams
        });
      } else {
        docRef.set({
          uid: user.uid,
          teams: teams
        });
      }
    });
  };

  const getFavoriteTeams = async () => {
    firestore()
      .collection('favoriteTeams')
      .doc(user.uid)
      .get()
      .then((doc: any) => {
        setFavoriteTeams(doc.data().teams);
      })
      .catch(() => {
        setFavoriteTeams([]);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoriteTeams();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const lists = myTeams.sort((a: any, b: any) =>
      a.team_market !== b.team_market
        ? a.team_market < b.team_market
          ? -1
          : 1
        : 0
    );
    if (searchKey !== '') {
      const filterList = lists.filter((list: TeamType) =>
        `${list.team_market} ${list.team_name}`
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
      setTeamList(filterList);
    } else {
      setTeamList(lists);
    }
  }, [myTeams, searchKey]);

  useEffect(() => {
    (async function () {
      const teamLists = [
        ...allTeams.mlbTeams,
        ...allTeams.nflTeams,
        ...allTeams.ncaafbTeams,
        ...allTeams.ncaabTeams,
        ...allTeams.nbaTeams
      ];
      setTotalTeamList(teamLists);

      const allTeamsList = teamLists
        .filter(
          (v, i, a) =>
            a.findIndex(
              v2 =>
                v2.team_market === v.team_market && v2.team_name === v.team_name
            ) === i
        )
        .sort((a: any, b: any) =>
          a.team_market !== b.team_market
            ? a.team_market < b.team_market
              ? -1
              : 1
            : 0
        );

      if (searchKey !== '') {
        const filterTeamsList = await allTeamsList.filter((list: TeamType) =>
          `${list.team_market} ${list.team_name}`
            .toLowerCase()
            .includes(searchKey.toLowerCase())
        );
        setAllTeamList(filterTeamsList);
      } else {
        setAllTeamList(allTeamsList);
      }
    })();
  }, [allTeams, searchKey]);

  useEffect(() => {
    setLoadingBar(true);
    dispatch(getTeamsList(sportName));
  }, []);

  useEffect(() => {
    if (!teamsLoading) {
      setTimeout(() => setLoadingBar(teamsLoading), 1500);
    } else {
      setLoadingBar(teamsLoading);
    }
  }, [teamsLoading]);

  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.black}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => navigation.navigate(Routes.Watch)}>
          <Icon type="Feather" name="chevron-left" style={styles.chevronIcon} />
          <Text style={styles.headerText}>
            My Teams ({sportName.toUpperCase()})
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.contentView}>
        {loadingBar ? (
          <LogoSpinner />
        ) : (
          <>
            <View style={styles.searchItem}>
              <Icon type="Feather" name="search" style={styles.searchIcon} />
              <Input
                placeholder="Search Team"
                autoCapitalize="words"
                value={searchKey}
                style={styles.input}
                onChangeText={text => setSearchKey(text)}
              />
            </View>
            <Content contentContainerStyle={styles.contentView}>
              {sportName === 'all' ? (
                allTeamList.length > 0 ? (
                  <>
                    {allTeamList.map((team: TeamType, index: number) => (
                      <View style={styles.teamView} key={index}>
                        <TouchableOpacity
                          onPress={() =>
                            saveUserTeam(
                              team.teamID,
                              team.team_market,
                              team.team_name,
                              team.team_sort,
                              team
                            )
                          }>
                          <Icon
                            type="AntDesign"
                            name={
                              checkFavoriteTeam(team.teamID, team.team_sort)
                                ? 'heart'
                                : 'hearto'
                            }
                            style={styles.favoriteIcon}
                          />
                        </TouchableOpacity>
                        <LoadingImage
                          source={checkTeamIcon(
                            team.team_sort,
                            team.team_sort === 'ncaafb' ||
                              team.team_sort === 'ncaab' ||
                              team.team_sort === 'nba'
                              ? team.teamIcon
                              : team.team_abbr
                          )}
                          style={styles.teamImg}
                        />
                        <Text style={styles.teamName}>
                          {team.team_market} {team.team_name}
                        </Text>
                      </View>
                    ))}
                  </>
                ) : (
                  <View style={styles.noDataView}>
                    <Text style={styles.headerDateText}>There is no team.</Text>
                  </View>
                )
              ) : teamList?.length > 0 ? (
                teamList.map((team: TeamType, index: number) => (
                  <View style={styles.teamView} key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        saveUserTeam(
                          team.teamID,
                          team.team_market,
                          team.team_name,
                          team.team_sort,
                          team
                        )
                      }>
                      <Icon
                        type="AntDesign"
                        name={
                          checkFavoriteTeam(team.teamID, team.team_sort)
                            ? 'heart'
                            : 'hearto'
                        }
                        style={styles.favoriteIcon}
                      />
                    </TouchableOpacity>
                    <LoadingImage
                      source={checkTeamIcon(
                        sportName,
                        sportName === 'ncaafb' ||
                          sportName.trim() === 'ncaab' ||
                          sportName === 'nba'
                          ? team.teamIcon
                          : team.team_abbr
                      )}
                      style={styles.teamImg}
                    />
                    <Text style={styles.teamName}>
                      {team.team_market} {team.team_name}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.noDataView}>
                  <Text style={styles.headerDateText}>There is no team.</Text>
                </View>
              )}
            </Content>
          </>
        )}
      </View>
    </Container>
  );
};

export default Myteam;
