import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity, FlatList } from 'react-native';
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
import { SvgXml } from 'react-native-svg';
import RNPickerSelect from 'react-native-picker-select';

import { Loading, LoadingImage } from '@Components';
import { Routes } from '@Navigators/routes';
import { RootState } from '@Store/store';
import { getTeamsList } from '@Store/watch/actions';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { MainContext, MainContextType } from '@Context/MainContext';
import { checkTeamIcon } from '@Lib/function';
import { Colors, Svgs } from '@Theme';
import { TeamType, FavortriteType } from './types';
import { sportSorts } from '@Lib/constants';
import styles, { scale, pickerSelectStyles } from './styles';

const Myteam: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user } = useContext(AuthContext) as AuthContextType;
  const { sportName, setSportName } = useContext(
    MainContext
  ) as MainContextType;

  const { myTeams, allTeams, teamsLoading } = useSelector(
    (state: RootState) => state.watch
  );

  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const [totalList, setTotalTeamList] = useState<TeamType[]>([]);
  const [allTeamList, setAllTeamList] = useState<TeamType[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<FavortriteType[]>([]);

  const [loadingBar, setLoadingBar] = useState(teamsLoading);
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
    if (isFocused) {
      getFavoriteTeams();
    }
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
  }, [sportName]);

  useEffect(() => {
    if (!teamsLoading) {
      setTimeout(() => setLoadingBar(teamsLoading), 1500);
    } else {
      setLoadingBar(teamsLoading);
    }
  }, [teamsLoading]);

  if (loadingBar) {
    return <Loading />;
  }

  const renderItem = (team: any) => {
    return (
      <View style={styles.teamView}>
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
            type="Ionicons"
            name={
              checkFavoriteTeam(team.teamID, team.team_sort)
                ? 'heart-sharp'
                : 'heart-outline'
            }
            style={
              checkFavoriteTeam(team.teamID, team.team_sort)
                ? styles.favoriteRedIcon
                : styles.favoriteBlackIcon
            }
          />
        </TouchableOpacity>
        <LoadingImage
          source={checkTeamIcon(team.team_sort, team.team_abbr)}
          style={styles.teamImg}
        />
        <Text style={styles.teamName}>
          {team.team_market} {team.team_name}
        </Text>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.headerDateText}>There is no team.</Text>
      </View>
    );
  };

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
          <Text style={styles.headerText}>My Teams</Text>
        </TouchableOpacity>
        <SvgXml xml={Svgs.userIcon} width={38 * scale} height={38 * scale} />
      </Header>
      <View style={styles.searchView}>
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
        <View style={styles.selectItem}>
          <RNPickerSelect
            items={sportSorts}
            onValueChange={value => setSportName(value)}
            value={sportName}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            Icon={() => (
              <Icon
                type="Entypo"
                name="chevron-thin-right"
                style={styles.selectIcon}
              />
            )}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </View>

      <Content contentContainerStyle={styles.contentView}>
        {sportName === 'all' ? (
          <FlatList
            data={allTeamList}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item: any) => item.team_uuid}
            ListEmptyComponent={renderEmpty}
          />
        ) : (
          <FlatList
            data={teamList}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item: any) => item.team_uuid}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </Content>
    </Container>
  );
};

export default Myteam;
