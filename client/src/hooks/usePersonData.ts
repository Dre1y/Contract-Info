import { PersonData } from "@/interface/PersonData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:5173"; // TODO Trocar para "https://contract-info.onrender.com"

const fetchData = async (): AxiosPromise<PersonData[]> => {
    const response = await axios.get(API_URL + "/api/persons");
    return response.data;
};

export function usePersonData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["person-data"],
    });

    return {
        ...query,
        data: query.data?.data,
    };
}
