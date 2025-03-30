'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Navigation() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  const handleThemeToggle = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary border-bottom" style={{
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <span className="fs-4 me-2">🎨</span>
          <span>Система конкурсов</span>
        </Link>

        <div className="d-flex align-items-center order-lg-last">
          <div className="btn-group me-2" role="group" aria-label="Переключение темы">
            <button
              type="button"
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} rounded-start-pill`}
              onClick={() => handleThemeToggle('light')}
              style={{
                transition: 'all 0.3s ease',
                transform: theme === 'light' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <i className="bi bi-sun-fill"></i>
            </button>
            <button
              type="button"
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} rounded-end-pill`}
              onClick={() => handleThemeToggle('dark')}
              style={{
                transition: 'all 0.3s ease',
                transform: theme === 'dark' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <i className="bi bi-moon-stars-fill"></i>
            </button>
          </div>
          <Link 
            href="/login" 
            className="btn btn-outline-primary me-2 rounded-pill"
            style={{
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            Вход
          </Link>
          <Link 
            href="/register" 
            className="btn btn-primary me-2 rounded-pill"
            style={{
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            Регистрация
          </Link>
          <button 
            className="navbar-toggler ms-2 rounded-3" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              transition: 'transform 0.2s ease',
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/contests" className="nav-link px-3 py-2 rounded-pill" style={{ transition: 'all 0.3s ease' }}>
                Конкурсы
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/results" className="nav-link px-3 py-2 rounded-pill" style={{ transition: 'all 0.3s ease' }}>
                Результаты
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 