import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Проверка обязательных полей
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Проверка пароля
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Создание JWT токена
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Создание сессии
    const session = await prisma.session.create({
      data: {
        sessionToken: token,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
      },
    });

    // Создаем ответ
    const response = NextResponse.json(
      { 
        message: 'Вход выполнен успешно',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 200 }
    );

    // Устанавливаем cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });

    return response;
  } catch (error) {
    console.error('Ошибка при входе:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при входе' },
      { status: 500 }
    );
  }
} 