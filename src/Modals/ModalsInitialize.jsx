import { WebComponentInitialize } from "../components/WebComponentInitialize";
import { MilesModals } from "./MilesModals";
import { useState } from "react";
import { DataContext } from "./Context";
import { getAttributes } from "../utils/common";

export const ModalsInitialize = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    pageModal: 1,
    data: null,
    mileTypeData: {},
    mileData: {},
    mileAccountingData: {},
    dataStep: 1,
    isFirstLoad: true,
    dataAttr: {},
  });

  const updateState = (newState) => {
    console.log(`update`, newState);
    setState((prevState) => {
      console.log(`update`, prevState, newState);

      return {
        ...prevState,
        ...newState,
      };
    });
  };

  const showModal = (attributes) => {
    updateState({ dataAttr: getAttributes(attributes), isModalOpen: true });
  };

  const getElemByName = document.querySelectorAll(`.btn-react-miles-modal`);
  getElemByName.forEach((el) => {
    el.addEventListener(`click`, () => showModal(el.attributes));
  });

  return (
    <WebComponentInitialize>
      <DataContext.Provider value={{ state, updateState }}>
        <MilesModals />
      </DataContext.Provider>
    </WebComponentInitialize>
  );
};
