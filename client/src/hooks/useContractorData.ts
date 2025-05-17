import { ContractorData } from "@/interface/ContractorData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<ContractorData[]> => {
  const response = axios.get(API_URL + "/api/contractors");
  return response;
};

export function useContractorData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["contractor-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
