import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import appReducer from "./reducer";

export const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    appState: appReducer,
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
