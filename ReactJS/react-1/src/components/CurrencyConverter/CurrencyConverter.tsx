import { useState } from 'react';
import type { CurrencyCode } from '../../types';

const CURRENCIES: CurrencyCode[] = ['USD', 'EUR', 'RUB', 'KZT', 'GBP', 'JPY'];

// Демо-курсы (в реальном проекте — запрос к API)
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  RUB: 92.5,
  KZT: 450,
  GBP: 0.79,
  JPY: 150,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [from, setFrom] = useState<CurrencyCode>('USD');
  const [to, setTo] = useState<CurrencyCode>('RUB');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const convert = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      alert('Введите корректную сумму');
      return;
    }

    setLoading(true);
    
    // Имитация запроса к API (в реальности: fetch('https://api.exchangerate-api.com/...'))
    setTimeout(() => {
      const inUSD = num / RATES[from];
      const converted = inUSD * RATES[to];
      setResult(converted);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="card">
      <h2>Конвертер валют</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Сумма</label>
          <input
            type="number"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            min="0"
            step="0.01"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Из</label>
            <select 
              className="input" 
              value={from} 
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
              style={{ cursor: 'pointer' }}
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>→</div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>В</label>
            <select 
              className="input" 
              value={to} 
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
              style={{ cursor: 'pointer' }}
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={convert}
          disabled={loading}
          style={{ marginTop: '0.5rem' }}
        >
          {loading ? 'Загрузка...' : 'Конвертировать'}
        </button>

        {result !== null && (
          <div style={{ 
            textAlign: 'center', 
            padding: '1rem', 
            background: '#f1f5f9', 
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Результат:</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {result.toFixed(2)} {to}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>
              {amount} {from} = {result.toFixed(2)} {to}
            </div>
          </div>
        )}
      </div>

      <p style={{ 
        fontSize: '0.8rem', 
        color: '#888', 
        marginTop: '1.5rem', 
        textAlign: 'center' 
      }}>
        В реальном проекте здесь был бы запрос к exchangerate-api.com
      </p>
    </div>
  );
}