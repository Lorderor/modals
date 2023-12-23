import { forwardRef } from "react";
import { FloatLabel } from "../../components";
import { useGetErrorProps } from "../../hooks/useGetErrorProps";
import { InputPassword } from "../../components/InputPassword";

export const FormInputPassword = forwardRef((props, ref) => {
  const { value, name, label, fieldState, ...rest } = props;

  const errorProps = useGetErrorProps(fieldState);
  return (
    <FloatLabel label={label} name={name} value={value} {...errorProps}>
      <InputPassword
        size="large"
        value={value}
        {...rest}
        status={errorProps.status}
        ref={ref}
      />
    </FloatLabel>
  );
});
