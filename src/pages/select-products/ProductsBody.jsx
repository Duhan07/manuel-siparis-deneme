import { useStore } from "zustand";
import { basketStore, productStore } from "../../store/useStore";
import {
  Button,
  Card,
  Flex,
  Form,
  Image,
  Input,
  notification,
  Popconfirm,
  Typography,
} from "antd";
import { turkishToEnglish } from "../../lib/turkishToEnglish";
import { PlusOutlined } from "@ant-design/icons";

const ProductsBody = ({ productsDataByRestaurantId }) => {
  const basket = useStore(basketStore, (state) => state.basket);
  const setBasket = useStore(basketStore, (state) => state.setBasket);
  const selectedBrand = useStore(productStore, (state) => state.selectedBrand);

  const [form] = Form.useForm();

  const productImage = (product) => {
    return `https://storage.googleapis.com/pm-products-image/${
      selectedBrand?.name || selectedBrand?.label
    }/${turkishToEnglish(product.name)}.jpg`;
  };

  const productsByCategory = productsDataByRestaurantId?.pm_products?.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  const addProductToBasket = (product) => {
    const existingItem = basket.find((item) => item.product === product.name);

    if (existingItem) {
      notification.info({
        message: "Bu ürün sepette var",
      });
    } else {
      setBasket([
        ...basket,
        {
          product: product.name,
          quantity: 1,
          price: product.price,
        },
      ]);
    }
  };

  const isProductInBasket = (product) => {
    const existingItem = basket.find((item) => item.product === product.name);

    if (existingItem) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Form form={form}>
      <div id="scrollable-products">
        <Form.Item style={{ marginTop: "12%" }}>
          {productsByCategory &&
            Object.entries(productsByCategory).map((selectedProduct, index) => (
              <>
                <Flex vertical id={selectedProduct[0]}>
                  <Typography.Title level={5}>
                    {Object.keys(productsByCategory)[index]}
                  </Typography.Title>

                  <Flex
                    gap={8}
                    style={{
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {selectedProduct[1].map((product, index) => (
                      <Card
                        style={{ marginBottom: 5, width: "25%" }}
                        key={index}
                      >
                        <Flex vertical gap={24}>
                          <Flex gap={8} justify="center" align="end">
                            <Image width={110} src={productImage(product)} />
                            <Flex justify="end" align="center">
                              <Popconfirm
                                title={`${product.name}`}
                                onConfirm={() => {
                                  addProductToBasket(product);
                                  setBasket([
                                    ...basket,
                                    {
                                      product: product.name,
                                      quantity: 1,
                                      price: product.price,
                                      note: form.getFieldValue("note"),
                                    },
                                  ]);
                                  form.resetFields();
                                }}
                                description={
                                  <Form.Item name="note">
                                    <Input.TextArea
                                      placeholder="Notunuzu buraya yazabilirsiniz"
                                      style={{ width: 300, marginTop: 10 }}
                                      name="note"
                                    />
                                  </Form.Item>
                                }
                                okText="Sepete Ekle"
                                cancelText="Vazgeç"
                              >
                                <Button
                                  type="default"
                                  size="middle"
                                  shape="circle"
                                  disabled={isProductInBasket(product)}
                                  icon={
                                    isProductInBasket(product) ? (
                                      <Typography.Text
                                        style={{
                                          color: "white",
                                          fontSize: 16,
                                        }}
                                      >
                                        {
                                          basket.find(
                                            (item) =>
                                              item.product === product.name
                                          ).quantity
                                        }
                                      </Typography.Text>
                                    ) : (
                                      <PlusOutlined />
                                    )
                                  }
                                  style={{
                                    position: "absolute",
                                    backgroundColor:
                                      isProductInBasket(product) && "#f76f52",
                                  }}
                                />
                              </Popconfirm>
                            </Flex>
                          </Flex>
                          <Flex vertical gap={16} style={{ flexWrap: "wrap" }}>
                            <Flex vertical gap={8}>
                              <Typography.Text>{product.name}</Typography.Text>
                              <Typography.Text>
                                {product.price} ₺
                              </Typography.Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </Flex>
                </Flex>
              </>
            ))}
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductsBody;
