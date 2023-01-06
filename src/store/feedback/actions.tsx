import { Dispatch } from 'redux';
import axios from 'axios';

import { SUPPORT_API_URI, SUPPORT_API_KEY } from '@env';
import { ACTION_TYPES } from '@Store/actionTypes';
import { FeedbackType } from '@Store/types';

export const handleLoading = (value: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.FEEDBACK.GET_LOADING, payload: value });
  };
};

export const submitFeedback = (feedback: FeedbackType) => {
  return async (dispatch: Dispatch) => {
    const url = `${SUPPORT_API_URI}contactus?apikey=${SUPPORT_API_KEY}&email=${feedback.email}&comments=${feedback.comments}&firstname=${feedback.firstName}&lastname=${feedback.lastName}&uid=${feedback.uid}`;
    const result = await axios.get(url);
    dispatch({
      type: ACTION_TYPES.FEEDBACK.SUBMIT_FEEDBACK,
      payload: result.data[0]
    });
  };
};
