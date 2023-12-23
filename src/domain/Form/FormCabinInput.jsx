import { Controller } from "react-hook-form";
import addRequired from "../../utils/addRequired";
import composeRules from "../../utils/composeRules";
import CabinInput from "../Field/CabinInput";

export default (props) => {
    const {control, ...rest} = props;
    return <Controller
    name="cabin-type"
    rules={composeRules(addRequired)}
    control={control}
    render={({ field, fieldState }) => {
      return (
        <CabinInput
          fieldState={fieldState}
          {...field}
          {...rest}
        />
      );
    }}
  />
}