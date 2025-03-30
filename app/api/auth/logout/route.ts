import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Выход выполнен успешно' });
    response.cookies.delete('token');
    return response;
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при выходе' },
      { status: 500 }
    );
  }
} 