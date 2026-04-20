import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import TodoPage from './pages/TodoPage';
import UsersPage from './pages/UsersPage';
import RegisterPage from './pages/RegisterPage';
import CurrencyPage from './pages/CurrencyPage';

function App() {
  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/counter', label: 'Счётчик' },
    { path: '/todo', label: 'To-Do' },
    { path: '/users', label: 'Пользователи' },
    { path: '/register', label: 'Регистрация' },
    { path: '/currency', label: 'Валюта' },
  ];

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/currency" element={<CurrencyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="card">
      <h1>React + TypeScript Portfolio</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Выбери задание в меню выше. Все проекты сделаны с типизацией, 
        валидацией и чистыми компонентами.
      </p>
    </div>
  );
}

export default App;