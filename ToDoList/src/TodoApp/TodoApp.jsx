import React, { useState } from 'react'
import './TodoApp.css'
import { MdDelete } from "react-icons/md";

const TodoApp = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    const handleAddTodo = (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false,
        }

        setTodos([newTodo, ...todos])
        setInput('')
    }

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (id, text) => {
        setEditId(id)
        setEditText(text)
    }

    const handleUpdate = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText } : todo
            )
        )
        setEditId(null)
        setEditText('')
    }

    return (
        <div>
            <div className="todo-container">
                <h1>To-Do List</h1>

                <form onSubmit={handleAddTodo}>
                    <input
                        type="text"
                        placeholder="Enter your Task"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>

                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                            {editId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdate(todo.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
                                    <button onClick={() => handleEdit(todo.id, todo.text)}>Update</button>
                                    <button onClick={() => handleDelete(todo.id)}>
                                        <MdDelete />
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoApp