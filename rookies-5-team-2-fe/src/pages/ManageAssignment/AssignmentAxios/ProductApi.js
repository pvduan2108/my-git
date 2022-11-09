import axiosClient from "./AxiosClient";
class ProductApi {
    getAllAssignments = (object) => {
        const url = '/assignments/view';
        return axiosClient.post(url,object);
    };
    getUserAssignments = (object) => {
        const url = `/assignments/user/${object.username}`;
        return axiosClient.post(url,object);
    }
    getAllUser = (object) => {
        const url = '/user/view/';
        return axiosClient.post(url,object);
    }
    getAllAsset = (object) => {
        const url = '/asset/view/';
        return axiosClient.post(url,object);
    }
    getUserByUsername = (username) => {
        const url = '/user/' + username;
        return axiosClient.get(url);
    }
    getAssetByAssetCode = (assetCode) => {
        const url = '/asset/' + assetCode;
        return axiosClient.get(url);
    }
    saveEditedAssignment = (editedData) => {
        const url = '/assignments/edit';
        return axiosClient.put(url, editedData);
    }
    createAssignment = (editedData) => {
        const url = '/assignments/create';
        return axiosClient.post(url, editedData);
    }

    deleteAssignment = (id) => {
        const url = '/assignments/delete/' + id;
        return axiosClient.get(url);
    }
    changeAssignmentState = (assignment, state) => {
        const url = `/assignments/state=${state}`;
        return axiosClient.put(url, assignment);

    }
    changeAssignmentStateReturn = (assignment) => {
        const url = `/assignments/edit-state`;
        return axiosClient.put(url, assignment);

    }
}
const productApi = new ProductApi();
export default productApi;