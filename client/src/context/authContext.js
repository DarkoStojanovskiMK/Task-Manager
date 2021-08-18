import React, { useReducer, createContext} from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext()



const AuthProvider = ({children}) => {

    const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        user:null,
        error:null,
        loading:true
        
    }

    const [state,dispatch]=useReducer(AuthReducer, initialState);

    const loadUser = async ()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');
            console.log(res);
            
            dispatch({type:'USER_LOADED', payload:res.data})
        } catch (err) {
            dispatch({type:'AUTH_ERROR'})
        }
        
        console.log('load user');
        
    }
    const register = async (user)=>{
        console.log(user);
        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', user, config)
            console.log(res.data);
            dispatch({type:'REGISTER_SUCCESS', payload:res.data})
            loadUser()

        } catch (err) {
            console.log(err.response.data.msg);
            
            dispatch({type:'REGISTER_FAIL', payload:err.response.data.msg})
        }
        
    }

    const login = async (user)=>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', user, config)
            console.log(res.data);
            dispatch({type:'LOGIN_SUCCESS', payload:res.data})
            loadUser()

        } catch (err) {
            console.log(err.response.data.msg);
            
            dispatch({type:'LOGIN_FAIL', payload:err.response.data.msg})
        }
        
    }
    const logout = ()=>{
        dispatch({type:'LOGOUT_USER'})
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated:state.isAuthenticated,error:state.error, 
            user:state.user,loading:state.loading, register, login, loadUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
