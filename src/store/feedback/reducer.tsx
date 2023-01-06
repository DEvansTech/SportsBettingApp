import { ACTION_TYPES } from '@Store/actionTypes';

const initialState = {
  states: {},
  loading: false
};
interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.FEEDBACK.GET_LOADING:
      return {
        ...state,
        states: {},
        loading: action.payload
      };
    case ACTION_TYPES.FEEDBACK.SUBMIT_FEEDBACK:
      return {
        ...state,
        states: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
