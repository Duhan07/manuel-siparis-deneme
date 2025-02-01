import { BranchAPI } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useBuildings = ({ enabled, onSuccess }) =>
  useQuery({
    queryKey: ["buildings"],
    queryFn: async () => {
      let path = `/buildings`;

      const response = await BranchAPI.get(path);

      onSuccess?.(response.data);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
