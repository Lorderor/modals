import styled from "@emotion/styled";
import { useState } from "react";
import { InputError } from "../InputError";
import { ERROR_SPACE } from "./constants";

const labelCss = {
  fontSize: "14px",
  fontWeight: "normal",
  position: "absolute",
  pointerEvents: "none",
  left: "12px",
  top: "10px",
  color: "grey",
  transition: "0.2s ease all",
  zIndex: 2,
  padding: "0 6px",
  borderRadius: "10px",
};

const labelFloat = {
  top: "-10px",
  color: '#655f5f',
  fontSize: "12px",
  backgroundColor: "white"
};

export const FloatLabel = (props) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, status, helperText } = props;

  const css =
    focus || (value && value.length !== 0)
      ? { ...labelCss, ...labelFloat }
      : labelCss;

  const isError = status === 'error';

  return (
    <FloatLabelRoot
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label style={css}>{label}</label>
      {isError && <InputError>{helperText}</InputError>}
    </FloatLabelRoot>
  );
};

const FloatLabelRoot = styled('div')`
  padding-bottom: ${ERROR_SPACE};
  position: relative;
  min-width: 230px;
`;

