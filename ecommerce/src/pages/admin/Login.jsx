import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fruits = [
  '🍎', '🍊', '🍌', '🍓', '🍇', '🥝', '🍍', '🥑', '🥕', '🥦', '🍅', '🥬', '🍉', '🍒', '🍋', '🥒', '🥔', '🧅', '🍑', '🍐'
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setError('');
      navigate('/admin');
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-orange-50 to-yellow-100 relative overflow-hidden">
      {/* Fruits & légumes animés en fond */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {fruits.map((fruit, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl sm:text-5xl opacity-30 select-none"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: i * 0.2
            }}
          >{fruit}</motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-2xl border-0 bg-white/95">
          <CardHeader className="flex flex-col items-center gap-2 pb-2 pt-6">
            <img src="/assets/logo.jpeg" alt="FreshMarket Logo" className="h-16 w-16 rounded-full shadow border-2 border-emerald-500 mb-2" />
            <CardTitle className="text-3xl font-serif font-extrabold text-emerald-700 mb-1">FreshMarket Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 mt-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="font-semibold text-stone-700">Nom d'utilisateur</label>
                <Input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  className="rounded-lg border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="admin"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-semibold text-stone-700">Mot de passe</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="rounded-lg border focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  placeholder="admin123"
                  required
                />
              </div>
              {error && <div className="text-red-500 text-center text-sm font-semibold animate-pulse">{error}</div>}
              <Button
                type="submit"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 shadow-lg text-lg font-bold tracking-wide transition-all duration-200"
                whileTap={{ scale: 0.97 }}
                as={motion.button}
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 