import { useQuery } from "@tanstack/react-query";
import { BuildingsAPI } from "../../lib/axios";

export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      let path = `/employees`;

      const response = await BuildingsAPI.get(path);

      return response.data;
    },
    refetchOnWindowFocus: false,
  });
