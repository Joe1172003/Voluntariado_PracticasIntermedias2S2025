import React, {useState} from "react";
import type { Todo as TodoType } from './TodoWrapper'


type TodoFormProps = { 
    task: TodoType; 
    editTodo: (value:string ,id: string) => void; 
};


export const TodoEditForm = ( {task, editTodo}: TodoFormProps ) => {
    const [value, setValue] = useState(task.task)

    // React.FormEvent<HTMLFormElement> (eventos de formulario)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        editTodo(value, task.id);
        setValue("");
    }
    return(
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="todo-input" placeholder="Update task"
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className="todo-btn">Update Task</button>
        </form>
    )
}