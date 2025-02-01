import { useQuery } from "@tanstack/react-query";
import { BranchAPI, BuildingsAPI } from "../../lib/axios";

export const useBrands = ({ where, pageSize, enabled, select }) =>
  useQuery({
    queryKey: ["brands", pageSize],
    queryFn: async () => {
      let path = `/brands?orderBy=created_at&sortOrder=asc`;

      if (pageSize) {
        path += `&pageSize=${pageSize}`;
      }

      if (where) {
        path += `&where=${where}`;
      }

      const response = await BranchAPI.get(path);

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
    select,
  });

export const useBrandsByBuilding = ({ buildingId, enabled, onSuccess }) =>
    
  useQuery({
    queryKey: ["brandsByBuilding", buildingId],
    queryFn: async () => {
      const response = await BranchAPI.get(`/brands/buildings/${buildingId}`);
      
      onSuccess?.(response.data);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useProductsByRestaurantId = ({ restaurantId, enabled }) =>
  useQuery({
    queryKey: ["productsByRestaurantId", restaurantId],
    queryFn: async () => {
      const response = await BuildingsAPI.get(
        `/pm-products/manuel-order-products?pm_restaurant_id=${restaurantId}`
      );

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
