import { apiInstance } from "./api-instance";
import { useQuery } from "@tanstack/react-query";

// get district by regency id
export const useGetDistrictByRegencyId = (regency_id = null, querySetting = {}) => {
  return useQuery({
    queryKey: ["get_district_by_regency_id", regency_id],
    queryFn: async () => {
      const response = await apiInstance.get(`/district/show-by-regency/${regency_id}?APIkey=${process.env.NEXT_PUBLIC_API_KEY}`);
      const datas = response?.data?.data;

      console.log({
        hehe: regency_id,
        datas,
      });

      let distritcs;
      if (datas.length > 0) {
        distritcs = datas?.map((dis, index) => {
          return {
            id: index + 1,
            label: dis?.name,
            value: dis?.name,
            districtId: dis?.id,
          };
        });
      }

      return datas.length > 0 ? distritcs : [];
    },
    refetchOnWindowFocus: false,
    enabled: !!regency_id,
    ...querySetting,
  });
};
