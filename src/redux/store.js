import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import countReducer from "./reducer/count";
import rpm from "redux-promise-middleware";
import authReducer from "./reducer/auth";
import profileReducer from "./reducer/profile";
import vehicleReducer from "./reducer/vehicles";

const reducers = combineReducers({
  count: countReducer,
  auth: authReducer,
  profile: profileReducer,
  vehicles: vehicleReducer,
});
const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);

const reduxStore = createStore(reducers, enhancers);

export default reduxStore;
