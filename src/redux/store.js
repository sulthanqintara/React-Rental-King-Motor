import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import countReducer from "./reducer/count";
import rpm from "redux-promise-middleware";
import authReducer from "./reducer/auth";

const reducers = combineReducers({
  count: countReducer,
  auth: authReducer,
});
const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);

const reduxStore = createStore(reducers, enhancers);

export default reduxStore;
