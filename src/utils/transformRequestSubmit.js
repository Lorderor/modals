import dayjs from "dayjs";
import { requestTypes } from "../constants/requestTypes";
import { getAirportValue } from "../domain/Field/AirportInput";

export const transformRequestSubmit = (values = {}, type) => {

    
    const result = {...values, from: getAirportValue(values.from), 
        to: getAirportValue(values.to), }

    const mainFormat = 'DD/MM/YYYY';

    if (type === requestTypes.result) {
        const format = 'YYYY-MM-DD';
        return {
            ...result,
            depart: dayjs(values.depart, mainFormat).format(format),
            return: dayjs(values.return, mainFormat).format(format),
            type: requestTypes.result
        }
    }

    if (type === requestTypes.main) {

        return {
            ...result,
            from_number: values.from, 
            to_number: values.to, 
            type: 'main',
            depart: values.depart?.format(mainFormat),
            return: values.return?.format(mainFormat)
          };
    }

    return result;
}