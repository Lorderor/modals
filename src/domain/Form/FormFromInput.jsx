import { Controller } from "react-hook-form";
import addRequired from "../../utils/addRequired";
import composeRules from "../../utils/composeRules";
import AirportInput from "../Field/AirportInput";

export default (props) => {
    const {control, ...rest} = props;
    return <Controller
    name="from"
    rules={composeRules(addRequired)}
    control={control}
    render={({ field, fieldState }) => {
      return (
        <AirportInput
          label="From"
          fieldState={fieldState}
          {...field}
          {...rest}
        />
      );
    }}
  />
}