import { forwardRef } from "react";
import {useGetErrorProps} from "../../hooks/useGetErrorProps";
import {FloatLabel} from "../FloatLabel";
import {Select} from "../Select";

export const SelectInput = forwardRef((props, ref) => {
  const { value, name, label, fieldState, ...rest } = props;

  const errorProps = useGetErrorProps(fieldState);

  return (
    <FloatLabel label={label} name={name} value={value} {...errorProps}>
      <Select style={{ width: "100%" }} size="large" status={errorProps.status} {...rest} ref={ref} />
    </FloatLabel>
  );
});
