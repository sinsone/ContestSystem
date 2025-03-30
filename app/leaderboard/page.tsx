'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Participant {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  contestsWon: number;
  contestsParticipated: number;
  badges: string[];
}

export default function Leaderboard() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // TODO: Заменить на реальный API-запрос
        const mockParticipants: Participant[] = [
          {
            id: 1,
            name: 'Анна Петрова',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AP',
            rating: 2850,
            contestsWon: 12,
            contestsParticipated: 25,
            badges: ['🏆', '⭐', '🎨']
          },
          {
            id: 2,
            name: 'Михаил Сидоров',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MS',
            rating: 2720,
            contestsWon: 10,
            contestsParticipated: 20,
            badges: ['🏆', '📸']
          },
          {
            id: 3,
            name: 'Елена Иванова',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EI',
            rating: 2680,
            contestsWon: 8,
            contestsParticipated: 18,
            badges: ['⭐', '✍️']
          }
        ];
        setParticipants(mockParticipants);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-4">Рейтинг участников</h2>
          
          {/* Фильтры */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">Все категории</option>
                    <option value="photo">Фотография</option>
                    <option value="art">Рисунок</option>
                    <option value="literature">Литература</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option value="all">За все время</option>
                    <option value="month">За месяц</option>
                    <option value="year">За год</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Таблица рейтинга */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Место</th>
                        <th>Участник</th>
                        <th>Рейтинг</th>
                        <th>Победы</th>
                        <th>Участие</th>
                        <th>Достижения</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => (
                        <tr key={participant.id}>
                          <td>
                            <span className="fs-5">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={participant.avatar}
                                alt={participant.name}
                                className="rounded-circle me-2"
                                width="32"
                                height="32"
                              />
                              <Link
                                href={`/profile/${participant.id}`}
                                className="text-decoration-none text-body"
                              >
                                {participant.name}
                              </Link>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">
                              {participant.rating}
                            </span>
                          </td>
                          <td>{participant.contestsWon}</td>
                          <td>{participant.contestsParticipated}</td>
                          <td>
                            <div className="d-flex gap-1">
                              {participant.badges.map((badge, i) => (
                                <span
                                  key={i}
                                  className="badge bg-light text-dark border"
                                  style={{ fontSize: '1.2em' }}
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Легенда достижений */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Легенда достижений</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2" style={{ fontSize: '1.2em' }}>
                  🏆
                </span>
                <span>Победитель конкурса</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2" style={{ fontSize: '1.2em' }}>
                  ⭐
                </span>
                <span>Топ-10 рейтинга</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2" style={{ fontSize: '1.2em' }}>
                  🎨
                </span>
                <span>Художник года</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2" style={{ fontSize: '1.2em' }}>
                  📸
                </span>
                <span>Фотограф года</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 