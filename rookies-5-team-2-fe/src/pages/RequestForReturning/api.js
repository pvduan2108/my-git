import axios from "axios"
import { API_URL } from "../../constants"

const GET_END_POINT = API_URL + "admin/return";
const COMPLETE_END_POINT = API_URL + "admin/return/complete"
const CANCEL_END_POINT = API_URL + "admin/return/cancel"

export const api_getAll = async (config,token) => {
    try {
        const response = await axios.get(GET_END_POINT, {
            params: {
                locationCode: config.locationCode,
                state: config.state,
                returnDate: config.returnDate,
                search: config.search
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const api_completeById = async (id,_acceptedBy,_returnDate,token) => {
    try {
        const response = await axios.put(`${COMPLETE_END_POINT}/${id}`, 
        {
                acceptedBy:_acceptedBy,
                returnDate:_returnDate,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const api_cancelById = async (id,token) => {
    try {
        const response = await axios.put(`${CANCEL_END_POINT}/${id}`,null,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.status
    } catch (error) {
        return console.log(error)
    }
}