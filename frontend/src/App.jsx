import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  // FETCH TODOS
  async function fetchTodos() {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  }

  // CREATE TODO
  async function createTodo() {
    if (!text.trim()) return setText('');
    await fetch(`${API_URL}/todos`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    fetchTodos();
  }

  // UPDATE TODO
  async function updateTodo() {
    if (!text.trim()) {
      setText('');
      setEditId(null);
      return;
    }
    await fetch(`${API_URL}/todos/${editId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    setEditId(null);
    fetchTodos();
  }

  // DELETE TODO
  async function deleteTodo(id) {
    if (todos.length <= 3) return;
    await fetch(`${API_URL}/todos/${id}`, { method: 'delete' });
    fetchTodos;
  }

  // START EDIT MODE
  function startEdit(selectedTodo) {
    setEditId(selectedTodo._id);
    setText(selectedTodo.text);
  }

  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    editId ? updateTodo() : createTodo();
  }

  // INITIAL FETCH
  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  });

  return (
    <div>
      <h1>Tood App</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Enter todo'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => startEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
