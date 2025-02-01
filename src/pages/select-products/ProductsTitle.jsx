import { Card, Flex, Image, Select, Input, Anchor } from "antd";
import CustomerInfo from "../customer-info";
import { productStore } from "../../store/useStore";
import { useStore } from "zustand";
import { useBuildings } from "../../api/buildings";

const { Search } = Input;

const ProductsTitle = ({brandData, productsDataByRestaurantId}) => {
    const selectedBuilding = useStore(
        productStore,
        (state) => state.selectedBuilding
      );
    const setSelectedBuilding = useStore(
        productStore,
        (state) => state.setSelectedBuilding
      );
    const selectedBrand = useStore(productStore, (state) => state.selectedBrand);
    const setSelectedBrand = useStore(
      productStore,
      (state) => state.setSelectedBrand
    );

    const { data: buildingsData } = useBuildings({
        enabled: true,
        onSuccess: (data) => {
          setSelectedBuilding({
            label: data?.[0]?.name,
            value: data?.[0]?.id,
          });
        },
      });

      const productsCategories = [
        ...new Set(
          productsDataByRestaurantId?.pm_products?.map(
            (product) => product.category
          )
        ),
      ];

      const anchorItems = [
        ...productsCategories.map((category) => ({
          title: category,
          href: `#${category}`,
          value: category,
        })),
      ];

    return (
        <div id="fixed-content">
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
      </div>
    )
}

export default ProductsTitle