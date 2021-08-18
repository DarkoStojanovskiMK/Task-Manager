import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/context'


const SingleTask = ({name, _id}) => {

    const {deleteTask, setEditedTask} = useGlobalContext()
    console.log(name);
    
    
   
    return (
        <div className='singleTask'>
            <p>{name}</p>
            <div className='editBtns'>
                <button onClick = {()=>deleteTask(_id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
                <Link to={`/api/tasks/${_id}`} onClick={()=>setEditedTask({name:name, id:_id})}> 
                    <i className="fas fa-edit"></i>
                </Link>
                
            </div>
            
        </div>
    )
}

export default SingleTask
