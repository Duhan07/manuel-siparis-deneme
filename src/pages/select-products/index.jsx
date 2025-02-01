import { useEffect } from "react";
import {
  useBrandsByBuilding,
  useProductsByRestaurantId,
} from "../../api/brands/useBrands";
import { DEFAULT_PAGE_SIZE } from "../../lib/constants";
import { useRestaurants } from "../../api/useRestaurant";
import { useStore } from "zustand";
import { basketStore, productStore } from "../../store/useStore";
import ProductsTitle from "./ProductsTitle";
import ProductsBody from "./ProductsBody";

const SelectProducts = ({ setIsLoading }) => {
  const setBasket = useStore(basketStore, (state) => state.setBasket);
  const selectedBuilding = useStore(
    productStore,
    (state) => state.selectedBuilding
  );
  const selectedBrand = useStore(productStore, (state) => state.selectedBrand);
  const setSelectedBrand = useStore(
    productStore,
    (state) => state.setSelectedBrand
  );

  const { data: brandData, isLoading: isLoadingBrand } = useBrandsByBuilding({
    buildingId: selectedBuilding?.value,
    enabled: !!selectedBuilding?.value,
    onSuccess: (data) => {
      setSelectedBrand(data?.items?.[0]);
    },
  });

  const {
    data: restaurantsData,
    refetch,
    isLoading: isLoadingRestaurants,
  } = useRestaurants({
    pageSize: DEFAULT_PAGE_SIZE,
    where: `[
          ["brand_id", "eq", "${selectedBrand?.id || selectedBrand?.value}"],
          ["building_id", "eq", "${selectedBuilding?.value}"]
      ]`,
    enabled: !!selectedBrand?.id,
  });

  const { data: productsDataByRestaurantId, isLoading: isLoadingProducts } =
    useProductsByRestaurantId({
      restaurantId: restaurantsData?.[0]?.id,
      enabled: !!restaurantsData?.[0]?.id,
    });

  useEffect(() => {
    if (isLoadingProducts || isLoadingRestaurants || isLoadingBrand) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingProducts, isLoadingRestaurants, isLoadingBrand]);

  useEffect(() => {
    if (restaurantsData) {
      refetch();
    }
    setBasket([]);
  }, [selectedBrand]);

  return (
    <>
    <ProductsTitle brandData={brandData} productsDataByRestaurantId={productsDataByRestaurantId} />
    <ProductsBody productsDataByRestaurantId={productsDataByRestaurantId} />
      {/* <div id="fixed-content">
        <Flex justify="space-between" gap={8} style={{ width: "100%" }}>
          <Card
            style={{ width: "100%", border: "none" }}
            styles={{
              body: {
                paddingBottom: 0,
              },
            }}
            title={
              <Flex gap={8} justify="space-between" align="center">
                <Flex gap={8} align="center">
                  <Image
                    width={50}
                    src={selectedBrand?.logoUrl || selectedBrand?.image}
                    style={{
                      paddingRight: 10,
                    }}
                  />

                  <Select
                    defaultValue={brandData?.items?.[0]?.name}
                    value={selectedBrand?.value || selectedBrand?.id}
                    placeholder="Restorant Seçiniz"
                    style={{
                      width: 200,
                    }}
                    options={brandData?.items?.map((brand) => ({
                      label: brand.name,
                      value: brand.id,
                      image: brand.logoUrl,
                    }))}
                    onChange={(_, record) => {
                      setSelectedBrand(record);
                    }}
                  />
                </Flex>
                <Search
                  id="search"
                  placeholder="Ürün Ara"
                  allowClear
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                  }}
                />
                <Flex gap={8} align="center">
                  <Select
                    placeholder="Bina Seçiniz"
                    options={buildingsData?.map((building) => ({
                      label: building.name,
                      value: building.id,
                    }))}
                    onChange={(_, record) => {
                      setSelectedBuilding(record);
                    }}
                    value={selectedBuilding?.value}
                  />
                  <CustomerInfo />
                </Flex>
              </Flex>
            }
          >
            <Anchor
              showInkInFixed={false}
              items={anchorItems}
              direction="horizontal"
              targetOffset={150}
              style={{
                maxHeight: 200,
                height: 50,
                backgroundColor: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
            />
          </Card>
        </Flex>
      </div> */}
      {/* <Form form={form}>
        <div id="scrollable-products">
          <Form.Item style={{ marginTop: "12%" }}>
            {productsByCategory &&
              Object.entries(productsByCategory).map(
                (selectedProduct, index) => (
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
                                <Image
                                  width={110}
                                  src={`https://storage.googleapis.com/pm-products-image/${
                                    selectedBrand?.name || selectedBrand?.label
                                  }/${turkishToEnglish(product.name)}.jpg`}
                                />
                                <Flex justify="end" align="center">
                                  <Popconfirm
                                    title={`
                                    ${product.name}
                                    `}
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
                                          isProductInBasket(product) &&
                                          "#f76f52",
                                      }}
                                    />
                                  </Popconfirm>
                                </Flex>
                              </Flex>
                              <Flex
                                vertical
                                gap={16}
                                style={{ flexWrap: "wrap" }}
                              >
                                <Flex vertical gap={8}>
                                  <Typography.Text>
                                    {product.name}
                                  </Typography.Text>
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
                )
              )}
          </Form.Item>
        </div>
      </Form> */}
    </>
  );
};

export default SelectProducts;
