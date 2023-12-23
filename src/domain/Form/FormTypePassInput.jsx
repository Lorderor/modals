import { Controller } from "react-hook-form";
import addRequired from "../../utils/addRequired";
import composeRules from "../../utils/composeRules";
import TypePassInput from "../Field/TypePassInput";

export default (props) => {
    const {control, ...rest} = props;
    return <Controller
    name="pass-type"
    rules={composeRules(addRequired)}
    control={control}
    render={({ field, fieldState }) => {
      return (
        <TypePassInput
          fieldState={fieldState}
          {...field}
          {...rest}
        />
      );
    }}
  />
}