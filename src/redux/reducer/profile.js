import { uploadProfile } from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: "",
  message: "",
};

const profileReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;

  switch (action.type) {
    case uploadProfile.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case uploadProfile.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case uploadProfile.concat("_", Fulfilled):
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

export default profileReducer;
