import { useState } from "react";

type TodoFormProps = { addTodo: (title: string) => void };

export const TodoForm = ({ addTodo }: TodoFormProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const t = value.trim(); 
        if (!t) return;   
        addTodo(t);     
        setValue(""); 
    };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">Add Task</button>
    </form>
  );
};
