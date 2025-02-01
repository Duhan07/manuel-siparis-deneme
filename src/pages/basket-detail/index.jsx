import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Form,
  Input,
  List,
  Menu,
  Modal,
  Result,
  Segmented,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PercentageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import ConfirmModal from "../../components/ConfirmModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useStore } from "zustand";
import { basketStore } from "../../store/useStore";

const BasketDetail = ({ isLoading }) => {
  const basket = useStore(basketStore, (state) => state.basket);
  const setBasket = useStore(basketStore, (state) => state.setBasket);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [sale, setSale] = useState({
    saleAmount: 0,
    type: "percantage",
    totalSale: 0,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (basket.length > 0) {
      const total = basket.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      setTotalPrice(total);

      if (sale.type === "percantage") {
        setSale({
          totalSale: total * (parseInt(sale.saleAmount) / 100),
          type: sale.type,
          saleAmount: sale.saleAmount,
        });
      } else if (sale.type === "amount") {
        setSale({
          totalSale: parseInt(sale.saleAmount),
          type: sale.type,
          saleAmount: sale.saleAmount,
        });
      }
    } else {
      setTotalPrice(0);
      setSale({
        saleAmount: 0,
        totalSale: 0,
        type: sale.type,
      });
    }
  }, [basket, sale.type, sale.saleAmount]);

  const cardTitle = (
    <Flex gap={8} justify="space-between" style={{ width: "100%" }}>
      <Flex gap={8}>
        <Typography.Text style={{ color: "green" }}>
          Sepet İçeriği
        </Typography.Text>
        <ShoppingCartOutlined style={{ color: "green" }} />
      </Flex>
      <Typography.Text>{basket.length} Adet</Typography.Text>
    </Flex>
  );

  const saleTypeInput = (
    <Segmented
      defaultValue="percantage"
      value={sale.type}
      size="small"
      style={{
        width: "min-content",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgb(240,242,245)",
      }}
      onChange={(value) => {
        setSale({
          type: value,
          saleAmount: sale.saleAmount,
          totalSale: sale.totalSale,
        });
      }}
      options={[
        {
          label: "%",
          value: "percantage",
        },
        {
          label: "₺",
          value: "amount",
        },
      ]}
    />
  );

  const BasketPrice = () => {
    return (
      <Flex gap={4} vertical>
        <Typography.Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            margin: 0,
            textAlign: "end",
            alignContent: "center",
          }}
        >
          Toplam: {totalPrice} ₺
        </Typography.Text>
        <Typography.Text
          style={{
            color: "red",
            fontSize: 10,
            fontWeight: "bold",
            margin: 0,
            textAlign: "end",
            alignContent: "center",
          }}
        >
          İndirim: {sale.saleAmount} {sale.type === "percantage" ? "%" : "₺"}
        </Typography.Text>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
            textAlign: "end",
            alignContent: "center",
            color: "green",
          }}
        >
          Ara Toplam:{" "}
          {totalPrice - sale.totalSale > 0 ? totalPrice - sale.totalSale : 0} ₺
        </Typography.Title>
      </Flex>
    );
  };

  const listFooter = (
    <Flex gap={16} justify={basket.length > 0 ? "space-between" : "end"}>
      {basket.length > 0 && (
        <Flex gap={8}>
          <Typography.Link
            onClick={() => {
              setOpenModal(true);
            }}
            style={{
              alignSelf: "end",
            }}
          >
            {sale.saleAmount ? "İndirim Güncelle" : "İndirim Uygula"}
          </Typography.Link>
          <Modal
            title="İndirim"
            open={openModal}
            onOk={() => {
              setOpenModal(false);
              setSale({
                saleAmount: form.getFieldValue("sale"),
                type: sale.type,
                totalSale: sale.totalSale,
              });
            }}
            onCancel={() => {
              setOpenModal(false);
            }}
            okText={sale.saleAmount ? "Güncelle" : "Uygula"}
            cancelText="İptal"
            width={300}
          >
            <Form.Item name="sale">
              <Input placeholder="İndirim Giriniz" suffix={saleTypeInput} />
            </Form.Item>
          </Modal>
        </Flex>
      )}
      <BasketPrice />
    </Flex>
  );

  const handleProductDecrease = (item) => () => {
    if (item.quantity <= 1) {
      setBasket(
        basket.filter((basketItem) => {
          return basketItem.product !== item.product;
        })
      );
    } else {
      setBasket(
        basket.map((basketItem) => {
          if (basketItem.product === item.product) {
            basketItem.quantity -= 1;
          }
          return basketItem;
        })
      );
    }
  };

  const handleProductIncrease = (item) => () => {
    setBasket(
      basket.map((basketItem) => {
        if (basketItem.product === item.product) {
          basketItem.quantity += 1;
        }
        return basketItem;
      })
    );
  };

  const listActions = (item) => [
    <Flex
      gap={8}
      vertical
      style={{
        width: "min-content",
      }}
    >
      <Card
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Flex gap={8}>
          <Button
            size="small"
            type="link"
            icon={item.quantity <= 1 ? <DeleteOutlined /> : <MinusOutlined />}
            onClick={handleProductDecrease(item)}
          />
          {item.quantity}
          <Button
            size="small"
            type="link"
            icon={<PlusOutlined />}
            onClick={handleProductIncrease(item)}
          />
        </Flex>
      </Card>
      <Typography.Text
        italic
        mark
        style={{
          fontSize: 11,
          width: "auto",
        }}
      >
        Not: {item.note}
      </Typography.Text>
    </Flex>,
  ];

  const rightClickItems = [
    {
      label: (
        <Typography.Text
          style={{
            color: "white",
          }}
        >
          <DeleteOutlined
            style={{
              marginRight: 8,
            }}
          />
          Sepeti Temizle
        </Typography.Text>
      ),
      key: "clear-basket",
      onClick: () => {
        setBasket([]);
      },
    },
    {
      label: (
        <Typography.Text
          style={{
            color: "white",
          }}
        >
          <PercentageOutlined
            style={{
              marginRight: 8,
            }}
          />
          İndirimi Kaldır
        </Typography.Text>
      ),
      key: "remove-sale",
      onClick: () => {
        setSale({
          saleAmount: 0,
          totalSale: 0,
          type: sale.type,
        });
      },
    },
  ];

  return (
    <>
      <Flex
        vertical
        style={{
          width: "30%",
          display: isLoading ? "none" : "flex",
          placeItems: "center",
        }}
      >
        <Card
          id="fixed-basket"
          loading={isLoading}
          style={{ backgroundColor: "#f0f2f5" }}
          title={cardTitle}
        >
          <Form form={form}>
            <List
              footer={listFooter}
              itemLayout="horizontal"
              dataSource={basket}
            >
              {basket?.length === 0 ? (
                <Result
                  title="Sepetiniz Boş"
                  icon={
                    <ShoppingCartOutlined
                      style={{
                        color: "lightgray",
                      }}
                    />
                  }
                />
              ) : (
                <Dropdown
                  menu={{
                    items: rightClickItems,
                    style: {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  trigger={["contextMenu"]}
                >
                  <VirtualList
                    data={basket}
                    height={250}
                    itemHeight={70}
                    style={{
                      border: "1px solid #f0f2f5",
                    }}
                  >
                    {(item) => (
                      <List.Item actions={listActions(item)}>
                        <List.Item.Meta
                          title={
                            <Typography.Text>{item.product}</Typography.Text>
                          }
                          description={
                            <Flex gap={8} vertical>
                              <Typography.Text>
                                {item.quantity * item.price} ₺
                              </Typography.Text>
                            </Flex>
                          }
                        />
                      </List.Item>
                    )}
                  </VirtualList>
                </Dropdown>
              )}
            </List>
            <ConfirmModal basket={basket} sale={sale} />
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default BasketDetail;
