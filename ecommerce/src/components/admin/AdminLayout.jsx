import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Bell,
  LogOut,
  Search,
  FolderKanban,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/services/apiService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({ productCount: 0, categoryCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats({
              productCount: data.productCount,
              categoryCount: data.categoryCount
            });
        } catch (error) {
            console.error('Error fetching stats for layout:', error);
            // Fallback to mock data on error
            setStats({ productCount: 12, categoryCount: 5 });
        }
    };
    fetchStats();
  }, []);

  const navLinks = [
    { 
      to: '/admin', 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
    },
    { 
      to: '/admin/products', 
      icon: Package, 
      label: 'Products', 
      badge: stats.productCount
    },
    { 
      to: '/admin/categories', 
      icon: FolderKanban, 
      label: 'Categories', 
      badge: stats.categoryCount
    },
    { 
      to: '/', 
      icon: Home, 
      label: 'Go to Site', 
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-950/95 border-r border-gray-200 dark:border-gray-800/50 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Logo Section */}
        <div className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-800/50 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center space-x-3 ${isSidebarCollapsed ? 'hidden' : ''}`}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                <p className="text-gray-500 text-xs">E-commerce</p>
              </div>
            </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5 text-gray-500" /> : <ChevronLeft className="w-5 h-5 text-gray-500" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          <TooltipProvider>
            {navLinks.map((link) => (
              <Tooltip key={link.label} delayDuration={0} disableHoverableContent={!isSidebarCollapsed}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={link.to}
                    end={link.to === '/admin'}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 relative ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`
                    }
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    {!isSidebarCollapsed && (
                      <span className="text-base whitespace-nowrap">{link.label}</span>
                    )}
                    {link.badge && !isSidebarCollapsed && (
                      <Badge 
                        variant="secondary" 
                        className="ml-auto text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5"
                      >
                        {link.badge}
                      </Badge>
                    )}
                  </NavLink>
                </TooltipTrigger>
                {isSidebarCollapsed && <TooltipContent side="right" className="bg-gray-800 text-white border-none rounded-md">{link.label}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {/* User Profile Section */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800/50">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`w-full flex items-center text-left transition-colors ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start p-2'}`}>
                <Avatar className="w-9 h-9">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback className="bg-blue-600 text-white font-bold">AD</AvatarFallback>
                </Avatar>
                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@example.com</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/90">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-950/95 shadow-sm border-b border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center justify-between px-6 h-16">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products, categories, orders..."
                  className="pl-11 pr-4 py-2 h-10 bg-gray-100 dark:bg-gray-800/80 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Bell className="w-5 h-5" />
                 <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
              {/* User Menu */}
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-1 pr-2 rounded-full">
                     <Avatar className="w-8 h-8">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">AD</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Admin</p>
                      </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 