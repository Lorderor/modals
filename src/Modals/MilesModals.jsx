import { Modal, Spin, Flex } from "antd";
import { useEffect, useContext, useState } from "react";
import { AccountingForm } from "./MilesContent/AccountingForm";
import { TypeForm } from "./MilesContent/TypeForm";
import { MileForm } from "./MilesContent/MileForm";
import { getMileData, getMileFullData } from "./MilesContent/api";
import { Summary } from "./MilesContent/Summary";
import { titleModals } from "./MilesContent/constants";
import { DataContext } from "./Context";
import { prepareStepPage, milesPrepare, milesTypePrepare } from "./MilesContent/utils";
// import { testFull, testInfo } from "../../mockData/test";

export const MilesModals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, updateState } = useContext(DataContext);
  const { isModalOpen, pageModal, data, isFirstLoad, dataAttr } = state;

  const resGet = async () => {
    try {
      setIsLoading(true);
      const res = await getMileData();
      // const res = { data: testInfo };
      let newState = {};

      if (dataAttr["data-id"] && dataAttr["data-milestype"]) {
        const resFull = await getMileFullData(dataAttr["data-milestype"], dataAttr["data-id"]);
        // const resFull = { data: testFull };
        if (resFull.data.result === `ok`) {
          const { step, milesType, miles, milesAccounting } = resFull.data;
          const { newStep, newPageModal } = prepareStepPage(step, isFirstLoad, pageModal);
          newState = {
            ...newState,
            dataStep: newStep,
            pageModal: newPageModal,
            isFirstLoad: false,
            mileTypeData: milesTypePrepare(milesType),
            mileData: milesPrepare(miles),
            mileAccountingData: { ...milesAccounting },
          };
        }
      }
      if (res?.data?.data) {
        newState = {
          ...newState,
          data: res.data.data,
        };
      }
      return newState;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resGet().then((newState) => {
        updateState(newState);
      });
    }
  }, [isModalOpen]);

  const handlePrev = () => {
    updateState({ pageModal: pageModal <= 1 ? 1 : pageModal - 1 });
    resGet().then((newState) => {
      updateState({ ...newState, pageModal: pageModal <= 1 ? 1 : pageModal - 1 });
    });
  };

  const handleNext = () => {
    updateState({ pageModal: pageModal >= 4 ? 4 : pageModal + 1 });
  };

  const handleCancel = () => {
    updateState({
      mileTypeData: {},
      mileData: {},
      mileAccountingData: {},
      dataStep: 1,
      pageModal: 1,
      isFirstLoad: true,
      isModalOpen: false,
    });
  };

  return isModalOpen ? (
    <Modal
      title={titleModals[pageModal]}
      open={isModalOpen}
      onCancel={handleCancel}
      width={pageModal === 4 ? `auto` : undefined}
      footer={``}
    >
      {isLoading || !data ? (
        <Flex style={{ width: "100%", height: "300px" }} justify="center" align="center">
          <Spin size={`large`} />
        </Flex>
      ) : (
        <>
          {pageModal === 4 ? (
            <Summary handleCancel={handleCancel} />
          ) : pageModal === 3 ? (
            <AccountingForm handlePrev={handlePrev} />
          ) : pageModal === 2 ? (
            <MileForm handlePrev={handlePrev} />
          ) : (
            <TypeForm handleNext={handleNext} />
          )}
        </>
      )}
    </Modal>
  ) : null;
};
