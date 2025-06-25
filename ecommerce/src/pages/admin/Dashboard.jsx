import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { getDashboardStats } from '@/services/apiService';
import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Activity,
  Plus,
  Eye
} from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        productCount: 0,
        categoryCount: 0,
        totalRevenue: 0,
        totalOrders: 0,
        categoryDistribution: [],
        monthlyData: [],
        recentProducts: [],
        topCategories: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    const StatCard = ({ title, value, icon: Icon, trend, subtitle, color = "blue" }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 text-${color}-500`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                        {trend}
                    </p>
                )}
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6 ml-0 md:ml-12 px-2 sm:px-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Welcome back! Here's what's happening with your store today.
                    </p>
                </div>
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm sm:text-base">Add Product</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+12.5% from last month"
                    color="green"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders.toLocaleString()}
                    icon={ShoppingCart}
                    trend="+8.2% from last month"
                    color="blue"
                />
                <StatCard
                    title="Total Products"
                    value={stats.productCount}
                    icon={Package}
                    subtitle={`Across ${stats.categoryCount} categories`}
                    color="purple"
                />
                <StatCard
                    title="Active Categories"
                    value={stats.categoryCount}
                    icon={Users}
                    subtitle="Product categories"
                    color="orange"
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {/* Monthly Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                            Monthly Revenue & Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                            <LineChart data={stats.monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip 
                                    formatter={(value, name) => [
                                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                                        name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Products'
                                    ]}
                                />
                                <Legend />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#3b82f6" 
                                    strokeWidth={2}
                                    name="Revenue"
                                />
                                <Line 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="orders" 
                                    stroke="#10b981" 
                                    strokeWidth={2}
                                    name="Orders"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                            Category Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                            <PieChart>
                                <Pie
                                    data={stats.categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                                    outerRadius={60}
                                    className="sm:outerRadius={80}"
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {stats.categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, 'Products']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {/* Recent Products */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                            Recent Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {stats.recentProducts.map((product, index) => (
                                <div key={product.id || index} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm sm:text-base truncate">{product.name}</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                ${product.price || '0.00'}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {product.category_name || 'Uncategorized'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                            Top Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {stats.topCategories.map((category, index) => (
                                <div key={category.name} className="space-y-1 sm:space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm font-medium truncate">{category.name}</span>
                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                            {category.count} products
                                        </span>
                                    </div>
                                    <Progress 
                                        value={category.percentage} 
                                        className="h-1 sm:h-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="text-xs sm:text-sm">Add New Product</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                            <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="text-xs sm:text-sm">Manage Categories</span>
                        </Button>
                        <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                            <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="text-xs sm:text-sm">View Analytics</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard; 