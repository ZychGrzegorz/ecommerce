import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


type UserLoginState={
    userInfo: User | null,
    loading?: boolean,
    error?: string
}
const userLoginInitialState = {
    userInfo: null,
    loading: false,
    error: ''
}

export const userLoginReducer = (state: UserLoginState = userLoginInitialState, action: UserAction)=>{
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
const userRegisterInitialState = {
    userInfo: null,
    loading: false,
    error: ''
}
type UserRegisterState={
    userInfo: User | null,
    loading?: boolean,
    error?: string
}

export const userRegisterReducer = (state: UserRegisterState = userRegisterInitialState, action: UserRegisterAction)=>{
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
    loading: boolean,
    user?: User | object,
    success?: boolean,
    error?: string,
}

const UserDetailsInitialState = {
    user:{}, 
    loading:false
}

export const userDetailsReducer = (state: UserDetailsState = UserDetailsInitialState, action: UserDetailsAction)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true, 
               }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false, 
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
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
    userInfo?: User,
    loading?: boolean,
    success?: boolean,
    error?: string,
    
}

export const userUpdateProfileReducer = (state: UserUpdateProfileState = {}, action: UserUpdateProfileAction)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true, 
               }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false, 
                success: true,
                userInfo: action.payload
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}
type UserListState={
    users:Array<User>
    loading?:boolean
    error?: string
}
export const userListReducer = (state: UserListState = {users:[]}, action: UserListAction)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {
                loading: true, 
               }
        case USER_LIST_SUCCESS:
            return {
                loading: false, 
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case USER_LIST_RESET:
            return { users:[]}
    
        default:
            return state
    }
}

type UserDeleteState = {
    loading?: boolean
    success?:boolean
    error?:string
}
export const userDeleteReducer = (state: UserDeleteState = {}, action: UserDeleteAction)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {
                loading: true, 
               }
        case USER_DELETE_SUCCESS:
            return {
                loading: false, 
                success: true
            }
        case USER_DELETE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }   
        default:
            return state
    }
}

type UserUpdateState = {
    user?: any
    loading?: boolean
    success?:boolean
    error?:string
}

export const userUpdateReducer = (state: UserUpdateState = {user:{}}, action: UserUpdateAction)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {
                loading: true, 
               }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false, 
                success: true
            }
        case USER_UPDATE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }   
        case USER_UPDATE_RESET:
            return {
                user:{}
            }
        default:
            return state
    }
}
