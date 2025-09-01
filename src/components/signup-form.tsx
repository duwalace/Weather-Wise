// src/components/signup-form.tsx
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

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!name || !email || !password) {
        toast({
            variant: "destructive",
            title: "Erro de Validação",
            description: "Todos os campos são obrigatórios.",
        });
        return;
    }
    setIsLoading(true);
    try {
      await signup({ email, password });
      toast({
        title: "Cadastro Realizado com Sucesso",
        description: "Por favor, faça login com sua nova conta.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Falha no Cadastro",
        description: "Ocorreu um erro. Por favor, tente novamente.",
      });
    } finally {
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
            <CardTitle className="text-2xl">Cadastre-se</CardTitle>
            <CardDescription>
                Crie uma conta para ter acesso completo.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                    Criar Conta
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Já tem uma conta?{' '}
                <Link href="/login" className="underline">
                Faça login
                </Link>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}
