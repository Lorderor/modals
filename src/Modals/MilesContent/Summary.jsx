import { MileForm } from "./MileForm";
import { TypeForm } from "./TypeForm";
import { AccountingForm } from "./AccountingForm";
import { Button, Divider, Flex, Row, Typography } from "antd";
import { titleModals } from "./constants";
import styled from "@emotion/styled";

export const Summary = ({ handleCancel }) => {
  return (
    <Flex vertical width={`100%`}>
      <StyledTypography>{titleModals[1]}</StyledTypography>
      <TypeForm isRow />
      <Divider style={{ margin: 0 }} />
      <StyledTypography>{titleModals[2]}</StyledTypography>

      <MileForm isRow />
      <Divider style={{ margin: 0 }} />

      <StyledTypography>{titleModals[3]}</StyledTypography>

      <AccountingForm isRow />
      <Divider style={{ margin: `0 0 12px 0` }} />

      <Row style={{ width: `100%` }} justify={`end`}>
        <Button size={`large`} onClick={handleCancel}>
          Close
        </Button>
      </Row>
    </Flex>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px;
`;
