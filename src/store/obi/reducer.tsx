import { ACTION_TYPES } from '@Store/actionTypes';

const initialState = {
  obiData: [],
  loading: false
};

interface Action {
  type: string;
  payload: any;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.OBI.GET_LOADING:
      return {
        ...state,
        loading: action.payload,
        obiData: []
      };
    case ACTION_TYPES.OBI.GET_OBI_LIST:
      return { ...state, obiData: action.payload, loading: false };

    default:
      return state;
  }
};
