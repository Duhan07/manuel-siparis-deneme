import { useQuery } from "@tanstack/react-query";
import { BranchAPI } from "../../lib/axios";

export const useDistricts = ({ enabled }) =>
  useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      let path = `/geo_districts`;

      const response = await BranchAPI.get(path);

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useDistrictById = ({ enabled, id, onSuccess }) =>
  useQuery({
    queryKey: ["districtsById", id],
    queryFn: async () => {
      let path = `/geo_districts/${id}`;

      const response = await BranchAPI.get(path);

      onSuccess?.(response.data);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useNeighbourhoods = ({ enabled }) =>
  useQuery({
    queryKey: ["neighbourhoods"],
    queryFn: async () => {
      let path = `/geo_neighbourhoods`;

      const response = await BranchAPI.get(path);

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useNeighbourhoodById = ({ enabled, id, onSuccess }) =>
  useQuery({
    queryKey: ["neighbourhoodsById", id],
    queryFn: async () => {
      let path = `/geo_neighbourhoods/${id}`;

      const response = await BranchAPI.get(path);

      onSuccess?.(response.data);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useStreets = ({ enabled }) =>
  useQuery({
    queryKey: ["streets"],
    queryFn: async () => {
      let path = `/geo_streets`;

      const response = await BranchAPI.get(path);

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

export const useStreetById = ({ enabled, id, onSuccess }) =>
  useQuery({
    queryKey: ["streetsById", id],
    queryFn: async () => {
      let path = `/geo_streets/${id}`;

      const response = await BranchAPI.get(path);

      onSuccess?.(response.data);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
