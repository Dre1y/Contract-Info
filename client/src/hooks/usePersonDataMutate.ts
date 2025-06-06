import { PersonData } from "@/interface/PersonData";
import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:5173"; // TODO Trocar para "https://contract-info.onrender.com"

const postData = async (data: PersonData): AxiosPromise<any> => {
    const response = axios.post(API_URL + "/api/persons", data);
    return response;
};

export function usePersonDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["persons-data"] });
        },
    });

    return mutate;
}
