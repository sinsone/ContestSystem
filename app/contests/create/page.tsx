'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContestForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  requirements: string;
  prizes: string;
}

export default function CreateContest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<ContestForm>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: 0,
    requirements: '',
    prizes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // В реальном приложении здесь будет API запрос
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Создан новый конкурс:', form);
      router.push('/contests');
    } catch (err) {
      setError('Произошла ошибка при создании конкурса');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Создание конкурса</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Название конкурса</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Описание</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="startDate" className="form-label">Дата начала</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate" className="form-label">Дата окончания</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="maxParticipants" className="form-label">
                  Максимальное количество участников
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxParticipants"
                  name="maxParticipants"
                  min="0"
                  value={form.maxParticipants}
                  onChange={handleChange}
                />
                <div className="form-text">0 - без ограничений</div>
              </div>

              <div className="mb-3">
                <label htmlFor="requirements" className="form-label">Требования к участникам</label>
                <textarea
                  className="form-control"
                  id="requirements"
                  name="requirements"
                  rows={3}
                  value={form.requirements}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prizes" className="form-label">Призы и награды</label>
                <textarea
                  className="form-control"
                  id="prizes"
                  name="prizes"
                  rows={3}
                  value={form.prizes}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Создание...
                    </>
                  ) : (
                    'Создать конкурс'
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Отмена
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 