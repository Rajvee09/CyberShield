
'use server';

import { z } from 'zod';
import { getUserByEmail, addUser } from '@/lib/data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function loginAction(
  prevState: { message: string },
  formData: FormData
) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: 'Invalid form data' };
  }

  const { email, password } = parsed.data;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      return { message: 'Invalid email or password.' };
    }

    cookies().set('cyber-shield-user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during login.' };
  }

  redirect('/');
}

export async function signupAction(
  prevState: { message: string },
  formData: FormData
) {
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: 'Invalid form data' };
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { message: 'An account with this email already exists.' };
    }

    const newUser = await addUser({ name, email, password });

    cookies().set('cyber-shield-user', JSON.stringify(newUser), {
      httpOnly: true,
      secure: process.env.NODE-ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during sign up.' };
  }

  redirect('/');
}
