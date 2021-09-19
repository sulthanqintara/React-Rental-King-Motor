import { signedIn, signIn, signOut } from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const authInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

const defaultState = {
  authInfo: authInfoLocalStorage ? authInfoLocalStorage : {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: authInfoLocalStorage ? true : false,
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
        isLogin: false,
        error: action.payload,
      };
    case signIn.concat("_", Fulfilled):
      localStorage.setItem("token", String(action.payload.data.result.token));
      localStorage.setItem(
        "userInfo",
        JSON.stringify(action.payload.data.result.userInfo)
      );
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result.userInfo,
        isLogin: true,
      };
    case signedIn:
      return {
        ...prevstate,
        authInfo: JSON.parse(localStorage.getItem("userInfo")),
        isLogin: true,
      };
    case signOut.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case signOut.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case signOut.concat("_", Fulfilled):
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result,
        isLogin: false,
      };
    default:
      return prevstate;
  }
};

export default authReducer;
