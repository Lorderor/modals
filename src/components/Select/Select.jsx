import styled from "@emotion/styled";
import { Select as SelectA } from "antd";
import { forwardRef } from "react";

export const Select = forwardRef((props, ref) => {
  return <SelectStyled {...props} ref={ref} />
});

const SelectStyled = styled(SelectA)`
  > .ant-select-selector {
    border-radius: 0 !important;
  }
`;
