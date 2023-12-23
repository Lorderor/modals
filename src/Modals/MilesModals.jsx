import { Modal, Spin, Flex } from "antd";
import { useEffect, useState } from "react";
import { AddMileAccounting } from "./MilesContent/AddMileAccounting";
import { AddMileType } from "./MilesContent/AddMileType";
import { AddMile } from "./MilesContent/AddMile";
import { getMileData } from "./MilesContent/api";
import { getAttributes } from "../utils/common";

export const MilesModals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageModal, setPageModal] = useState(1);
  const [data, setData] = useState();
  const [mileTypeData, setMileTypeData] = useState({});
  const [mileData, setMileData] = useState({});

  const [dataAttr, setDataAttr] = useState({});

  const resGet = async () => {
    try {
      setIsLoading(true);
      const res = await getMileData();
      // const res = test;
      if (res?.data?.data) {
        setData(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resGet();
    }
  }, [isModalOpen]);

  const showModal = (attributes) => {
    setDataAttr(getAttributes(attributes));
    setIsModalOpen(true);
  };

  const handlePrev = () => {
    setPageModal(pageModal <= 1 ? 1 : pageModal - 1);
  };

  const handleNext = () => {
    setPageModal(pageModal >= 3 ? 3 : pageModal + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMileTypeData({})
    setMileData({})
  };

  const getElemByName = document.querySelectorAll(`.btn-react-miles-modal`);
  getElemByName.forEach((el) => {
    el.addEventListener(`click`, () => showModal(el.attributes));
  });

  return (
    <Modal
      title={"Add miles"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={``}
    >
      {isLoading || !data ? (
        <Flex
          style={{ width: "100%", height: "300px" }}
          justify="center"
          align="center"
        >
          <Spin size={`large`} />
        </Flex>
      ) : (
        <>
          {pageModal === 3 ? (
            <AddMileAccounting
              data={data}
              handleNext={handleNext}
              handlePrev={handlePrev}
              dataAttr={dataAttr}
            />
          ) : pageModal === 2 && mileTypeData ? (
            <AddMile
              data={data}
              mileTypeData={mileTypeData}
              handleNext={handleNext}
              handlePrev={handlePrev}
              mileData={mileData}
              setMileData={setMileData}
              dataAttr={dataAttr}
            />
          ) : (
            <AddMileType
              data={data}
              handleNext={handleNext}
              handlePrev={handlePrev}
              setMileTypeData={setMileTypeData}
              mileTypeData={mileTypeData}
              dataAttr={dataAttr}
            />
          )}
        </>
      )}
    </Modal>
  );
};
