import { signIn } from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const defaultState = {
  authInfo: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: {},
};

const authReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case signIn.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case signIn.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case signIn.concat("_", Fulfilled):
      localStorage.setItem("token", String(action.payload.data.result.token));
      localStorage.setItem(
        "userInfo",
        JSON.stringify(action.payload.data.result.userInfo)
      );
      console.log(JSON.parse(localStorage.getItem("userInfo")));
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result,
        isLogin: true,
      };

    default:
      return prevstate;
  }
};

export default authReducer;
