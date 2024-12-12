import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { todos, isLoading } from "./components/reducers";

const reducers = {
  todos,
  isLoading,
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

// The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);
