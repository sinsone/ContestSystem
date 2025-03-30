'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contest {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  status: 'active' | 'upcoming' | 'completed';
}

export default function SearchContests() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Имитация загрузки данных
  useEffect(() => {
    const fetchContests = async () => {
      try {
        // TODO: Заменить на реальный API-запрос
        const mockContests: Contest[] = [
          {
            id: 1,
            title: 'Конкурс фотографии "Природа России"',
            category: 'Фотография',
            startDate: '2024-03-01',
            endDate: '2024-04-01',
            participantsCount: 45,
            status: 'active'
          },
          // Добавьте больше тестовых данных по необходимости
        ];
        setContests(mockContests);
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Фильтрация конкурсов
  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || contest.category === category;
    const matchesStatus = status === 'all' || contest.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Сортировка конкурсов
  const sortedContests = [...filteredContests].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'participants':
        return b.participantsCount - a.participantsCount;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container py-4">
      {/* Поисковая панель */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Поиск конкурсов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Все категории</option>
                <option value="Фотография">Фотография</option>
                <option value="Рисунок">Рисунок</option>
                <option value="Музыка">Музыка</option>
                <option value="Литература">Литература</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">Любой статус</option>
                <option value="active">Активные</option>
                <option value="upcoming">Предстоящие</option>
                <option value="completed">Завершенные</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">По дате</option>
                <option value="participants">По участникам</option>
                <option value="title">По названию</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Результаты поиска */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : sortedContests.length > 0 ? (
        <div className="row g-4">
          {sortedContests.map(contest => (
            <div key={contest.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{contest.title}</h5>
                    <span className={`badge bg-${contest.status === 'active' ? 'success' : contest.status === 'upcoming' ? 'warning' : 'secondary'}`}>
                      {contest.status === 'active' ? 'Активный' : contest.status === 'upcoming' ? 'Скоро' : 'Завершен'}
                    </span>
                  </div>
                  <p className="card-text text-body-secondary mb-3">
                    Категория: {contest.category}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-body-secondary">
                      Участников: {contest.participantsCount}
                    </small>
                    <Link href={`/contests/${contest.id}`} className="btn btn-primary btn-sm">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-body-secondary mb-0">
            По вашему запросу ничего не найдено
          </p>
        </div>
      )}
    </div>
  );
} 