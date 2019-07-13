import {LOADING, GET_PEOPLE, GET_PERSON, CHOOSE_PERSON} from '../actions/actions';
import { combineReducers } from 'redux';

const getPeople = (state = [], action) => {
  switch (action.type) {
    case GET_PEOPLE:
      return action.payload
  }
  return state;
}

const loading = (state = true, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload
  }
  return state;
}

const getPerson = (state = {}, action) => {
    switch (action.type) {
        case GET_PERSON:
            return action.payload
        case CHOOSE_PERSON:
            return action.payload
    }
    return state;

}


const reducers = combineReducers({
    person: getPerson,
    people: getPeople,
    loading: loading,
});

export default reducers;