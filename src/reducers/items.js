import inputDatasDefault from '../data/InputDatas'

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;

    default:
      return state;
  }
}

export function inputDatas(state=inputDatasDefault,action) {
  switch (action.type) {
    case 'INPUT_DATAS_SUCCESS':
      return action.inputDatas;

    default:
      return state;
  }
}

export function progressPercent(state=0,action) {
  console.log("progressPercent reducer called",action);
  switch (action.type) {
    case 'PROGRESS_PERCENT':
      return action.progressPercent;

    default:
      return state;
  }
}
