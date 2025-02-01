import { Button, Flex, Form, Input } from "antd";
import { customerStore } from "../../store/useStore";
import { useStore } from "zustand";

const TakeAwayForm = ({ setCustomerDrawer }) => {
  const setCustomerInfo = useStore(
    customerStore,
    (state) => state.setCustomerInfo
  );

  const [form] = Form.useForm();

  const saveCustomer = () => {
    setCustomerInfo([
      {
        fullname: form.getFieldValue("fullname"),
        phoneNumbers: form.getFieldValue("phoneNumbers"),
      },
    ]);

    setCustomerDrawer(false);
  };

  return (
    <Form form={form} onFinish={saveCustomer}>
      <Flex gap={8} vertical>
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
        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Müşteri Seç
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default TakeAwayForm;
