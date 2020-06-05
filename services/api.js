import CONFIG from "../constants/Config";
import {AsyncStorage} from 'react-native';

export default API = {
    call: async (url, data = {}, method = 'GET') => {
        const token = await AsyncStorage.getItem('userToken');
        let options = {
            method: method,
            headers: {
                'X-Requested-With' : 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        if(method.toUpperCase() == 'POST'){
            options.body = JSON.stringify(data);
        }
        return fetch(CONFIG.apiUrl + url, options).then((response) => response.json()).catch((error)=>{
            console.log('Call Api Error', error)
        });
    }
}