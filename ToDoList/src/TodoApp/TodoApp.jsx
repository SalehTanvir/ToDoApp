import React, { useState, useEffect } from 'react'
import './TodoApp.css'
import { MdDelete } from "react-icons/md";

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
    if (input.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleEdit(id, text) {
    setEditId(id)
    setEditText(text)
  }

function handleUpdate(id) {
  const trimmed = editText.trim()
  if (trimmed === '') {
    alert('Task cannot be empty')
    return
  }

  setTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, text: trimmed } : todo
    )
  )
  setEditId(null)
  setEditText('')
}

  const pendingTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter your Task"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Pending Tasks</h2>
      <ul className="todo-list">
        {pendingTodos.length === 0 && <p>No pending tasks</p>}
        {pendingTodos.map(todo => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
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

      <h2>Completed Tasks</h2>
      <ul className="todo-list">
        {completedTodos.length === 0 && <p>No completed tasks yet</p>}
        {completedTodos.map(todo => (
          <li key={todo.id} className="completed">
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp