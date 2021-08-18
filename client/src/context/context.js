import React, {useContext, useReducer,  createContext} from 'react'
import ContextReducer from './ContextReducer';
import axios from 'axios'

const AppContext = createContext()


const AppProvider = ({children}) => {

    const initialState = {
        tasks:null,
        editedTask:null,
        error:null,
        loading:true
        
    }

    const [state,dispatch] = useReducer(ContextReducer, initialState) 

    const getAllTasks = async ()=>{
        try {
            const res = await axios.get('/api/tasks')
            console.log(res.data);
        
            dispatch({type: 'GET_ALL_TASKS', payload:res.data})
        } catch (err) {
            dispatch({type:'GET_TASKS_ERROR', payload:err.response.msg})
        }
    }

    const addTask = async (task)=>{

        try {
            const config={
                headers:{
                    'Content_Type':"application/json"
                }
            }
        
            const res = await axios.post('/api/tasks', task, config )
            console.log(res);
            
        
            dispatch({type:'ADD_TASK', payload:res.data})
        } catch (err) {
            dispatch({
                type:'TASK_ERROR',
                payload:err.response.msg
            })
        }
    
    }
    const deleteTask= async (id)=>{
        console.log(id)
        await axios.delete(`/api/tasks/${id}`)

        dispatch({type:'DELETE_TASK', payload:id})
            
    }
    const setEditedTask = (task)=>{
        dispatch({type:'SET_EDITED_TASK', payload:task})
        
        
    }

    const editTask = async (task)=>{

        try {
            const config={
                headers:{
                    'Content_Type':"application/json"
                }
            }
        
            const res = await axios.put(`/api/tasks/${task.id}`, task, config )
            console.log(res.data);
            
        
            dispatch({type:'EDIT_TASK', payload:res.data})
        } catch (err) {
            dispatch({
                type:'TASK_ERROR',
                payload:err.response.msg
            })
        }
    }
        return (
            <AppContext.Provider value={{tasks:state.tasks, editedTask:state.editedTask,loading:state.loading, getAllTasks, addTask, deleteTask,setEditedTask, editTask}}>
                {children}
            </AppContext.Provider>
        )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}