import { ActionType } from "redux-promise-middleware";
import { uploadVehicle, updateVehicle } from "../actionCreators/actionString";

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: "",
  message: "",
};

const vehicleReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case uploadVehicle.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case uploadVehicle.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case uploadVehicle.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: "",
        message: action.payload,
      };
    case updateVehicle.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case updateVehicle.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case updateVehicle.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: "",
        message: action.payload,
      };
    default:
      return prevstate;
  }
};

export default vehicleReducer;
