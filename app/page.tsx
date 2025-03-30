'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    bootstrap: any;
  }
}

export default function Home() {
  useEffect(() => {
    const initTooltips = () => {
      try {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        if (tooltipTriggerList.length > 0 && window.bootstrap?.Tooltip) {
          Array.from(tooltipTriggerList).forEach(tooltipTriggerEl => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
          });
        }
      } catch (error) {
        console.error('Error initializing tooltips:', error);
      }
    };

    if (document.readyState === 'complete') {
      initTooltips();
    } else {
      window.addEventListener('load', initTooltips);
      return () => window.removeEventListener('load', initTooltips);
    }
  }, []);

  return (
    <main className="flex-grow-1">
      {/* Hero section */}
      <section className="py-5 mb-5">
        <div className="container text-center">
          <span className="badge bg-primary bg-gradient mb-3 px-3 py-2 rounded-pill">Система конкурсов</span>
          <h1 className="display-4 fw-bold mb-4">
            СИСТЕМА
            <span className="d-block text-primary">КОНКУРСОВ</span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Организуйте и участвуйте в конкурсах онлайн. Простая и безопасная платформа для
            проведения дистанционных конкурсов любой сложности.
          </p>
          <div className="d-flex gap-3 justify-content-center mb-5">
            <Link href="/contests" className="btn btn-primary btn-lg rounded-pill px-4">
              Смотреть конкурсы
            </Link>
            <Link href="/contests/create" className="btn btn-outline-primary btn-lg rounded-pill px-4">
              Создать конкурс
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-people-fill fs-1"></i>
                  </div>
                  <h3 className="card-title h4 mb-3">Для участников</h3>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Удобный поиск конкурсов
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Простая регистрация
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Быстрая подача работ
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-gear-fill fs-1"></i>
                  </div>
                  <h3 className="card-title h4 mb-3">Для организаторов</h3>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Гибкие настройки
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Управление участниками
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Детальная статистика
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-shield-check fs-1"></i>
                  </div>
                  <h3 className="card-title h4 mb-3">Безопасность</h3>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Защита данных
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Безопасные платежи
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      Шифрование файлов
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h2 className="display-4 fw-bold text-primary mb-0">15+</h2>
              <p className="text-muted">Активных конкурсов</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-4 fw-bold text-primary mb-0">500+</h2>
              <p className="text-muted">Участников</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-4 fw-bold text-primary mb-0">98%</h2>
              <p className="text-muted">Довольных пользователей</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 