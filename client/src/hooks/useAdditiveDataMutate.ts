import { AdditiveData } from "@/interface/AdditiveData";
import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: AdditiveData): AxiosPromise<any> => {
  const response = axios.post(API_URL + "/api/additives", data);
  return response;
};

export function useAdditiveDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["additive-data"] });
    },
  });

  return mutate;
}
