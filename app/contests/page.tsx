'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contest {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  status: 'active' | 'upcoming' | 'completed';
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  // Временные данные для демонстрации
  useEffect(() => {
    const demoContests: Contest[] = [
      {
        id: 1,
        title: "Конкурс веб-дизайна",
        description: "Создание современного дизайна для образовательной платформы",
        startDate: "2024-03-01",
        endDate: "2024-03-15",
        participantsCount: 45,
        status: 'active'
      },
      {
        id: 2,
        title: "Конкурс программирования",
        description: "Разработка алгоритмов для решения задач оптимизации",
        startDate: "2024-03-20",
        endDate: "2024-04-05",
        participantsCount: 0,
        status: 'upcoming'
      },
      {
        id: 3,
        title: "Конкурс мобильных приложений",
        description: "Создание приложения для здорового образа жизни",
        startDate: "2024-02-01",
        endDate: "2024-02-15",
        participantsCount: 67,
        status: 'completed'
      }
    ];

    setTimeout(() => {
      setContests(demoContests);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredContests = contests.filter(contest => 
    filter === 'all' ? true : contest.status === filter
  );

  const getStatusBadge = (status: Contest['status']) => {
    switch (status) {
      case 'active':
        return <span className="badge bg-success">Активный</span>;
      case 'upcoming':
        return <span className="badge bg-warning text-dark">Скоро</span>;
      case 'completed':
        return <span className="badge bg-secondary">Завершён</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Конкурсы</h1>
        <Link href="/contests/create" className="btn btn-primary">
          Создать конкурс
        </Link>
      </div>

      {/* Фильтры */}
      <div className="btn-group mb-4">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button 
          className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button 
          className={`btn ${filter === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('upcoming')}
        >
          Предстоящие
        </button>
        <button 
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          Завершённые
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-body-secondary">Конкурсы не найдены</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredContests.map(contest => (
            <div key={contest.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{contest.title}</h5>
                    {getStatusBadge(contest.status)}
                  </div>
                  <p className="card-text text-body-secondary mb-3">
                    {contest.description}
                  </p>
                  <div className="small text-body-secondary mb-3">
                    <div>Начало: {formatDate(contest.startDate)}</div>
                    <div>Окончание: {formatDate(contest.endDate)}</div>
                    <div>Участников: {contest.participantsCount}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Link 
                      href={`/contests/${contest.id}`}
                      className="btn btn-primary"
                    >
                      Подробнее
                    </Link>
                    {contest.status === 'active' && (
                      <Link 
                        href={`/contests/${contest.id}/participate`}
                        className="btn btn-outline-primary"
                      >
                        Участвовать
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 