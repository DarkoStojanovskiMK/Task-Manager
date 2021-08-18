import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../context/authContext'


const Login = (props) => {
    const {isAuthenticated,error,login} = useContext(AuthContext)
    
    const [user, setUser] = useState({
        
        email:'',
        password:'',
        
    })

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
            console.log('authenticated');
            
        }
        if(error==='Invalid Credentials'){
            alert('Invalid Credentials');
            
        }
        
    },[isAuthenticated,error,props.history])

    const {email,password} = user;

    const onChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        login({ email,password})
        
        
        
    }
    
    return (
        <form className="form-section" onSubmit={handleSubmit}>
            <h3>LOGIN</h3>
            <p>if not a member, please register</p>
            
            <div className='form-register'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-register'>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={onChange} required/>
            </div>
             
            <button type='submit' className='btn'>Submit</button>

            
        </form>
    )
}

export default Login
