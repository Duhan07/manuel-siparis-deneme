import { useState } from "react";
import BasketDetail from "./basket-detail";
import { Divider, Flex, Spin } from "antd";
import SelectProducts from "./select-products";
import { useStore } from "zustand";
import { basketStore } from "../store/useStore";

const Home = () => {
  const basket = useStore(basketStore, (state) => state.basket);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Spin spinning={isLoading}>
        <Flex gap={8} vertical>
          <Flex gap={8} vertical>
            <Flex justify="space-between" style={{ width: "100%" }}>
              <Flex vertical style={{ width: "70%" }}>
                <SelectProducts setIsLoading={setIsLoading} />
              </Flex>
              <Divider type="vertical" />
              <BasketDetail isLoading={isLoading} />
            </Flex>
          </Flex>
        </Flex>
      </Spin>
    </>
  );
};

export default Home;
