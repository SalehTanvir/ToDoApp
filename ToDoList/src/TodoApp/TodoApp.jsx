import React, { useState, useEffect } from 'react'
import './TodoApp.css'
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    e.preventDefault()
    if (!input.trim()) return

    const newTodo = {
      id: Date.now(),
      text: input.trim().slice(0, 100), // ✅ just limit to 100 chars
      completed: false
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  function toggleComplete(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleEdit(id, text) {
    setEditId(id)
    setEditText(text)
  }

  function handleUpdate(id) {
    if (!editText.trim()) {
      alert('Task cannot be empty')
      return
    }

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText.trim().slice(0, 100) } : todo
    ))
    setEditId(null)
    setEditText('')
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          placeholder="Enter your Task (Within 100 characters)"
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 100))}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Pending Tasks</h2>
      <ul className="todo-list">
        {todos.filter(todo => !todo.completed).length === 0 && <p>No pending tasks</p>}
        {todos.filter(todo => !todo.completed).map(todo => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  className="todo-input"
                  value={editText}
                  onChange={e => setEditText(e.target.value.slice(0, 100))}
                  onKeyDown={e => e.key === "Enter" && handleUpdate(todo.id)}
                />
                <button className="icon-btn" onClick={() => handleUpdate(todo.id)}>
                  <MdSave />
                </button>
              </>
            ) : (
              <>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <div className="todo-actions">
                  <button className="icon-btn" onClick={() => handleEdit(todo.id, todo.text)}>
                    <MdEdit />
                  </button>
                  <button className="icon-btn" onClick={() => handleDelete(todo.id)}>
                    <MdDelete />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul className="todo-list">
        {todos.filter(todo => todo.completed).length === 0 && <p>No completed tasks yet</p>}
        {todos.filter(todo => todo.completed).map(todo => (
          <li key={todo.id} className="completed">
            <div className="todo-content">
              <input
                type="checkbox"
                checked={true}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
            </div>
            <div className="todo-actions">
              <button className="icon-btn" onClick={() => handleDelete(todo.id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp
