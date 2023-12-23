import { forwardRef } from "react";
import { Input, FloatLabel } from "../../components";
import {useGetErrorProps} from "../../hooks/useGetErrorProps";

export const FormInput = forwardRef((props, ref) => {
  const { value, name, label, fieldState, ...rest } = props;

  const errorProps = useGetErrorProps(fieldState);
  return (
    <FloatLabel label={label} name={name} value={value} {...errorProps}>
      <Input
        size="large"
        value={value}
        {...rest}
        status={errorProps.status}
        ref={ref}
      />
    </FloatLabel>
  );
});
