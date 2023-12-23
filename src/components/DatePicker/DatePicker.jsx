import styled from "@emotion/styled";
import { DatePicker as InputAntd } from "antd";
import { forwardRef } from "react";

export const DatePicker = forwardRef((props, ref) => {
  return <InputStyled {...props} ref={ref} />;
});

const InputStyled = styled(InputAntd)`
  border-radius: 0;
  height: 40px;
`;
