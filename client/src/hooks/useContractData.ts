import { ContractData } from "@/interface/ContractData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<ContractData[]> => {
  const response = axios.get(API_URL + "/api/contracts");
  return response;
};

export function useContractData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["contractData"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
