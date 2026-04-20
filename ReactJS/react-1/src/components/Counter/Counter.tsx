import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Счётчик</h2>
      <div style={{ fontSize: '3rem', margin: '1.5rem 0', fontWeight: 'bold' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn btn-danger" onClick={() => setCount(c => c - 1)}>
          −
        </button>
        <button className="btn btn-success" onClick={() => setCount(c => c + 1)}>
          +
        </button>
        <button className="btn btn-primary" onClick={() => setCount(0)}>
          Сброс
        </button>
      </div>
    </div>
  );
}