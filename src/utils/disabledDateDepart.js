import { getDisabledPrevDate } from "./getDisabledPrevDate";

  

 export const disabledDateDepart = (current) => {
    if (current) {
      return getDisabledPrevDate(current);
    }
    return false;
  };``
