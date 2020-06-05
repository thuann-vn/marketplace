import api from "./api"

export const AccountService = {
    getProfile: ()=> {
        return api.call('/api/v1/users/');
    },
    updateProfile: (data)=>{
        return api.call('/api/v1/users/update', data, 'POST');
    },
}