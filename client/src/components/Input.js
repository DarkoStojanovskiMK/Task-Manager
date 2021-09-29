import React from 'react';
import { useGlobalContext } from '../context/context';



const Input = () => {

    const {addTask} = useGlobalContext();
    const searchValue= React.useRef('');

    const handleSubmit = (e)=>{
        e.preventDefault();
       
        const newItem = {name:searchValue.current.value, id:new Date().getTime().toString()}
        addTask(newItem)
        
        searchValue.current.value = ''

        
    }
    
    return (
        <div className='form-section'>
            <form className='form' onSubmit = {handleSubmit}>
                <div className='input-div' >
                    <label htmlFor="task">New Task</label>
                    <input 
                    type="text" 
                    name='task' 
                    id='task'
                    ref={searchValue} 
                    required
                    />
                </div>
                <button type='submit' className='btn'>Add Task</button>
            </form>
            
        </div>
    )
}

export default Input
