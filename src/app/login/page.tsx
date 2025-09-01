// src/app/login/page.tsx
"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
