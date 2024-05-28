import { apiInstance } from "./api-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetRegencyByProvinceId = (province_id = null, querySetting = {}) => {
  return useQuery({
    queryKey: ["get_regency_by_province_id", province_id],
    queryFn: async () => {
      const response = await apiInstance.get(
        `/regency/show-by-province/${province_id}?APIkey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const datas = response?.data?.data;
      let regencies;
      if (datas.length > 0) {
        regencies = datas?.map((reg, index) => {
          return {
            id: index + 1,
            label: reg?.name,
            value: reg?.name,
            regencyId: reg?.id,
          };
        });
      }

      return datas.length > 0 ? regencies : [];
    },
    refetchOnWindowFocus: false,
    enabled: !!province_id,
    ...querySetting,
  });
};
