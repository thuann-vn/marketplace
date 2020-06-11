import api from "./api"

export const AddressService = {
    detail: (id)=> {
        return api.call('/api/v1/address/' + id);
    },
    deleteAddress: (id) => {
        return api.call('/api/v1/company/' + id, {}, 'DELETE');
    },
    addAddress: (data) => {
        return api.call('/api/v1/address', data, 'POST');
    },
    updateAddress: (data) => {
        return api.call('/api/v1/address', data, 'PUT');
    }
}