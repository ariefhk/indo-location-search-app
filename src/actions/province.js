import { apiInstance } from "./api-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProvince = (querySetting = {}) => {
  return useQuery({
    queryKey: ["get_all_province"],
    queryFn: async () => {
      const response = await apiInstance.get(`/province?APIkey=${process.env.NEXT_PUBLIC_API_KEY}`);
      const datas = response?.data?.data;
      let provinces;

      if (datas?.length > 0) {
        provinces = datas.map((prov, index) => {
          return {
            id: index + 1,
            label: prov?.name,
            value: prov?.name,
            provinceId: prov?.id,
          };
        });
      }

      return datas.length > 0 ? provinces : [];
    },
    refetchOnWindowFocus: false,
    ...querySetting,
  });
};
