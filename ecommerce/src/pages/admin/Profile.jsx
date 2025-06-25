import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Shield, Calendar, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const admin = {
  name: 'Admin User',
  email: 'admin@freshmarket.com',
  role: 'Super Admin',
  joined: '2023-01-15',
  avatar: '/assets/logo.jpeg',
  bio: "Gère la plateforme FreshMarket. Passionné par la qualité, la fraîcheur et l'expérience client.",
};

export default function Profile() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-emerald-50 to-orange-50 py-8 px-2">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-0 bg-white/90">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <img
            src={admin.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-emerald-400 shadow-md object-cover mb-2"
          />
          <CardTitle className="text-2xl font-serif font-bold text-emerald-700 mb-1">{admin.name}</CardTitle>
          <Badge className="bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full text-xs">{admin.role}</Badge>
        </CardHeader>
        <CardContent className="space-y-4 mt-2">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-emerald-500" />
            <span className="text-sm sm:text-base">{admin.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="text-sm sm:text-base">Rôle : <span className="font-semibold">{admin.role}</span></span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span className="text-sm sm:text-base">Membre depuis le <span className="font-semibold">{admin.joined}</span></span>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-gray-600 text-sm sm:text-base">
            {admin.bio}
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm">
              <Edit2 className="w-4 h-4" />
              Modifier le profil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 