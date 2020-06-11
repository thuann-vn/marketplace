import api from "./api"

export const AddressService = {
    detail: (id)=> {
        return api.call('/api/v1/address');
    },
    deleteAddress: (id) => {
        return api.call('/api/v1/address/' + id, {}, 'DELETE');
    },
    addAddress: (data) => {
        return api.call('/api/v1/address', data, 'POST');
    },
    updateAddress: (data) => {
        return api.call('/api/v1/address', data, 'PUT');
    }
}