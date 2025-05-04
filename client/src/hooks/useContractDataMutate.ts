import { ContractData } from "@/interface/ContractData";
import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: ContractData): AxiosPromise<any> => {
  const response = axios.post(API_URL + "/api/contracts", data);
  return response;
};

export function useContractDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract-data"] });
    },
  });

  return mutate;
}
