import React, {useState} from "react";
import type { Todo as TodoType } from './TodoWrapper'

type Props = {
  todo: TodoType;
  onSave: (newTitle: string) => void; 
};

export const TodoEditForm = ({ todo, onSave }: Props) => {
  const [value, setValue] = useState(todo.title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const t = value.trim(); 
    if (!t) return; 
    onSave(t);  
    setValue("")
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Update title"
        value={value}
        onChange={(e) => setValue(e.target.value)} 
        autoFocus 
      />
      <button type="submit" className="todo-btn">Update Task</button>
    </form>
  );
};