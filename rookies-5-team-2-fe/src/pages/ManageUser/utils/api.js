import axios from "axios";
import { API_URL } from "../../../constants";
//call api
export const getData = () => {
  return axios
    .post(`${API_URL}user/view/`,{
            "locationCode":`${localStorage.getItem("locationCode")}`,"username" : `${localStorage.getItem("theChosenOne")}`
        },
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

export const filterUser = (input, type) => {
    localStorage.removeItem("theChosenOne")
  //nho return axios
  return axios
    .post(`${API_URL}user/search`,
        {"input":`${input}`,"locationCode" : `${localStorage.getItem('locationCode')}`, "type":`${type}`},
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
export const createUser = (input) => {
    let userDto = {
        "firstName": input.firstName,
        "lastName": input.lastName,
        "joinedDate": input.joinedDate,
        "birthDate": input.dateOfBirth,
        "gender": input.gender,
        "type": input.type,
        "location": {
            "locationCode": localStorage.getItem('locationCode'),
        },
        "state": 1,
        "firstTime": 1
    }
    console.log(userDto)
    //nho return axios
    return axios
        .post(`${API_URL}user/`,
            userDto,
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

export const editUser = (input, username) => {
    //nho return axios
    return axios
        .put(`${API_URL}user/`,
            {"username":`${username}`,"dateOfBirth" : `${input.dateOfBirth}`,
                "joinedDate" : `${input.joinedDate}`, "gender" : `${input.gender}`, "type":`${input.type}`},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        .then((response) => {
            // return response.data;
        });
};

export const disableUser = (input) => {
    localStorage.removeItem("theChosenOne")
    return axios
        .delete(`${API_URL}user/${input}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        .then((response) => {
            return response.data;
        })
}

export const checkDisableUser = (input) => {
    localStorage.removeItem("theChosenOne")
    console.log("come to the api token is: ", localStorage.getItem('token'))
    return axios
        .get(`${API_URL}user/disable/${input}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        .then((response) => {
            return response.data;
        })
}
