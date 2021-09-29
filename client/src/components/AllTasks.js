import React,{useEffect} from 'react'

import SingleTask from './SingleTask'
import { useGlobalContext} from '../context/context'


const AllTasks = () => {

    const {tasks, getAllTasks, loading} = useGlobalContext()
    

    useEffect(()=>{
        getAllTasks();
        // eslint-disable-next-line
    }, [])
    
    
    if( loading || tasks === null || tasks.length ===0  ){
        return (
            <h2>Please add task</h2>
        )
    }else{
        return (
        <div className='allTasks'>
            {tasks.map((item)=>{
                
               return <SingleTask key={item._id} {...item}/>
            })}
        </div>
        )
    }
    
}

export default AllTasks
