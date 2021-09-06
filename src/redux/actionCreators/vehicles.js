import { postVehicle, patchVehicle } from "../../utils/https/Vehicles";
import { uploadVehicle, updateVehicle } from "./actionString";

export const postVehicleAction = (body, params) => {
  return {
    type: uploadVehicle,
    payload: postVehicle(body, params),
  };
};
export const patchVehicleAction = (body, params) => {
  return {
    type: updateVehicle,
    payload: patchVehicle(body, params),
  };
};
