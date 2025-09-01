// src/app/signup/page.tsx
"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import SignupForm from '@/components/signup-form';

export default function SignupPage() {
  return (
    <AuthProvider>
      <SignupForm />
    </AuthProvider>
  );
}
