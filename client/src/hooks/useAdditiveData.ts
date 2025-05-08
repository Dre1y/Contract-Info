import { AdditiveData } from "@/interface/AdditiveData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<AdditiveData[]> => {
  const response = axios.get(API_URL + "/api/additives");
  return response;
};

export function useAdditiveData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["additive-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
