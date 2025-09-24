
'use server';

import { z } from 'zod';
import { getUserByEmail, addUser } from '@/lib/data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@/lib/definitions';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

// This is a helper function to set the cookie.
const loginUser = (user: User) => {
  const userString = JSON.stringify(user);
  // This httpOnly cookie is for the server to recognize the user.
  cookies().set('cyber-shield-user', userString, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  // This client-side cookie is for the AuthProvider to sync state.
  cookies().set('cyber-shield-user-client', userString, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
};

export async function loginAction(
  prevState: { message: string, user?: User | null, success?: boolean },
  formData: FormData
) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: 'Invalid form data', success: false };
  }

  const { email, password } = parsed.data;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      return { message: 'Invalid email or password.', success: false };
    }
    
    loginUser(user);
    return { message: 'Login successful', user, success: true };

  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during login.', success: false };
  }
}

export async function signupAction(
  prevState: { message: string, user?: User | null, success?: boolean },
  formData: FormData
) {
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: 'Invalid form data', success: false };
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { message: 'An account with this email already exists.', success: false };
    }

    const newUser = await addUser({ name, email, password });
    
    loginUser(newUser);
    return { message: 'Signup successful', user: newUser, success: true };

  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during sign up.', success: false };
  }
}

export async function logoutAction() {
  cookies().delete('cyber-shield-user');
  cookies().delete('cyber-shield-user-client');
}
//testing complete
