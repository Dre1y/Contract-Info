import { DeliverableData } from "@/interface/DeliverableData";
import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: DeliverableData): AxiosPromise<any> => {
  const response = axios.post(API_URL + "/api/deliverables", data);
  return response;
};

export function useDeliverableDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliverable-data"] });
    },
  });

  return mutate;
}
