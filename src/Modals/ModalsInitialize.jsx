import { WebComponentInitialize } from "../components/WebComponentInitialize";
import { MilesModals } from "./MilesModals";
import { useEffect, useRef, useState } from "react";
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
  const buttonSpanRefs = useRef();
  const buttonRefs = useRef();

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

  const showModal = (attributes, button, span) => {
    updateState({ dataAttr: getAttributes(attributes), isModalOpen: true });
    buttonRefs.current = button;
    buttonSpanRefs.current = span;
  };

  useEffect(() => {
    const getElemByName = document.querySelectorAll(`.btn-react-miles-modal`);
    getElemByName.forEach((el) => {
      el.addEventListener(`click`, () => showModal(el.attributes, el, el.querySelector("span")));
    });

    return () => {
      getElemByName.forEach((el) => {
        el.removeEventListener(`click`, () => showModal(el.attributes, el, el.querySelector("span")));
      });
    };
  }, []);

  useEffect(() => {
    if (state.dataStep && buttonSpanRefs.current && state.isModalOpen)
      buttonSpanRefs.current.textContent = `${buttonText[state.dataStep]}`;
  }, [state.dataStep, state.isModalOpen, buttonSpanRefs.current]);

  useEffect(() => {
    if (state.pageModal === 2 && buttonRefs.current && state.isModalOpen && state.dataAttr["data-milestype"] === ``) {
      buttonRefs.current?.setAttribute("data-milestype", state?.mileTypeData?.milesType);
    }
  }, [state.pageModal, state.isModalOpen, buttonRefs.current]);

  return (
    <WebComponentInitialize>
      <DataContext.Provider value={{ state, updateState }}>
        <MilesModals />
      </DataContext.Provider>
    </WebComponentInitialize>
  );
};

const buttonText = {
  1: `Add miles account`,
  2: `Add miles`,
  3: `Add miles accounting`,
  4: `View miles info`,
};
