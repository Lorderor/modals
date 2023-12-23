import styled from "@emotion/styled";
import { Input as InputAntd, } from "antd";
import { forwardRef } from "react";

export const InputPassword = forwardRef((props, ref) => {
  return <InputStyled {...props} ref={ref} />;
});

const InputStyled = styled(InputAntd.Password)`
  border-radius: 0;
`;
