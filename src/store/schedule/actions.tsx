import { Dispatch } from 'redux';
import axios from 'axios';

import { API_URI, API_KEY } from '@env';
import { ACTION_TYPES } from '@Store/actionTypes';

export const getGamedata = (
  date: string,
  sort: string,
  sportID: string,
  sportType: string,
  loading: boolean
) => {
  return async (dispatch: Dispatch) => {
    if (loading) {
      dispatch({ type: ACTION_TYPES.BETS.GET_LOADING, payload: true });
    }
    const offset = new Date().getTimezoneOffset();
    if (sportType === 'all') {
      const baseballSort = 'baseballgamedata';
      const footballSort = 'footballgamedata';
      const basketballSort = 'basketballgamedata';

      const allMlbURI = `${API_URI}baseballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}`;
      const allNflURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nfl`;
      const allNcaafbURI = `${API_URI}footballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaafb`;
      const allNbabURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nba`;
      const allNcaabURI = `${API_URI}basketballgamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaab`;

      await axios
        .all([
          axios.get(allMlbURI),
          axios.get(allNflURI),
          axios.get(allNcaafbURI),
          axios.get(allNbabURI),
          axios.get(allNcaabURI)
        ])
        .then(
          axios.spread(
            async (
              allMlbGames,
              allNflGames,
              allNcaafbGames,
              allNbaGames,
              allNcaabGames
            ) => {
              if (
                allMlbGames?.data[0]?.games?.length === 0 &&
                allNflGames?.data[0]?.games?.length === 0 &&
                allNcaafbGames?.data[0]?.games?.length === 0 &&
                allNbaGames?.data[0]?.games?.length === 0 &&
                allNcaabGames?.data[0]?.games?.length === 0
              ) {
                dispatch({ type: ACTION_TYPES.BETS.EXIT_GAME, payload: true });
                return;
              }
            }
          )
        );
      const mlbURI = `${API_URI}${baseballSort}?date=${date}&offset=${offset}&apikey=${API_KEY}`;
      const nflURI = `${API_URI}${footballSort}?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nfl`;
      const ncaafbURI = `${API_URI}${footballSort}?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaafb`;
      const nbaURI = `${API_URI}${basketballSort}?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=nba`;
      const ncaabURI = `${API_URI}${basketballSort}?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=ncaab`;

      await axios
        .all([
          axios.get(mlbURI),
          axios.get(nflURI),
          axios.get(ncaafbURI),
          axios.get(nbaURI),
          axios.get(ncaabURI)
        ])
        .then(
          axios.spread(
            async (mlbGames, nflGames, ncaafbGames, nbaGames, ncaabGames) => {
              const allGames = [
                ...mlbGames.data[0].games,
                ...nflGames.data[0].games,
                ...ncaafbGames.data[0].games,
                ...nbaGames.data[0].games,
                ...ncaabGames.data[0].games
              ].sort(
                (a, b) =>
                  new Date(a.gameUTCDateTime).valueOf() -
                  new Date(b.gameUTCDateTime).valueOf()
              );
              dispatch({
                type: ACTION_TYPES.BETS.GET_GAME_DATA,
                payload: allGames
              });
            }
          )
        );
    } else {
      const gameSort = `${sportType}gamedata`;

      const allGames = await axios.get(
        `${API_URI}${sportType}gamedata?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=${sportID}`
      );
      if (allGames?.data[0]?.games?.length === 0) {
        dispatch({ type: ACTION_TYPES.BETS.EXIT_GAME, payload: true });
        return;
      }
      const result = await axios.get(
        `${API_URI}${gameSort}?date=${date}&offset=${offset}&apikey=${API_KEY}&sportid=${sportID}`
      );
      dispatch({
        type: ACTION_TYPES.BETS.GET_GAME_DATA,
        payload: result.data[0].games
      });
    }
  };
};
