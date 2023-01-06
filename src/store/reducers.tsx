import { combineReducers } from 'redux';
import schedule from './schedule/reducer';
import watch from './watch/reducer';
import feedback from './feedback/reducer';

interface Action {
  type: string;
  payload: any;
}

const appReducer = combineReducers({
  schedule: schedule,
  watch: watch,
  feedback: feedback
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
