import api from "./api"

export const AccountService = {
    getProfile: ()=> {
        return api.call('/api/v1/users/');
    },
    updateProfile: (data)=>{
        return api.call('/api/v1/users/update', data, 'POST');
    },
    getAccounts: (id = 0) => {
        return api.call('/api/v1/users/account/1/' + id);
    },
    deleteAccount: (id) => {
        return api.call('/api/v1/users/account/' + id, 'DELETE');
    },
    addOrEditAccount: (data) => {
        if(data.id > 0){
            return api.call('/api/v1/users/account', data, 'PUT');
        }else{
            return api.call('/api/v1/users/account', data,'POST');
        }
    }
}