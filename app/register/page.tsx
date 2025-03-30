'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика регистрации
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
          <h1 className="h3 mb-3">Регистрация</h1>
          <p className="text-muted">Создайте аккаунт для участия в конкурсах</p>
        </div>

        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Имя
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                autoFocus
              />
            </div>

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
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Подтверждение пароля
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
              Зарегистрироваться
            </button>

            <div className="text-center mb-3">
              <span className="text-muted">Уже есть аккаунт?</span>{' '}
              <Link href="/login" className="text-decoration-none">
                Войти
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