import axios from "axios";
import { API_URL } from "../../../constants";

export const getData = (objNodeAsset) => {
    return axios
      .post(`${API_URL}asset/view`,objNodeAsset, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };
  export const getAllData = (objNodeAsset) => {
    return axios
      .post(`${API_URL}asset/viewdefault`,objNodeAsset, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  export const getCategory = () => {
    return axios
      .get(`${API_URL}category/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };
  // var assetCode = localStorage.getItem('assetCode');
  export const getAssignmentByAssetCode = (assetCode) => {
    return axios
        .get(`${API_URL}assignments/asset_code=${assetCode}`,
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

export const updateAssignmentByAssetCode = (assetCode) => {
  return axios
      .put(`${API_URL}assignments/asset_code=${assetCode}`,
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

  export const deleteAsset = (assetCode) => {
    return axios
        .delete(`${API_URL}asset/${assetCode}`,
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

export const getAsset = (assetCode) => {
  return axios
      .get(`${API_URL}asset/${assetCode}`,
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



