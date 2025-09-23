import React, {useState} from "react";

type TodoFormProps = { addTodo: (task: string) => void };


export const TodoForm = ( {addTodo}: TodoFormProps ) => {
    const [value, setValue] = useState("")

    // React.FormEvent<HTMLFormElement> (eventos de formulario)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // no recargues la página
        addTodo(value);
        setValue("");
    }
    return(
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="todo-input" placeholder="what it the task today?"
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className="todo-btn">Add Task</button>
        </form>
    )
}