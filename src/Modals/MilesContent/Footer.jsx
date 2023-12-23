import { Button } from "../../components";
import { Row } from "antd";

export const Footer = ({ handlePrev, handleNext }) => {
  return (
    <Row style={{ width: `100%` }} justify={`space-between`}>
      <Button onClick={handlePrev}>Back</Button>
      <Button htmlType={`submit`} onClick={handleNext}>
          Save and continue
      </Button>
    </Row>
  );
};
