import { ContractData } from "@/interface/ContractData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://contract-info.onrender.com";

const fetchData = async (): AxiosPromise<ContractData[]> => {
  const response = axios.get(API_URL + "/api/contracts");
  return response;
};

export function useContractData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["contract-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
