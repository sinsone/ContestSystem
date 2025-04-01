'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError('Неверный email или пароль');
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="auth-card">
            <div className="text-center mb-4">
              <Link href="/" className="d-inline-block text-decoration-none">
                <span className="display-6">🏠</span>
              </Link>
              <h1 className="h3 mt-4 mb-3 fw-bold">Вход в аккаунт</h1>
              {searchParams.get('registered') && (
                <div className="alert alert-success">
                  Регистрация успешна! Теперь вы можете войти.
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  required
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  required
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>

              <div className="text-center mb-3">
                <Link href="/register" className="text-decoration-none">
                  Нет аккаунта? Зарегистрироваться
                </Link>
              </div>

              <div className="text-center">
                <Link
                  href="/"
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-house-door me-2"></i>
                  На главную
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 