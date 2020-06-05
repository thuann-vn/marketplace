import { LOGIN, LOGOUT } from '../actions/settingsActions'

const initialState = {
   token: null,
   userInfo: null
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userInfo: action.payload.user,
                token: action.payload.token
            };
            break
        case LOGOUT:
            return {
                ...state,
                userInfo: null,
                token: null
            };
            break
        default:
            return state;
    }
};

export default settingsReducer