import { useState } from 'react';
import type { Todo } from '../../types';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: nextId, text: text.trim(), completed: false }]);
      setText('');
      setNextId(nextId + 1);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="card">
      <h2>To-Do List</h2>
      
      <div style={{ display: 'flex', gap: '10px', margin: '1rem 0' }}>
        <input
          type="text"
          className="input"
          placeholder="Новая задача..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="btn btn-primary" onClick={addTodo}>Добавить</button>
      </div>

      {todos.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>Пока еще нет задач...</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {todos.map((todo) => (
            <li 
              key={todo.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px', 
                borderBottom: '1px solid #eee' 
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ 
                flex: 1, 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : 'inherit'
              }}>
                {todo.text}
              </span>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}