import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Проверка обязательных полей
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await hash(password, 12);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(
      { 
        message: 'Пользователь успешно зарегистрирован',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при регистрации' },
      { status: 500 }
    );
  }
} 