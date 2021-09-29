import React, {useRef, useEffect, useState} from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useGlobalContext } from '../context/context';


const EditTask = () => {
    const { editTask, editedTask} = useGlobalContext()
    const {id} = useParams()
    const newValue = useRef('')
    const [task, setTask] = useState({name:'',id:''})
    const [redirect, setRedirect] = useState(false)

    
    useEffect(()=>{
        if(editedTask){
            setTask({name:editedTask.name, id:editedTask.id})
        }else(setTask(''))
        // eslint-disable-next-line
    }, [])


    const onChange=()=>{

        setTask({name:newValue.current.value, id:id})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        editTask(task)
        console.log(task);
        setRedirect(true)
    
    }

    if(redirect){
        
            return <Redirect to='/'/>
        }

    return (
        <div className='form-section'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input-div'>
                    <label htmlFor="editTask">Edit Task</label>
                    <input type="text" name='editTask' value={task.name} ref={newValue} onChange={onChange}/>
                </div>
                <button type='submit' className='btn'>Submit</button>
            </form>
            
        </div>
    )
}

export default EditTask
