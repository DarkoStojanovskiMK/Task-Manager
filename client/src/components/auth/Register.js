import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../context/authContext'


const Register = (props) => {
    const {isAuthenticated,error,register} = useContext(AuthContext)
    
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
            console.log('authenticated');
            
        }
        if(error==='user already exists'){
            alert('User Already Exists!')
            
        }
        
    },[isAuthenticated,error,props.history])

    const {name,email,password,password2} = user;

    const onChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(password!==password2){
            return alert('Passwords Dont Match!')
        }
        if(password.length<8){
            return alert('Password should be at least 8 characters long')
        }
        
        register({ name,
        email,
        password})
        
    }
    
    return (
        <form className="form-section" onSubmit={handleSubmit}>
            <h3>REGISTER</h3>
            <div className='form-register'>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={name} onChange={onChange} required/>
            </div>
            <div className='form-register'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-register'>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={onChange}  required/>
            </div>
             <div className='form-register'>
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name='password2' value={password2} onChange={onChange}  required/>
            </div>
            <button type='submit' className='btn'>Submit</button>

            
        </form>
    )
}

export default Register
