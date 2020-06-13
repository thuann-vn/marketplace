import api from "./api"

export const AddressService = {
    userAddressDetail: (userId) => {
        return api.call(`/api/v1/address/${userId}`);
    },
    detail: (id)=> {
        return api.call(`/api/v1/address/${id}`);
    },
    deleteAddress: (id) => {
        return api.call(`/api/v1/address/${id}`, {}, 'DELETE');
    },
    addOrUpdateAddress: (data) => {
        if(data.id > 0){
            return api.call('/api/v1/address', data, 'PUT');
        }else{
            return api.call('/api/v1/address', data,'POST');
        }
    }
}