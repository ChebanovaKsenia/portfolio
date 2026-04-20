import { useState, useMemo } from 'react';
import type { User } from '../../types';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Анна', age: 28, email: 'anna@example.com' },
  { id: 2, name: 'Борис', age: 34, email: 'boris@example.com' },
  { id: 3, name: 'Виктор', age: 25, email: 'victor@example.com' },
  { id: 4, name: 'Галина', age: 41, email: 'galina@example.com' },
  { id: 5, name: 'Дмитрий', age: 30, email: 'dmitry@example.com' },
];

export default function UserFilter() {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="card">
      <h2>Фильтр пользователей</h2>
      
      <input
        type="text"
        className="input"
        placeholder="Поиск по имени..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '1rem' }}>
          Ничего не найдено. Попробуйте другой запрос.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          {filteredUsers.map((user) => (
            <li 
              key={user.id}
              style={{ 
                padding: '12px', 
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{user.name}</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {user.age} лет • {user.email}
                </div>
              </div>
              <span style={{ 
                background: '#e3f2fd', 
                color: '#1976d2',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.85rem'
              }}>
                ID: {user.id}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}