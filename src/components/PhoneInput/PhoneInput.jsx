import styled from "@emotion/styled";
import { forwardRef } from "react";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneInput = forwardRef((props, ref) => {
  const {status, ...rest} = props;
  return <PhoneInputStyled status={status} placeholder="Phone" {...rest} inputProps={{...props?.inputProps,
    ref
  }} />
});

const ERROR_COLOR = 'red';

const getErrorStyle = (status) => {
  if (status === 'error') {
    return `
    .flag-dropdown {
      border-top-color: ${ERROR_COLOR};
      border-left-color: ${ERROR_COLOR};
      border-bottom-color: ${ERROR_COLOR};
    }

    .form-control {
      width: 100%;
      height: 39.33px;
      border-radius: 0;
      border-color: ${ERROR_COLOR}
    `;
  }
}

const PhoneInputStyled = styled(PhoneInput2)`
  &.react-tel-input {
    
    .flag-dropdown {
      border-radius: 0;
    }

    .form-control {
      width: 100%;
      height: 39.33px;
      border-radius: 0;
    }
    .selected-flag {
      border-radius: 0;
    }

    ${({status}) => getErrorStyle(status)}
  }
`;
