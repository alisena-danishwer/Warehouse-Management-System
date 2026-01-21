import { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    totalInbound: 0,
    totalOutbound: 0,
    totalValue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/dashboard');
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const chartData = [
    { name: 'Inbound', value: stats.totalInbound },
    { name: 'Outbound', value: stats.totalOutbound },
  ];

  // Reusable Stat Card Component
  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {subtext && <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{subtext}</span>}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
        <h1 className="text-3xl font-bold mb-2">Warehouse Overview</h1>
        <p className="text-blue-100 opacity-90">Here is what's happening with your inventory today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          color="bg-blue-500"
          subtext="Active SKUs"
        />
        <StatCard 
          title="Inventory Value" 
          value={`$${stats.totalValue}`} 
          icon={DollarSign} 
          color="bg-emerald-500"
          subtext="Total Assets"
        />
        <StatCard 
          title="Total Inbound" 
          value={stats.totalInbound} 
          icon={TrendingUp} 
          color="bg-violet-500"
          subtext="Lifetime"
        />
        <StatCard 
          title="Total Outbound" 
          value={stats.totalOutbound} 
          icon={TrendingDown} 
          color="bg-orange-500"
          subtext="Lifetime"
        />
      </div>

      {/* Charts & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Movement Analytics
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : '#f97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
            Attention Needed
          </h3>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-red-50 rounded-xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <span className="text-4xl font-bold text-red-600 mb-2">{stats.lowStockCount}</span>
            <span className="text-sm font-medium text-red-800 text-center">Items Below Threshold</span>
            <p className="text-xs text-red-400 mt-2 text-center max-w-[150px]">Restock these items immediately to avoid shortage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}