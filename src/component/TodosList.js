import React, { useEffect, useState } from 'react'

const TodosList = ({todos, setTodos, setEditTodo}) => {

    const [data, setData] = useState({
        items : [],
        dataisLoaded : false
    })

    useEffect ( () => {

        console.log('api call');
        const timer = setTimeout(() => {
        
            fetch('https://jsonplaceholder.typicode.com/posts')
            // {
            //     method: 'DELETE',
            //     // body: JSON.stringify({
            //     //     id: 1,
            //     //     title: 'foo',
            //     //     body: 'bar',
            //     //     userId: 1,
            //     // }),
            //     //                 headers: {
            //     //     'Content-type': 'application/json; charset=UTF-8',
            //     // },
            // })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setData({
                    items : json,
                    dataisLoaded : true
                });
            })
        }, 5000);
        return () => clearTimeout(timer);
      
    },[])

    const handleComplete = (todo) =>{
        setTodos(
            todos.map((item) => {
                if(item.id === todo.id) {
                    return {...item, completed: !item.completed}
                }
                return item;
            })
        )
    }
    const handleEdit =({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);

    }
    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
  return (
    <div> 
        { (!data.dataisLoaded) 
         ? (
            <h2> pleses wait for some times... </h2>
            )
         :(
    
            <div className = "App">
                <h1> Fetch data from an api in react </h1>  {
                    data.items.map((item) => ( 
                    <ol key = { item.id } >
                       <li  className='list-item'>
                        Id : {item.id},<br/>
                        Title : { item.title },<br/>
                        Body : { item.body },<br/>
                        User Id : { item.userId } </li>
                        </ol>
                    ))
                }
            </div>
            )

        }
        {todos.map((todo) => (
            <li className='list-item' key={todo.id}>
                <input 
                    type='text'
                    value={todo.title}
                    className={`list ${todo.completed ? "complete" : ""}` }
                    onChange={(e) => e.preventDefault()}   
                />
                <div>
                    <button className='button-complete task-button' onClick={()=> handleComplete(todo)}>
                        <i className="fa-solid fa-circle-check"></i>
                    </button>
                    <button className='button-edit task-button' onClick={() => handleEdit(todo)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className='button-delete task-button' onClick={()=> handleDelete(todo)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </li>
        ))}
    </div>
  )
}

export default TodosList