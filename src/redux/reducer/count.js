import { countDown, countUp } from "../actionCreators/actionString";

const defaultState = {
  number: 1,
  isLogin: false,
};

const countReducer = (prevState = defaultState, action) => {
  //handle action type
  switch (action.type) {
    case countUp:
      return {
        ...prevState,
        number: prevState.number + 1,
      };
    case countDown:
      if (prevState.number > 1)
        return {
          ...prevState,
          number: prevState.number - 1,
        };
      else return prevState;
    default:
      return prevState;
  }
};

export default countReducer;
