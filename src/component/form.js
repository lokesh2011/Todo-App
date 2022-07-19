import React, {useEffect} from 'react';
import {v4 as uuidV4} from 'uuid';

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {

    const updateTodo =(title,id,completed) =>{
        const newTodo = todos.map((todo) => 
            todo.id === id ? {title,id,completed} : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    }
    useEffect(()=> {
        if(editTodo){
            setInput(editTodo.title);
        }
        else{
            setInput("");
        }
    },[setInput,editTodo]);


    const onInputChange = (e) => {
        setInput(e.target.value);
    }
    const onFormSubmit = (e) =>{
        e.preventDefault();
        if(input ===""){
            alert("this field can't be empty");
        }
        else{
        if(!editTodo){
        setTodos([...todos, {id:uuidV4(), title:input, completed: false}]);
        setInput("");
        }
        else{
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }
    }
  return (
    <form>
        <input
            type="text" 
            placeholder="Enter a Todo..." 
            className='task-input' 
            value={input}
            required
            maxLength={25}
            onChange={onInputChange}
            />
        <button className='button-add' type='submit' onClick={onFormSubmit}>{editTodo ? "ok" : "Add"}</button>
    </form>
  )
}

export default Form