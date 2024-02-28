import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos:[{id:1,text:"Hello Check"}]
}


export const todoSlice=createSlice({  
    name:'todo',
    initialState,
    reducers:{ //Contains property and function
        addTodo: (state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            //Add created todo object to state
            state.todos.push(todo)
        },
        removeTodo: (state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id !==action.payload)
        },
        editTodo: (state, action) => {
            const { id, newText } = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
      
            if (existingTodo) {
              existingTodo.text = newText;
            }
          },
      
    }
})

//State gives access to current state of variables
//Action gives access to values

export const {addTodo,removeTodo,editTodo}=todoSlice.actions

export default todoSlice.reducer

//createSlice:A function that accepts an initial state, an object of reducer functions,
// and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

//Reducer: JS functions which take in the previous state and an action and return the newly updated state.