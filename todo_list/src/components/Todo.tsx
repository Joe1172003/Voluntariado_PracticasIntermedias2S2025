import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import type { Todo as TodoType } from './TodoWrapper'

 type Props = {
  todo: TodoType;                          
  onToggleDone: () => void;
  onDelete: () => void;
  onToggleEditing: () => void;             
};

export const Todo = ({ todo, onToggleDone, onDelete, onToggleEditing }: Props) => {
  return (
    <div className="Todo">
      <p
        onClick={onToggleDone}
        className={todo.done ? 'completed' : 'incompleted'}
      >
        {todo.title}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={onToggleEditing} role="button" tabIndex={0} />
        <FontAwesomeIcon icon={faTrash} onClick={onDelete} role="button" tabIndex={0} />
      </div>
    </div>
  );
};