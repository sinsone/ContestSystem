'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'participant' | 'organizer';
  avatar?: string;
}

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning';
  message: string;
  date: string;
  read: boolean;
}

interface Contest {
  id: number;
  title: string;
  status: string;
  progress?: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных пользователя
    const fetchUserData = async () => {
      try {
        // TODO: Заменить на реальный API-запрос
        const mockUser: User = {
          id: 1,
          name: 'Иван Иванов',
          email: 'ivan@example.com',
          role: 'participant',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=II'
        };
        
        const mockNotifications: Notification[] = [
          {
            id: 1,
            type: 'success',
            message: 'Ваша работа успешно загружена',
            date: '2024-03-15T10:30:00',
            read: false
          },
          {
            id: 2,
            type: 'info',
            message: 'Новый конкурс доступен для участия',
            date: '2024-03-14T15:45:00',
            read: true
          }
        ];

        const mockContests: Contest[] = [
          {
            id: 1,
            title: 'Конкурс фотографии',
            status: 'В процессе',
            progress: 75
          },
          {
            id: 2,
            title: 'Литературный конкурс',
            status: 'Завершен',
            progress: 100
          }
        ];

        setUser(mockUser);
        setNotifications(mockNotifications);
        setContests(mockContests);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Профиль пользователя */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle me-3"
                    width="64"
                    height="64"
                  />
                )}
                <div>
                  <h4 className="mb-1">{user?.name}</h4>
                  <p className="text-body-secondary mb-0">
                    {user?.role === 'participant' ? 'Участник' : 'Организатор'}
                  </p>
                </div>
                <div className="ms-auto">
                  <Link href="/profile/edit" className="btn btn-outline-primary">
                    Редактировать профиль
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Обзор
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'contests' ? 'active' : ''}`}
            onClick={() => setActiveTab('contests')}
          >
            Мои конкурсы
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Уведомления
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="badge bg-danger ms-2">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
        </li>
      </ul>

      {/* Контент вкладок */}
      {activeTab === 'overview' && (
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Активные конкурсы</h5>
              </div>
              <div className="card-body">
                {contests.map(contest => (
                  <div key={contest.id} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0">{contest.title}</h6>
                      <span className="badge bg-primary">{contest.status}</span>
                    </div>
                    {contest.progress !== undefined && (
                      <div className="progress" style={{ height: '5px' }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${contest.progress}%` }}
                          aria-valuenow={contest.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Последние уведомления</h5>
              </div>
              <div className="card-body">
                {notifications.slice(0, 3).map(notification => (
                  <div key={notification.id} className="mb-3">
                    <div className={`alert alert-${notification.type} mb-0 py-2`}>
                      {notification.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contests' && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Прогресс</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map(contest => (
                    <tr key={contest.id}>
                      <td>{contest.title}</td>
                      <td>
                        <span className="badge bg-primary">{contest.status}</span>
                      </td>
                      <td>
                        {contest.progress !== undefined && (
                          <div className="progress" style={{ height: '5px' }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${contest.progress}%` }}
                              aria-valuenow={contest.progress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td>
                        <Link href={`/contests/${contest.id}`} className="btn btn-sm btn-outline-primary me-2">
                          Подробнее
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="card shadow-sm">
          <div className="card-body">
            {notifications.map(notification => (
              <div key={notification.id} className="mb-3">
                <div className={`alert alert-${notification.type} ${!notification.read ? 'border border-2' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-0">{notification.message}</p>
                      <small className="text-body-secondary">
                        {new Date(notification.date).toLocaleString()}
                      </small>
                    </div>
                    {!notification.read && (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setNotifications(notifications.map(n =>
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                        }}
                      >
                        Отметить как прочитанное
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 