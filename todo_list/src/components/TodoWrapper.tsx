import {useEffect, useState} from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { TodoEditForm } from "./TodoEditForm";

export type Todo = {
    id: number,
    title: string;
    done: boolean;
    created_at: string;
    updated_at: string;
    isEditing?: boolean;
}

export const TodoWrapper = () => {
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState(false);

useEffect(() => {
    (async () => {
       try {
            setLoading(true)
            const res = await fetch(`/api/todos`);
            if(!res.ok) throw new Error(`HTTP ${res.status}`);
            // obtener la data 
            const data: Todo[] = await res.json();
            setTodos(data.map(todo => ({...todo, isEditing:false})));
        } catch (err) {
            console.error("GET /todos error:", err);    
        }finally{
            setLoading(false);  
        } 
    })();
}, []);

const addTodo = async (title: string) => {    
    try{
        const res = await fetch(`/api/todos`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title: title })
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const created: Todo = await res.json();
        setTodos(prev => [...prev, {...created, isEditing:false}]);
        console.log(todos)
    } catch (err) {
        console.error("POST /todos error:", err);
    }
};

const toggleDone = async (id:number) => {
    const current = todos.find(todo => todo.id === id);
    if(!current) return;
    try {
        const res = await fetch(`/api/todos/${id}/done`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({done: !current.done})
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated: Todo = await res.json();
        setTodos(prev => prev.map(todo => (todo.id === id ? 
            {...updated, isEditing: todo.isEditing ?? false} 
            : todo
        )))
    } catch (err) {
        console.error(`PATCH /todos/${id} error:`, err)
    }
}

const editTodo = async (id:number, title:string) => {
    try {
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title })
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated: Todo = await res.json();
        setTodos(prev => prev.map(todoUpdate => (
            todoUpdate.id === id ? {...updated, isEditing: false} : todoUpdate
        )));
    } catch (err) {
    console.error(`PATCH /todos/${id} error:`, err);
    }
};

const deleteTodo = async (id:number) => {
    try {
        const res = await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
        console.error(`DELETE /todos/${id} error:`, err)
    }
}

const toggleEditing  = (id: number) => {
    setTodos(prev => prev.map(todo => (todo.id === id 
        ? {...todo, isEditing: !todo.isEditing} 
        : todo
    )));
}


    return (
        <div className="TodoWrapper">
            <h1>My Todo List</h1>
            <TodoForm addTodo={addTodo} />
            {loading ? (
                <p>Loading...</p>
            ): (
                todos.map(todo => todo.isEditing 
                    ?(
                        <TodoEditForm 
                        key={todo.id}
                        todo={todo}
                        onSave={(newTitle) => editTodo(todo.id, newTitle)}
                        />
                    )
                    :(
                        <Todo 
                        key={todo.id}
                        todo={todo}
                        onToggleDone={() => toggleDone(todo.id)}
                        onDelete={() => deleteTodo(todo.id)}
                        onToggleEditing={() => toggleEditing(todo.id)}/>
                    )
                )
            )}
        </div>
    );
}