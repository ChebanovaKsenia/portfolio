import { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Минимум 2 символа';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!form.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (form.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      //Здесь можно отправить данные на сервер
      console.log('Form submitted:', form);
    }
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Успешно!</h2>
        <p style={{ marginTop: '1rem' }}>
          Добро пожаловать, <strong>{form.name}</strong>!
        </p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '1rem' }}
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '' }); }}
        >
          Зарегистрировать ещё одного
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Регистрация</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Имя</label>
          <input
            type="text"
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Введите имя"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Email</label>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@mail.com"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Пароль</label>
          <input
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Минимум 6 символов"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-success" style={{ marginTop: '0.5rem' }}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}