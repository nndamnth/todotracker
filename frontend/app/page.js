"use client";
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description })
      });
      setTitle(''); setDescription('');
      await fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, completed: !todo.completed })
      });
      fetchTodos();
    } catch (err) { console.error(err); }
  };

  const deleteTodo = async (id) => {
    const ok = confirm('Delete this todo?');
    if (!ok) return;
    try {
      await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      fetchTodos();
    } catch (err) { console.error(err); }
  };

  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo Tracker</h1>

      <form onSubmit={addTodo} style={{ marginBottom: 20 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={{ padding:8, width:300 }} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ padding:8, width:400, marginLeft:8 }} />
        <button style={{ marginLeft:8, padding:8 }} type="submit" disabled={!title.trim() || loading}>{loading ? 'Adding...' : 'Add'}</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
            <div style={{ marginLeft: 8 }}>
              <div style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 600 }}>{todo.title}</div>
              {todo.description ? <div style={{ color: '#555' }}>{todo.description}</div> : null}
            </div>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 'auto', padding:8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
