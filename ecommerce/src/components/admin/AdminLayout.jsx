import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Bell,
  User,
  LogOut,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navLinks = [
    { 
      to: '/admin', 
      icon: BarChart3, 
      label: 'Dashboard', 
      badge: null,
      color: 'from-blue-500 to-blue-600',
      activeColor: 'from-blue-600 to-blue-700'
    },
    { 
      to: '/admin/products', 
      icon: Package, 
      label: 'Products', 
      badge: '12',
      color: 'from-purple-500 to-purple-600',
      activeColor: 'from-purple-600 to-purple-700'
    },
    { 
      to: '/admin/categories', 
      icon: ShoppingCart, 
      label: 'Categories', 
      badge: '5',
      color: 'from-green-500 to-green-600',
      activeColor: 'from-green-600 to-green-700'
    },
    { 
      to: '/', 
      icon: Home, 
      label: 'Go to Site', 
      badge: null,
      color: 'from-orange-500 to-orange-600',
      activeColor: 'from-orange-600 to-orange-700'
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-950 shadow-2xl border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600 to-blue-700">
          {!isSidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-blue-100 text-sm">E-commerce Management</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hover:bg-white/20 text-white"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          <TooltipProvider>
            {navLinks.map((link) => (
              <Tooltip key={link.label} disableHoverableContent={!isSidebarCollapsed}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${link.activeColor} text-white shadow-lg transform scale-105`
                          : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      } ${isSidebarCollapsed ? 'justify-center' : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-transparent'}`}>
                          <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                        </div>
                        {!isSidebarCollapsed && (
                          <div className="flex items-center justify-between w-full ml-3">
                            <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{link.label}</span>
                            {link.badge && (
                              <Badge 
                                variant="secondary" 
                                className={`ml-auto text-xs font-bold ${
                                  isActive 
                                    ? 'bg-white/20 text-white border-white/30' 
                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                }`}
                              >
                                {link.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                        {isActive && !isSidebarCollapsed && (
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-white rounded-l-full shadow-lg" />
                        )}
                      </>
                    )}
                  </NavLink>
                </TooltipTrigger>
                {isSidebarCollapsed && <TooltipContent side="right">{link.label}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <Avatar className="w-10 h-10 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-950">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold">AD</AvatarFallback>
            </Avatar>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-950 shadow-lg border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-8 py-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products, categories..."
                  className="pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white">
                  3
                </Badge>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                <Settings className="w-5 h-5" />
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-950">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 