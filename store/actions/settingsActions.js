import { AuthService } from "../../services/auth";
import { AsyncStorage } from "react-native";

//Action names
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (user, token) => {
    return {
        type: LOGIN,
        payload: {user, token}
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};