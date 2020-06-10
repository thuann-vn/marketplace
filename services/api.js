import CONFIG from "../constants/Config";
import {AsyncStorage} from 'react-native';

export default API = {
    call: async (url, data = {}, method = 'GET') => {
        let options = {
            method: method,
            headers: {
                'X-Requested-With' : 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }

        //Send token if existed
        const token = await AsyncStorage.getItem('userToken');
        if(token){
            options.headers.Authorization = `Bearer ${token}`;
        }

        if(method.toUpperCase() == 'POST'){
            options.body = JSON.stringify(data);
        }
        return fetch(CONFIG.apiUrl + url, options).then((response) => {
            try{
                return response.json()
            }catch(ex){
                console.log('Parse response failed', response);
            }
        }).catch((error)=>{
            console.log('Call Api Error', CONFIG.apiUrl + url, error)
        });
    }
}