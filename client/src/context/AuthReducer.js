

module.exports = (state, action)=>{
    switch(action.type){
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token',action.payload.token )
            return {...state,
                    ...action.payload,
                    isAuthenticated:true,
                    error:null,
                    }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload,
                loading:false
            }
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case 'LOGOUT_USER':
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                user:null,
                error:null
            }
        default:
            return state;

    }
}