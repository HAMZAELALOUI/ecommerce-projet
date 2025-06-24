import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getDashboardStats } from '@/services/apiService';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, Activity, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
    const [stats, setStats] = useState({ productCount: 0, categoryCount: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to load dashboard stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadStats();
    }, []);

    // Sample data for charts
    const salesData = [
        { name: 'Jan', sales: 4000, orders: 2400 },
        { name: 'Feb', sales: 3000, orders: 1398 },
        { name: 'Mar', sales: 2000, orders: 9800 },
        { name: 'Apr', sales: 2780, orders: 3908 },
        { name: 'May', sales: 1890, orders: 4800 },
        { name: 'Jun', sales: 2390, orders: 3800 },
    ];

    const categoryData = [
        { name: 'Fruits', value: 45, color: '#10B981' },
        { name: 'Vegetables', value: 35, color: '#F59E0B' },
        { name: 'Desserts', value: 20, color: '#EF4444' },
    ];

    const recentActivity = [
        { id: 1, action: 'New product added', item: 'Fresh Oranges', time: '2 minutes ago', type: 'product' },
        { id: 2, action: 'Category updated', item: 'Fruits', time: '15 minutes ago', type: 'category' },
        { id: 3, action: 'Product deleted', item: 'Old Tomatoes', time: '1 hour ago', type: 'product' },
        { id: 4, action: 'New category created', item: 'Organic Products', time: '2 hours ago', type: 'category' },
    ];

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        {trend && (
                            <div className="flex items-center mt-2">
                                {trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {trendValue}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={`p-3 rounded-full ${color}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Products"
                    value={stats.productCount}
                    icon={Package}
                    trend="up"
                    trendValue="+12%"
                    color="bg-blue-500"
                />
                <StatCard
                    title="Categories"
                    value={stats.categoryCount}
                    icon={ShoppingCart}
                    trend="up"
                    trendValue="+5%"
                    color="bg-green-500"
                />
                <StatCard
                    title="Total Orders"
                    value="1,234"
                    icon={Users}
                    trend="up"
                    trendValue="+23%"
                    color="bg-purple-500"
                />
                <StatCard
                    title="Revenue"
                    value="45,678 MAD"
                    icon={DollarSign}
                    trend="up"
                    trendValue="+18%"
                    color="bg-orange-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-600" />
                            Sales Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#6b7280"
                                    fontSize={12}
                                />
                                <YAxis 
                                    stroke="#6b7280"
                                    fontSize={12}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="sales" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="orders" 
                                    stroke="#10b981" 
                                    strokeWidth={3}
                                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Package className="w-5 h-5 mr-2 text-green-600" />
                            Category Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-purple-600" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${
                                        activity.type === 'product' ? 'bg-blue-500' : 'bg-green-500'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.item}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {activity.time}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-orange-600" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <button className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                <div className="flex items-center">
                                    <Package className="w-5 h-5 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Add Product</p>
                                        <p className="text-xs text-gray-500">Create a new product</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                                <div className="flex items-center">
                                    <ShoppingCart className="w-5 h-5 text-green-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Add Category</p>
                                        <p className="text-xs text-gray-500">Create a new category</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">View Orders</p>
                                        <p className="text-xs text-gray-500">Check recent orders</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                        Performance Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">98.5%</div>
                            <div className="text-sm text-gray-600">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">2.3s</div>
                            <div className="text-sm text-gray-600">Avg Response</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">1,847</div>
                            <div className="text-sm text-gray-600">Page Views</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">89%</div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard; 