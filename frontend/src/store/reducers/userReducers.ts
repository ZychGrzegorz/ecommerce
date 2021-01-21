import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../constants/userConstants'


type UserLoginState={
    userInfo: User,
    loading?: boolean,
    error?: string
}
const initialState = {
    userInfo: {
        _id: '',
        isAdmin: false,
        name: '',
        email: '',
        token: '',
        },
    loading: false,
    error: ''
}

export const userLoginReducer = (state: any = initialState, action: UserAction)=>{
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
            return {}
        default:
            return state
    }
}

type UserRegisterState={
    userInfo: User,
    loading?: boolean,
    error?: string
}

export const userRegisterReducer = (state: any = initialState, action: UserRegisterAction)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true, 
               }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false, 
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
       
        default:
            return state
    }
}

type UserDetailsState = {
    user: User,
    loading: boolean,
    success?: boolean,
    error?: string,
    userInfo?: User
}

const UserDetailsInitialState = {
    user:{
        _id: '',
        isAdmin: false,
        name: '',
        email: '',          
    }, 
    loading:false
}

export const userDetailsReducer = (state: any = UserDetailsInitialState, action: UserDetailsAction)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true, 
               }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false, 
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
        case USER_DETAILS_RESET:
            return {
                user:{}
                }
        default:
            return state
    }
}
type UserUpdateProfileState = {
    user: object,
    loading?: boolean,
    success?: boolean,
    error?: string,
    userInfo?: {_id: string}
    
}

export const userUpdateProfileReducer = (state: UserUpdateProfileState = {user:{}}, action: UserUpdateProfileAction)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true, 
               }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false, 
                success: true,
                userInfo: action.payload
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }
       
        default:
            return state
    }
}