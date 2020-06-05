import api from "./api"

export const AuthService = {
    login: (email, password)=>{
        return api.call('/api/v1/users/login', {
            "email" : email,
            "password" : password
        }, 'POST');
    },
    logout: (token) => {
        return api.call('/auth/logout', {
            notification_token: token
        }, 'POST');
    },
    register: (data)=>{
        return api.call('/api/v1/users/register', data, 'POST');
    },
}