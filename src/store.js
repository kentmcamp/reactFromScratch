import { createStore, combineReducers } from 'redux';
import { todos } from './components/reducers';

const reducers = {
    todos,
};

// The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
