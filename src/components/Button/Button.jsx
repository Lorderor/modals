import styled from "@emotion/styled";
import { Button as ButtonAnth } from "antd";

export const Button = (props) => {
  return <ButtonStyled {...props} />;
};

const ButtonStyled = styled(ButtonAnth)`
  &.ant-btn {
    border-radius: 0;
    text-transform: uppercase;
    font-weight: bold;
  }
  &.ant-btn-lg {
    height: 54px;
  }
`;
