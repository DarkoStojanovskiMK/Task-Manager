
const ContextReducer = (state, action)=>{

  switch(action.type){
    case 'GET_ALL_TASKS':
      return{
        ...state,
        tasks:action.payload,
        loading:false
        
      }
    case 'ADD_TASK':
      
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        
      }
    case 'TASK_ERROR':
    case 'GET_TASKS_ERROR':
      return{
        ...state,
        error:action.payload
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task=>task._id!==action.payload)
      }
      case 'SET_EDITED_TASK':
      return {
        ...state,
        editedTask: action.payload
      }
      case 'EDIT_TASK':
        console.log(state.tasks);
        
      return {
        ...state,
        tasks: state.tasks.map(task=> task._id===action.payload._id ? action.payload : task)
      }
    default:
      return state;
  }
};
export default ContextReducer;