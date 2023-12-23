import dayjs from "dayjs";
import { getDisabledPrevDate } from "./getDisabledPrevDate";

export const disabledDateReturn = (departValue) => (current) => {
    if (current) {
      if (getDisabledPrevDate(current)) {
        return true;
      } else if (departValue) {
        return current < dayjs(departValue, 'DD/MM/YYYY').add(1, "day");
      }
    }
    return false;
  };