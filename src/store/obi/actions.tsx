import { Dispatch } from 'redux';
import axios from 'axios';

import { OBI_API_URI } from '@env';
import { ACTION_TYPES } from '@Store/actionTypes';

export const getObiDta = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.OBI.GET_LOADING, payload: true });
    const obiURI = `${OBI_API_URI}GetArticle`;
    const result = await axios.get(obiURI);
    let data = [];
    if (result.status === 200) {
      data = result.data;
    }
    dispatch({
      type: ACTION_TYPES.OBI.GET_OBI_LIST,
      payload: data
    });
  };
};
