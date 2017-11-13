import {combineReducers} from 'redux';
import {items, itemsHasErrored, itemsIsLoading,progressPercent,inputDatas} from './items';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  progressPercent,
  inputDatas
});
