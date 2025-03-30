'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика входа
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="flex-grow-1 py-5">
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <Link href="/" className="d-inline-block mb-4">
            <span className="fs-1">🎨</span>
          </Link>
          <h1 className="h3 mb-3">Вход в систему</h1>
          <p className="text-muted">Войдите для участия в конкурсах</p>
        </div>

        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="password" className="form-label mb-0">
                  Пароль
                </label>
                <Link href="/forgot-password" className="text-decoration-none small">
                  Забыли пароль?
                </Link>
              </div>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
              Войти
            </button>

            <div className="text-center mb-3">
              <span className="text-muted">Нет аккаунта?</span>{' '}
              <Link href="/register" className="text-decoration-none">
                Зарегистрироваться
              </Link>
            </div>

            <div className="text-center">
              <Link href="/" className="btn btn-outline-primary rounded-pill px-4">
                <i className="bi bi-house-door me-2"></i>
                Главная
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 