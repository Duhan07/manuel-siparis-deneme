import { Button, Divider, Flex, Form, Input, Select } from "antd";
import FindLocationByAddress from "../../components/FindLocationByAddress";
import { useState } from "react";
import { useStore } from "zustand";
import { customerStore } from "../../store/useStore";

const WithPhoneForm = ({ setCustomerDrawer }) => {
  const setCustomerInfo = useStore(
    customerStore,
    (state) => state.setCustomerInfo
  );

  const [districtId, setDistrictId] = useState();
  const [neighbourhoodId, setNeighbourhoodId] = useState();
  const [streetId, setStreetId] = useState();

  const { districtsData, neighbourhoods, streets, streetDataById } =
    FindLocationByAddress({
      selectedDistrictId: districtId,
      selectedNeighbourhoodId: neighbourhoodId,
      selectedStreetId: streetId,
    });

  const [form] = Form.useForm();

  const saveCustomer = () => {
    const fullAddressInfo = `İstanbul, ${
      districtsData?.items?.find((district) => district.id === districtId)?.name
    }, ${
      neighbourhoods?.find(
        (neighbourhood) => neighbourhood.id === neighbourhoodId
      )?.name
    } Mahallesi, ${
      streets?.find((street) => street.id === streetId)?.name
    }, No: ${form.getFieldValue("kapiNo")}/${form.getFieldValue("daireNo")}
          `;

    setCustomerInfo([
      {
        fullname: form.getFieldValue("fullname"),
        phoneNumbers: form.getFieldValue("phoneNumbers"),
        fullAddress: fullAddressInfo,
        il: "İstanbul",
        ilce: districtsData?.items?.find(
          (district) => district.id === districtId
        )?.name,
        mahalle: neighbourhoods?.find(
          (neighbourhood) => neighbourhood.id === neighbourhoodId
        )?.name,
        caddeSokak: streets?.find((street) => street.id === streetId)?.name,
        kapiNo: form.getFieldValue("kapiNo"),
        daireNo: form.getFieldValue("daireNo"),
        adresTarifi: form.getFieldValue("adresTarifi"),
      },
    ]);

    setCustomerDrawer(false);
  };

  return (
    <Form form={form} onFinish={saveCustomer}>
      <Flex vertical gap={8}>
        <Form.Item
          name="phoneNumbers"
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: "Lütfen telefon numarası giriniz",
            },
            {
              pattern: /^[0-9\b]+$/,
              message: "Lütfen sadece rakam giriniz",
            },
            {
              min: 10,
              message: "Telefon numarası 10 haneli olmalıdır",
            },
          ]}
        >
          <Input maxLength={10} placeholder="555 123 1234" addonBefore="+90 " />
        </Form.Item>

        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Lütfen ad soyad giriniz",
            },
          ]}
        >
          <Input placeholder="Ad Soyad" />
        </Form.Item>

        <Divider orientation="center">Adres Bilgileri</Divider>
        <Flex gap={8} vertical style={{ width: "100%" }}>
          <Form.Item name="il" style={{ width: "100%", marginBottom: "5px" }}>
            <Select
              placeholder="İl"
              options={[{ value: "istanbul", label: "İstanbul" }]}
            />
          </Form.Item>
          <Form.Item name="ilce" style={{ width: "100%", marginBottom: "5px" }}>
            <Select
              placeholder="İlçe"
              options={districtsData?.items?.map((district) => ({
                value: district.id,
                label: district.name,
              }))}
              onChange={(value) => {
                setDistrictId(value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="mahalle"
            style={{ width: "100%", marginBottom: "5px" }}
          >
            <Select
              placeholder="Mahalle"
              options={neighbourhoods?.map((neighbourhood) => ({
                value: neighbourhood.id,
                label: neighbourhood.name,
              }))}
              onChange={(value) => {
                setNeighbourhoodId(value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="caddeSokak"
            style={{ width: "100%", marginBottom: "5px" }}
          >
            <Select
              placeholder="Cadde, Sokak"
              options={streets?.map((street) => ({
                value: street.id,
                label: street.name,
              }))}
              onChange={(value) => {
                setStreetId(value);
              }}
            />
          </Form.Item>

          <Flex gap={8} style={{ width: "100%" }}>
            <Form.Item
              name="kapiNo"
              style={{ width: "50%", marginBottom: "5px" }}
            >
              <Input placeholder="Kapı No" />
            </Form.Item>
            <Form.Item
              name="daireNo"
              style={{ width: "50%", marginBottom: "5px" }}
            >
              <Input placeholder="Daire No" />
            </Form.Item>
          </Flex>
          <Form.Item name="adresTarifi" style={{ width: "100%" }}>
            <Input.TextArea rows={3} placeholder="Adres Tarifi" />
          </Form.Item>
        </Flex>
        <Button type="primary" style={{ width: "100%" }} htmlType="submit">
          Müşteri Seç
        </Button>
      </Flex>
    </Form>
  );
};

export default WithPhoneForm;
