import {
  Badge,
  Button,
  Divider,
  Flex,
  Image,
  List,
  Modal,
  Typography,
} from "antd";
import { useState } from "react";
import VirtualList from "rc-virtual-list";
import {
  CreditCardOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStore } from "zustand";
import { customerStore, productStore } from "../store/useStore";

const ConfirmModal = ({ basket, sale }) => {
  const [open, setOpen] = useState(false);
  const customerInfo = useStore(customerStore, (state) => state.customerInfo);
  const selectedBuilding = useStore(
    productStore,
    (state) => state.selectedBuilding
  );
  const selectedBrand = useStore(productStore, (state) => state.selectedBrand);
  const customerType = useStore(customerStore, (state) => state.customerType);

  const formatPhoneNumber = (number) => {
    if (!number || number.length < 10) return "";

    const areaCode = number.slice(0, 3);
    const prefix = number.slice(3, 6);
    const mainNumber = number.slice(6);

    return `+90 (${areaCode}) ${prefix} ${mainNumber}`;
  };

  return (
    <>
      <Button
        block
        type="primary"
        style={{ marginTop: 10, float: "right" }}
        onClick={() => setOpen(true)}
        disabled={basket.length === 0}
      >
        Siparişi Tamamla
      </Button>
      <Modal
        title={
          <Flex gap={8}>
            <Image
              width={40}
              src={selectedBrand?.logoUrl || selectedBrand?.image}
            />
            <Typography.Text
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              {selectedBuilding?.label}
            </Typography.Text>
          </Flex>
        }
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        styles={{
          footer: {
            justifyContent: "center",
            display: "flex",
          },
        }}
        okText="Siparişi Tamamla"
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setOpen(false);
        }}
        width={700}
      >
        <List>
          <VirtualList
            data={customerInfo}
            itemHeight={50}
            height={100}
            style={{ marginTop: 20 }}
          >
            {(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Flex gap={6}>
                      <UserOutlined />
                      <Typography.Text>{item.fullname}</Typography.Text>
                    </Flex>
                  }
                  description={
                    <Flex gap={6} vertical>
                      <Typography>
                        <PhoneOutlined style={{ marginRight: 6 }} />
                        {formatPhoneNumber(item.phoneNumbers)}
                      </Typography>

                      {customerType === "telefon" && (
                        <Typography.Text>
                          Adres: {item?.fullAddress}
                        </Typography.Text>
                      )}
                    </Flex>
                  }
                />
              </List.Item>
            )}
          </VirtualList>
        </List>

        <List
          header={
            <Flex gap={8} justify="space-between">
              <Typography.Text style={{ color: "green" }}>
                Sipariş İçeriği
              </Typography.Text>
              <Typography.Text>{basket.length} Adet</Typography.Text>
            </Flex>
          }
        >
          <VirtualList
            style={{
              paddingRight: "10px",
            }}
            data={basket}
            itemHeight={50}
            height={200}
          >
            {(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Flex gap={6}>
                      <Badge color="darkgreen" count={item.quantity} />
                      <Typography.Text>{item.product}</Typography.Text>
                    </Flex>
                  }
                  description={
                    <Flex gap={8} justify="space-between">
                      <Flex gap={2}>
                        Fiyat:
                        <Typography>{item.price}₺</Typography>
                      </Flex>

                      <Flex gap={2}>
                        Toplam:
                        <Typography>{item.price * item.quantity} ₺</Typography>
                      </Flex>
                    </Flex>
                  }
                />
              </List.Item>
            )}
          </VirtualList>
          <Divider />
          <Flex justify="space-between">
            <Flex gap={6} style={{ alignItems: "center" }}>
              <CreditCardOutlined />
              <Typography.Text>Kredi Kartı</Typography.Text>
            </Flex>
            <Flex gap={6} vertical>
              <Typography.Text
                style={{ textAlign: "end", marginTop: "0.5em" }}
              >
                Toplam:{" "}
                {basket.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0)}{" "}
                ₺
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
                İndirim: - {sale.totalSale} ₺
              </Typography.Text>
              <Typography.Text
              type="success"
                style={{
                  margin: 0,
                  textAlign: "end",
                  alignContent: "center",
                  fontSize: 16,
                }}
              >
                Ara Toplam:{" "}
                {basket.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0) - sale.totalSale}{" "}
                ₺
              </Typography.Text>
            </Flex>
          </Flex>
        </List>
      </Modal>
    </>
  );
};

export default ConfirmModal;
