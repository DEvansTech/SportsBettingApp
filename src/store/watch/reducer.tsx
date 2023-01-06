import { ACTION_TYPES } from '@Store/actionTypes';

const initialState = {
  myTeams: [],
  allTeams: {
    mlbTeams: [],
    nflTeams: [],
    ncaafbTeams: [],
    ncaabTeams: [],
    nbaTeams: []
  },
  teamsGamedata: [],
  selectionsGamedata: [],
  teamsLoading: false,
  selectionsLoading: false
};
interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.WATCH.GET_LOADING_TEAMS:
      return {
        ...state,
        teamsLoading: action.payload,
        teamsGamedata: []
      };
    case ACTION_TYPES.WATCH.GET_TEAMS_LIST:
      return { ...state, myTeams: action.payload, teamsLoading: false };
    case ACTION_TYPES.WATCH.GET_ALL_TEAMS_LIST:
      return { ...state, allTeams: action.payload, teamsLoading: false };
    case ACTION_TYPES.WATCH.GET_TEAMS_GAME_DATA:
      return { ...state, teamsGamedata: action.payload, teamsLoading: false };
    case ACTION_TYPES.WATCH.GET_SELECTIONS_GAME_DATA:
      return {
        ...state,
        selectionsGamedata: action.payload,
        selectionLoading: false
      };
    case ACTION_TYPES.WATCH.GET_LOADING_SELECTIONS:
      return {
        ...state,
        selectionLoading: action.payload,
        selectionsGamedata: []
      };
    default:
      return state;
  }
};
