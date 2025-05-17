import { ContractorData } from "@/interface/ContractorData";
import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: ContractorData): AxiosPromise<any> => {
  const response = axios.post(API_URL + "/api/contractors", data);
  return response;
};

export function useContractorDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractors-data"] });
    },
  });

  return mutate;
}
