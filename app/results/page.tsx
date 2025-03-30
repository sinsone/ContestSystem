'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Result {
  id: number;
  contestId: number;
  contestTitle: string;
  participantId: number;
  participantName: string;
  score: number;
  place: number;
  submissionDate: string;
  category: string;
  feedback?: string;
}

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // TODO: Заменить на реальный API-запрос
        const mockResults: Result[] = [
          {
            id: 1,
            contestId: 1,
            contestTitle: 'Конкурс веб-дизайна "Лучший сайт"',
            participantId: 1,
            participantName: 'Виктория Штиль',
            score: 95,
            place: 1,
            submissionDate: '2024-03-15',
            category: 'Веб-дизайн',
            feedback: 'Отличная композиция и цветопередача'
          },
          {
            id: 2,
            contestId: 1,
            contestTitle: 'Конкурс фотографии "Природа России"',
            participantId: 2,
            participantName: 'Михаил Сидоров',
            score: 92,
            place: 2,
            submissionDate: '2024-03-14',
            category: 'Фотография',
            feedback: 'Интересный ракурс, хорошая детализация'
          },
          {
            id: 3,
            contestId: 2,
            contestTitle: 'Литературный конкурс "Весенние мотивы"',
            participantId: 3,
            participantName: 'Елена Иванова',
            score: 98,
            place: 1,
            submissionDate: '2024-03-10',
            category: 'Литература',
            feedback: 'Глубокое погружение в тему, яркие образы'
          }
        ];
        setResults(mockResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Фильтрация результатов
  const filteredResults = results.filter(result => {
    const matchesSearch = result.contestTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.participantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || result.category === category;
    return matchesSearch && matchesCategory;
  });

  // Сортировка результатов
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      case 'score':
        return b.score - a.score;
      case 'place':
        return a.place - b.place;
      default:
        return 0;
    }
  });

  return (
    <div className="container py-4">
      <h2 className="mb-4">Результаты конкурсов</h2>

      {/* Фильтры */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Поиск по названию или участнику..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Все категории</option>
                <option value="Фотография">Фотография</option>
                <option value="Рисунок">Рисунок</option>
                <option value="Литература">Литература</option>
                <option value="Музыка">Музыка</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">По дате</option>
                <option value="score">По баллам</option>
                <option value="place">По месту</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица результатов */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : sortedResults.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Место</th>
                    <th>Конкурс</th>
                    <th>Участник</th>
                    <th>Категория</th>
                    <th>Баллы</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map(result => (
                    <tr key={result.id}>
                      <td>
                        <span className="fs-5">
                          {result.place === 1 ? '🥇' : result.place === 2 ? '🥈' : result.place === 3 ? '🥉' : result.place}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/contests/${result.contestId}`}
                          className="text-decoration-none text-body"
                        >
                          {result.contestTitle}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`/profile/${result.participantId}`}
                          className="text-decoration-none text-body"
                        >
                          {result.participantName}
                        </Link>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {result.category}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {result.score}
                        </span>
                      </td>
                      <td>{new Date(result.submissionDate).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={result.feedback}
                        >
                          Отзыв
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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