// src/components/login-form.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        toast({
            variant: "destructive",
            title: "Erro de Validação",
            description: "Email e senha não podem estar vazios.",
        });
        return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no Login",
        description: "Credenciais inválidas. Por favor, tente novamente.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="absolute top-8 left-8">
            <Link href="/" aria-label="Ir para a página principal" className="group relative block text-foreground">
                <Sun size={32} className="transition-transform duration-300 group-hover:scale-110" />
            </Link>
        </div>
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Digite seu email abaixo para entrar na sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Não tem uma conta?{' '}
                <Link href="/signup" className="underline">
                Cadastre-se
                </Link>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}
