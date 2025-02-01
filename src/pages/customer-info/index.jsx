import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Typography,
  Drawer,
  notification,
  Avatar,
  Tooltip,
  Segmented,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  PhoneOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStore } from "zustand";
import { customerStore } from "../../store/useStore";
import PersonelForm from "./PersonelForm";
import TakeAwayForm from "./TakeawayForm";
import WithPhoneForm from "./WithPhoneForm";

const CustomerInfo = () => {
  const customerType = useStore(customerStore, (state) => state.customerType);
  const setCustomerType = useStore(
    customerStore,
    (state) => state.setCustomerType
  );
  const customerInfo = useStore(customerStore, (state) => state.customerInfo);
  const setCustomerInfo = useStore(
    customerStore,
    (state) => state.setCustomerInfo
  );

  const [customerDrawer, setCustomerDrawer] = useState(
    customerInfo[0]?.fullname ? false : true
  );

  const [form] = useForm();

  let showedNotification;
  useEffect(() => {
    if (customerInfo[0]?.fullname === undefined && !showedNotification) {
      showedNotification = false;
      setCustomerDrawer(true);
      notification.error({
        message: "Lütfen Müşteri Seçiniz",
        duration: 2,
      });
      showedNotification = true;
    } else if (customerInfo[0]?.fullname !== undefined && !showedNotification) {
      form.setFieldsValue(customerInfo[0]);
    }
  }, [customerInfo[0]]);

  const customerTypeOptions = [
    {
      value: "personel",
      label: (
        <Flex gap={8}>
          <TeamOutlined />
          <Typography.Text>Personel</Typography.Text>
        </Flex>
      ),
    },
    {
      value: "gelal",
      label: (
        <Flex gap={8}>
          <ShopOutlined />
          <Typography.Text>Gel Al</Typography.Text>
        </Flex>
      ),
    },
    {
      value: "telefon",
      label: (
        <Flex gap={8}>
          <PhoneOutlined />
          <Typography.Text>Telefon</Typography.Text>
        </Flex>
      ),
    },
  ];

  const drawerTitle = (
    <Flex gap={8}>
      <Typography.Text style={{ alignContent: "center" }}>
        Müşteri Bilgileri
      </Typography.Text>
      <UserOutlined />
    </Flex>
  );

  const drawerClose = () => {
    if (customerInfo[0]?.fullname === undefined) {
      setCustomerDrawer(true);
      notification.error({
        message: "Lütfen Müşteri Seçiniz",
      });
    } else {
      setCustomerDrawer(false);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [customerType]);

  const ChangeOrderType = useMemo(
    () =>
      ({ customerType }) => {
        if (customerType === "personel") {
          return <PersonelForm setCustomerDrawer={setCustomerDrawer} />;
        } else if (customerType === "gelal") {
          return <TakeAwayForm setCustomerDrawer={setCustomerDrawer} />;
        } else if (customerType === "telefon") {
          return <WithPhoneForm setCustomerDrawer={setCustomerDrawer} />;
        }
      },
    [customerType]
  );

  const shorteningName = customerInfo?.[0]?.fullname?.split(" ");

  return (
    <>
      <Tooltip title={customerInfo[0]?.fullname}>
        <Avatar
          className="customer-avatar"
          size={40}
          onClick={() => setCustomerDrawer(true)}
          style={{
            cursor: "pointer",
          }}
        >
          {shorteningName?.[0]?.[0] + shorteningName?.[1]?.[0]}
        </Avatar>
      </Tooltip>
      <Drawer
        open={customerDrawer}
        placement="left"
        onClose={drawerClose}
        title={drawerTitle}
      >
        <Flex gap={24} vertical>
          <Segmented
            style={{
              alignSelf: "center",
            }}
            options={customerTypeOptions}
            value={customerType}
            onChange={(value) => {
              setCustomerType(value);
              setCustomerInfo([]);
            }}
          />
          <ChangeOrderType customerType={customerType} />
        </Flex>
      </Drawer>
    </>
  );
};

export default CustomerInfo;
