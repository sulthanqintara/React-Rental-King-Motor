import { countDown, countUp } from "../actionCreators/actionString";

const vehicleDetail = JSON.parse(localStorage.getItem("vehicleData"));

const defaultState = {
  number: 1,
  maxNumber: vehicleDetail?.amount_available,
};

const countReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case countUp:
      if (prevState.number < prevState.maxNumber)
        return {
          ...prevState,
          number: prevState.number + 1,
        };
      else return prevState;
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
