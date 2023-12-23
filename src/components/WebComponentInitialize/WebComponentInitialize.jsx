import { ConfigProvider } from "../ConfigProvider";

export const WebComponentInitialize = ({ children }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};
