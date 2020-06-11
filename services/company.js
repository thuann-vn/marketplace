import api from "./api"

export const CompanyService = {
    list: ()=> {
        return api.call('/api/v1/company/0/0');
    },
    detail: (id)=> {
        return api.call('/api/v1/company/0/' + id);
    },
    deleteCompany: (id) => {
        return api.call('/api/v1/company/' + id, 'DELETE');
    },
    addOrEditCompany: (data) => {
        if(data.id > 0){
            return api.call('/api/v1/company', data, 'PUT');
        }else{
            return api.call('/api/v1/company/register', data ,'POST');
        }
    }
}