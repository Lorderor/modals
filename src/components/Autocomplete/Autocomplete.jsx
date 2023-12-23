import { forwardRef } from "react";
import styled from "@emotion/styled";
import { AutoComplete as InputAntd } from "antd";


export const Autocomplete = forwardRef((props, ref) => {
  return <InputStyled  {...props} ref={ref} />;
});

const InputStyled = styled(InputAntd)`
  > .ant-select-selector {
    border-radius: 0 !important;
  }
`;
