export const milesTypePrepare = (milesType) => {
  return {
    ...milesType,
    milesType: milesType.id ? String(milesType.id) : undefined,
  };
};

export const milesPrepare = (miles) => {
  return {
    ...miles,
    milesList: miles.id ? String(miles.id) : undefined,
  };
};

export const prepareStepPage = (step, isFirstLoad, pageModal) => {
  const newStep = step ? +step : 1;
  const newPageModal = isFirstLoad ? newStep : pageModal;
  return { newStep, newPageModal };
};
