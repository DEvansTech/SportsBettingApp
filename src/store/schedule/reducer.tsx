import { ACTION_TYPES } from '@Store/actionTypes';

const initialState = {
  gameData: [],
  loading: false,
  exitGame: false
};
interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.BETS.GET_LOADING:
      return { ...state, loading: action.payload, gameData: [] };
    case ACTION_TYPES.BETS.GET_GAME_DATA:
      return {
        ...state,
        gameData: action.payload,
        exitGame: false,
        loading: false
      };
    case ACTION_TYPES.BETS.EXIT_GAME:
      return {
        ...state,
        exitGame: action.payload,
        gameData: [],
        loading: false
      };
    default:
      return state;
  }
};
