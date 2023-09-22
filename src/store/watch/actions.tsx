import { Dispatch } from 'redux';
import axios from 'axios';

import { API_URI, API_KEY } from '@env';
import { ACTION_TYPES } from '@Store/actionTypes';
import { ISelections } from '@Scenes/Watch/types';
import { TeamType, FavortriteType } from '@Scenes/Myteam/types';

export const getTeamsList = (sportID: string) => {
  return async (dispatch: Dispatch) => {
    // dispatch({ type: ACTION_TYPES.WATCH.GET_LOADING_TEAMS, payload: true });
    if (sportID === 'all') {
      const mlbURI = `${API_URI}teamdata?apikey=${API_KEY}&sportID=mlb`;
      const nflURI = `${API_URI}teamdata?apikey=${API_KEY}&sportID=nfl`;
      const ncaafbURI = `${API_URI}teamdata?apikey=${API_KEY}&sportID=ncaafb`;
      const ncaabURI = `${API_URI}teamdata?apikey=${API_KEY}&sportID=ncaab`;
      const nbaURI = `${API_URI}teamdata?apikey=${API_KEY}&sportID=nba`;

      await axios
        .all([
          axios.get(mlbURI),
          axios.get(nflURI),
          axios.get(ncaafbURI),
          axios.get(ncaabURI),
          axios.get(nbaURI)
        ])
        .then(
          axios.spread(
            async (mlbTeams, nflTeams, ncaafbTeams, ncaabTeams, nbaTeams) => {
              const mlb = await mlbTeams.data[0].teams.map((obj: TeamType) => ({
                ...obj,
                team_sort: 'mlb'
              }));
              const nfl = await nflTeams.data[0].teams.map((obj: TeamType) => ({
                ...obj,
                team_sort: 'nfl'
              }));
              const ncaafb = await ncaafbTeams.data[0].teams.map(
                (obj: TeamType) => ({
                  ...obj,
                  team_sort: 'ncaafb'
                })
              );
              const ncaab = await ncaabTeams.data[0].teams.map(
                (obj: TeamType) => ({
                  ...obj,
                  team_sort: 'ncaab'
                })
              );
              const nba = await nbaTeams.data[0].teams.map((obj: TeamType) => ({
                ...obj,
                team_sort: 'nba'
              }));

              let allTeams = {
                mlbTeams: mlb,
                nflTeams: nfl,
                ncaafbTeams: ncaafb,
                ncaabTeams: ncaab,
                nbaTeams: nba
              };

              dispatch({
                type: ACTION_TYPES.WATCH.GET_ALL_TEAMS_LIST,
                payload: allTeams
              });
            }
          )
        );
    } else {
      const result = await axios.get(
        `${API_URI}teamdata?apikey=${API_KEY}&sportID=${sportID.trim()}`
      );
      const teams = await result.data[0].teams.map((obj: TeamType) => ({
        ...obj,
        team_sort: sportID.trim()
      }));
      dispatch({
        type: ACTION_TYPES.WATCH.GET_TEAMS_LIST,
        payload: teams
      });
    }
  };
};

export const getTeamsGamedata = (
  date: string,
  teamIDs: string,
  sportID: string,
  sportType: string,
  loading: boolean
) => {
  return async (dispatch: Dispatch) => {
    if (loading) {
      dispatch({ type: ACTION_TYPES.WATCH.GET_LOADING_TEAMS, payload: true });
    }
    if (teamIDs.length !== 0) {
      const offset = new Date().getTimezoneOffset();
      const result = await axios.get(
        `${API_URI}${sportType}gamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&TeamIDs=${teamIDs}&sportID=${sportID}`
      );
      dispatch({
        type: ACTION_TYPES.WATCH.GET_TEAMS_GAME_DATA,
        payload: result.data[0].games
      });
    } else {
      dispatch({
        type: ACTION_TYPES.WATCH.GET_TEAMS_GAME_DATA,
        payload: []
      });
    }
  };
};

