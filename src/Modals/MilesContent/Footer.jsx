import { Button } from "../../components";
import { Row } from "antd";

export const Footer = ({ handlePrev, handleNext }) => {
  return (
    <Row style={{ width: `100%` }} justify={`space-between`}>
      {handlePrev ? <Button onClick={handlePrev}>Back</Button> : <div></div>}
      {handleNext ? <Button onClick={handleNext}>Next</Button> : <Button htmlType={`submit`}>Save and continue</Button>}
    </Row>
  );
};
