import axios from "axios";
import { API_URL } from "../../../constants";
//call api
export const getReport = () => {
    return axios
        .get(`${API_URL}asset/report`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        .then((response) => {
            return response.data;
        });

};
