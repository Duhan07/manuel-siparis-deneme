import { useStore } from "zustand";
import { useEmployees } from "../../api/employees";
import { customerStore } from "../../store/useStore";
import { Button, Form, Select } from "antd";
import { useState } from "react";

const PersonelForm = ({ setCustomerDrawer }) => {
  const customerInfo = useStore(customerStore, (state) => state.customerInfo);
  const setCustomerInfo = useStore(
    customerStore,
    (state) => state.setCustomerInfo
  );

  const [selectedPersonel, setSelectedPersonel] = useState({});

  const [form] = Form.useForm();

  const saveCustomer = () => {
    setCustomerInfo(
      selectedPersonel
        ? [
            {
              fullname: selectedPersonel.fullname,
              phoneNumbers: selectedPersonel.phoneNumbers,
            },
          ]
        : []
    );

    setCustomerDrawer(false);
  };

  const { data: employeesData } = useEmployees();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form form={form} onFinish={saveCustomer}>
      <Form.Item
        name="personel"
        rules={[{ required: true, message: "Lütfen personel seçiniz" }]}
      >
        <Select
          showSearch
          placeholder="Personel Seç"
          filterOption={filterOption}
          allowClear
          optionFilterProp="label"
          style={{
            width: "100%",
          }}
          options={employeesData?.employees?.map((item) => ({
            value: item.id,
            label: `${item.name} ${item.surname}`,
            phone_number: item.phone_number,
          }))}
          onChange={(_, record) => {
            // setCustomerInfo([
            //   {
            //     fullname: record?.label,
            //     value: record?.value,
            //     phoneNumbers: record?.phone_number,
            //   },
            // ]);
            setSelectedPersonel({
              fullname: record?.label,
              value: record?.value,
              phoneNumbers: record?.phone_number,
            });
          }}
          value={customerInfo}
          onClear={() => setCustomerInfo([])}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ width: "100%" }} htmlType="submit">
          Müşteri Seç
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonelForm;
