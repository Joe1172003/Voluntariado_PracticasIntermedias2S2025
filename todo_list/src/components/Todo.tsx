import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import type { Todo as TodoType } from './TodoWrapper'

    
type Props = { 
    task: TodoType;
    toggleCompleted: (id:string) => void;
    deleteTodo: (id:string) => void;       
    editTodo: (id:string) => void;     
 };

export const Todo = ({task, toggleCompleted, deleteTodo, editTodo}: Props) => {
    return(
        <div className="Todo">
            <p onClick={() => toggleCompleted(task.id)} className={task.completed ?
             'completed' : 'incompleted'}>{task.task}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={
                    () => editTodo(task.id)
                }/>
                <FontAwesomeIcon icon={faTrash} onClick={
                    () => deleteTodo(task.id)
                }/>
            </div>
        </div>
    )
}