export const getTeamsAllGamedata = (
  date: string,
  teamIDs: FavortriteType[],
  loading: boolean
) => {
  return async (dispatch: Dispatch) => {
    if (loading) {
      dispatch({ type: ACTION_TYPES.WATCH.GET_LOADING_TEAMS, payload: true });
    }
    const offset = new Date().getTimezoneOffset();

    let allMlbGames = [];
    let allNflGames = [];
    let allNcaafbGames = [];
    let allNcaabGames = [];
    let allNbaGames = [];

    let mlbTeamIDs = [];
    let nflTeamIDs = [];
    let ncaafbTeamIDs = [];
    let ncaabTeamIDs = [];
    let nbaTeamIDs = [];

    if (teamIDs.length > 0) {
      mlbTeamIDs = teamIDs
        .map((team: FavortriteType) => {
          if (team.teamSort === 'mlb') {
            return team.teamID;
          }
        })
        .filter(notUndefined => notUndefined !== undefined);
      nflTeamIDs = teamIDs
        .map((team: FavortriteType) => {
          if (team.teamSort === 'nfl') return team.teamID;
        })
        .filter(notUndefined => notUndefined !== undefined);
      ncaafbTeamIDs = teamIDs
        .map((team: FavortriteType) => {
          if (team.teamSort === 'ncaafb') return team.teamID;
        })
        .filter(notUndefined => notUndefined !== undefined);
      ncaabTeamIDs = teamIDs
        .map((team: FavortriteType) => {
          if (team.teamSort === 'ncaab') return team.teamID;
        })
        .filter(notUndefined => notUndefined !== undefined);
      nbaTeamIDs = teamIDs
        .map((team: FavortriteType) => {
          if (team.teamSort === 'nba') return team.teamID;
        })
        .filter(notUndefined => notUndefined !== undefined);

      if (mlbTeamIDs.length > 0) {
        const allMlbURI = `${API_URI}baseballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&teamIDs=${mlbTeamIDs.join()}`;
        const resultMLB = await axios.get(allMlbURI);
        allMlbGames = resultMLB.data[0]?.games;
      }
      if (nflTeamIDs.length > 0) {
        const allNflURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nfl&teamIDs=${nflTeamIDs.join()}`;
        const resultNFL = await axios.get(allNflURI);
        allNflGames = resultNFL.data[0]?.games;
      }
      if (ncaafbTeamIDs.length > 0) {
        const allNcaafbURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaafb&teamIDs=${ncaafbTeamIDs.join()}`;
        const resultNcaaf = await axios.get(allNcaafbURI);
        allNcaafbGames = resultNcaaf.data[0]?.games;
      }
      if (ncaabTeamIDs.length > 0) {
        const allNcaabURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaab&teamIDs=${ncaabTeamIDs.join()}`;
        const resultNcaab = await axios.get(allNcaabURI);
        allNcaabGames = resultNcaab.data[0]?.games;
      }
      if (nbaTeamIDs.length > 0) {
        const allNbaURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nba&teamIDs=${nbaTeamIDs.join()}`;
        const resultNba = await axios.get(allNbaURI);
        allNbaGames = resultNba.data[0]?.games;
      }
    }

    const allGames = [
      ...allMlbGames,
      ...allNflGames,
      ...allNcaafbGames,
      ...allNcaabGames,
      ...allNbaGames
    ].sort(
      (a, b) =>
        new Date(a.gameUTCDateTime).valueOf() -
        new Date(b.gameUTCDateTime).valueOf()
    );

    dispatch({
      type: ACTION_TYPES.WATCH.GET_TEAMS_GAME_DATA,
      payload: allGames
    });
  };
};

export const getSelectionGameData = (
  date: string,
  gameIDs: string,
  sportID: string,
  sportType: string,
  loading: boolean
) => {
  return async (dispatch: Dispatch) => {
    if (gameIDs.length !== 0) {
      const offset = new Date().getTimezoneOffset();
      const result = await axios.get(
        `${API_URI}${sportType}gamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&GameIDs=${gameIDs}&sportID=${sportID}`
      );
      dispatch({
        type: ACTION_TYPES.WATCH.GET_SELECTIONS_GAME_DATA,
        payload: result.data[0].games
      });
    } else {
      dispatch({
        type: ACTION_TYPES.WATCH.GET_SELECTIONS_GAME_DATA,
        payload: []
      });
    }
  };
};

export const getSelectionAllGameData = (
  date: string,
  gameIDs: ISelections,
  loading: boolean
) => {
  return async (dispatch: Dispatch) => {
    if (loading) {
      dispatch({
        type: ACTION_TYPES.WATCH.GET_LOADING_SELECTIONS,
        payload: true
      });
    }
    const offset = new Date().getTimezoneOffset();
    let allMlbGames = [];
    let allNflGames = [];
    let allNcaafbGames = [];
    let allNcaabGames = [];
    let allNbaGames = [];

    if (gameIDs.mlb?.length > 0) {
      const allMlbURI = `${API_URI}baseballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&gameIDs=${gameIDs.mlb.join()}`;
      const resultMLB = await axios.get(allMlbURI);
      allMlbGames = resultMLB.data[0]?.games;
    }
    if (gameIDs.nfl?.length > 0) {
      const allNflURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nfl&gameIDs=${gameIDs.nfl.join()}`;
      const resultNFL = await axios.get(allNflURI);
      allNflGames = resultNFL.data[0]?.games;
    }
    if (gameIDs.ncaaf?.length > 0) {
      const allNcaafbURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaafb&gameIDs=${gameIDs.ncaaf.join()}`;
      const resultNcaaf = await axios.get(allNcaafbURI);
      allNcaafbGames = resultNcaaf.data[0]?.games;
    }
    if (gameIDs.ncaab?.length > 0) {
      const allNcaabURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaab&gameIDs=${gameIDs.ncaab.join()}`;
      const resultNcaab = await axios.get(allNcaabURI);
      allNcaabGames = resultNcaab.data[0]?.games;
    }
    if (gameIDs.nba?.length > 0) {
      const allNbaURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nba&gameIDs=${gameIDs.nba.join()}`;
      const resultNba = await axios.get(allNbaURI);
      allNbaGames = resultNba.data[0]?.games;
    }

    const allGames = [
      ...allMlbGames,
      ...allNflGames,
      ...allNcaafbGames,
      ...allNcaabGames,
      ...allNbaGames
    ].sort(
      (a, b) =>
        new Date(a.gameUTCDateTime).valueOf() -
        new Date(b.gameUTCDateTime).valueOf()
    );

    dispatch({
      type: ACTION_TYPES.WATCH.GET_SELECTIONS_GAME_DATA,
      payload: allGames
    });
  };
};
