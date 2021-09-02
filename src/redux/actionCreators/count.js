import { countDown, countUp } from "./actionString";

export const countUpAction = () => {
  return {
    type: countUp,
  };
};
export const countDownAction = () => {
  return {
    type: countDown,
  };
};
