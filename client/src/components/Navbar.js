import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);


    const onLogout=()=>{
        logout()
    }

    if(user){
        return (
            <nav>
                <div>
                    <Link to = '/' > 
                        <p>TASK MANAGER</p>
                    </Link>
                </div>
                <div>
                    <Link to='/' onClick={onLogout} className='reg-log'>
                        <p style={{color:'orangered'}}>Logout {user.name}</p>
                    </Link>
                </div>
                
            </nav>
            
        )
    }else{
        return (
        <nav>
            <div>
                <Link to = '/' > 
                    <p>TASK MANAGER</p>
                </Link>
            </div>
            <div className='reg-log'>
                <ul>
                    <li>
                        <Link to='/register' >Register</Link>
                    </li>
                   
                    <li>
                        <Link to='/login' >Login</Link>
                    </li>
                </ul>
                
            </div>
            
            
        </nav>
        )
    }

    
}

export default Navbar
