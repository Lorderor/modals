import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";
import { ConfigProvider as CPANTD, Grid, Tag } from "antd";

import { breakpoints } from "../../constants/breakpoints"

export const ConfigProvider = ({children}) => {
    const screens = Grid.useBreakpoint();


    return <CPANTD
      theme={{
        token: {
          colorPrimary: "#00bdbb",
          colorSuccess: "#158c32",
          colorInfo: "#363636",
          ...breakpoints
        }
      }}
    >
        <Global styles={GlobalStyles} />
        {process.env.NODE_ENV !== 'production' && 
    <Screens>
      {Object.entries(screens)
      .filter((screen) => !!screen[1])
      .map((screen) => (
        <Tag color="blue" key={screen[0]}>
          {screen[0]}
        </Tag>
      ))}
      </Screens>}{children}</CPANTD>
}

const Screens = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const getDevStyles = () => {
    if (process.env.NODE_ENV !== 'production') {
      return `
        html {
          padding: 0;
        }
  
        body {
          display: flex;
          justify-content: center;
        } 
  
        #result-page, #slider-search {
          @media (max-width: ${breakpoints.screenXXLMin}px) {
            width: 1100px;
          }
      
          @media (max-width: ${breakpoints.screenXLMin}px) {
            width: 950px;
          }
      
          @media (max-width: ${breakpoints.screenLGMin}px) {
            width: 768px;
          }
      
          @media (max-width: ${breakpoints.screenSMMin}px) {
            width: 600px;
          }
      
          @media (min-width: ${breakpoints.screenXXLMin}px) {
            width: 1300px;
          }
        }
      `;
    } 
  }

const GlobalStyles = css`
  :root {
    --primaryText: #363636;
  }

  ${getDevStyles()}

  #result-page {

    * {
    font-family: Poppins, sans-serif;
    }


    h2 {
      color: var(--primaryText);
      font-size: 50px;
    }

    h3 {
      color: var(--primaryText);
      font-size: 30px;
    }
  }

  .ant-picker-dropdown {
    table thead tr {
      border: none;
    }

    table tbody tr {
      border: none;
    }

    table th {
      padding: 0;
    }
  }
`;