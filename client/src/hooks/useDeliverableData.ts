import { DeliverableData } from "@/interface/DeliverableData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<DeliverableData[]> => {
  const response = axios.get(API_URL + "/api/deliverables");
  return response;
};

export function useDeliverableData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["deliverable-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
