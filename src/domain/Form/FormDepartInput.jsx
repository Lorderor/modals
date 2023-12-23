import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import addRequired from "../../utils/addRequired";
import composeRules from "../../utils/composeRules";
import { disabledDateDepart } from "../../utils/disabledDateDepart";
import DepartInput from "../Field/DepartInput";

export const ID_DEPART = 'depart';

export default (props) => {
    const {control, ...rest} = props;
    return <Controller
    name={ID_DEPART}
    control={control}
    rules={composeRules(addRequired)}
    render={({ field, fieldState }) => {
      return (
        <DepartInput
          label="Depart"
          defaultValue={field.value ? dayjs(field.value, "DD/MM/YYYY") : undefined}
          disabledDate={disabledDateDepart}
          fieldState={fieldState}
          {...field}
          {...rest}
        />
      );
    }}
  />
}