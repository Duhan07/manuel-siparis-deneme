import { useQuery } from "@tanstack/react-query";
import { BranchAPI } from "../../lib/axios";

export const useRestaurants = ({ where, pageSize, enabled, select }) =>
  useQuery({
    queryKey: ["restaurants", pageSize],
    queryFn: async () => {
      let path = `/restaurants?orderBy=created_at&sortOrder=asc`;

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
