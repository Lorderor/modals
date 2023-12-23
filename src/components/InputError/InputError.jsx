import styled from "@emotion/styled";
import { Typography } from "antd";

export const InputError = ({children}) => {
    return <TypographyError type="danger">{children}</TypographyError>
}

const TypographyError = styled(Typography.Text)`
  position: absolute;
  bottom: 10px;
  left: 0;
  font-size: 11.5px;
  line-height: 1;
`;