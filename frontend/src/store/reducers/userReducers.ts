import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants'




const initialState = {
    userInfo: null,
    loading: false,
    error: ''
}
type UserLoginState={
    userInfo: User|null,
    loading?: boolean,
    error?: string
}


export const userLoginReducer = (state: UserLoginState = initialState, action: UserAction)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true, 
               }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false, 
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                error: null
                }
        default:
            return state
    }
}
