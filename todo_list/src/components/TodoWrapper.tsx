import React, {useState} from "react";
import { TodoForm } from "./TodoForm";
import {v4 as uuidv4} from 'uuid'
import { Todo } from "./Todo";
import { TodoEditForm } from "./TodoEditForm";

const API_BASE: string = 'http://localhost:3000';
uuidv4();

export type Todo = {
    id: string,
    task: string,
    completed: boolean,
    isEditing: boolean
}

export const TodoWrapper = () => {
    const [todos, setTodos] = useState<Todo[]>([])

const addTodo = async (task: string) => {
    const new_todo: Todo = {
        id: uuidv4(),
        task: task,
        completed: false,
        isEditing: false
    };

    setTodos(prev => [...prev, new_todo])

    try {
        const res = await fetch(`${API_BASE}/addTodo`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(new_todo)
        });

        // error en la respuesta
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
        setTodos(prev => prev.filter(todo => todo.id !== new_todo.id));
        console.error(`Error Add ${err}, save todo....!`);
    }
};

const toggleCompleted = (id: string) => {
  setTodos(prev =>
    prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  );
}; 

const deleteTodo = async(id:string) => {
    setTodos(todos.filter(todo => todo.id !== id))

    try {
        const res = await fetch(`${API_BASE}/deleteTodo/${id}`, {
            method: "DELETE"
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
        setTodos(prev => prev)
        console.error(`Error Delete ${err} al eliminar el todo: ${id}`)
    }
}


const editTodo = (id:string) => {
    setTodos(todos.map(todo => todo.id === id ? 
        {...todo, isEditing: !todo.isEditing }
        : todo 
    ))
}

const editTask = async(task:string, id:string) => {

    const tempTodo = todos;

    setTodos(todos.map(todo => todo.id == id 
        ? {...todo, task, isEditing: !todo.isEditing}
        : todo))

    try{
        const res = await fetch(`${API_BASE}/updateTodo/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: task})
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
    }catch(err){
        console.error(`Error Update ${err} al modificar el todo: ${id}`);
        setTodos(tempTodo);
    }
}

    return(
        <div className="TodoWrapper">
            <h1>My Todo List</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.map((todo) => (
                todo.isEditing 
                ? (<TodoEditForm key={todo.id} editTodo={editTask}
                task={todo}/>)
                : (
                <Todo task={todo} key={todo.id}
                toggleCompleted={toggleCompleted}
                deleteTodo={deleteTodo}
                editTodo={editTodo}/>
                )
            ))}
        </div>
    )
}