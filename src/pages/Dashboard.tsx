import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, BarChart3, FileText, TrendingUp, Clock, Users } from 'lucide-react';

interface DashboardProps {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Mock data - in real app, this would come from API
  const stats = [
    { name: 'Files Uploaded', value: '12', icon: FileText, change: '+2 this week' },
    { name: 'Charts Generated', value: '38', icon: BarChart3, change: '+8 this week' },
    { name: 'Total Views', value: '156', icon: TrendingUp, change: '+23 this week' },
    { name: 'Storage Used', value: '2.4 GB', icon: Upload, change: '60% of limit' },
  ];

  const recentFiles = [
    { name: 'Sales_Q4_2024.xlsx', date: '2 hours ago', charts: 3 },
    { name: 'Marketing_Data.xlsx', date: '1 day ago', charts: 5 },
    { name: 'Customer_Analytics.xlsx', date: '3 days ago', charts: 2 },
    { name: 'Revenue_Report.xlsx', date: '1 week ago', charts: 4 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user.name}!
        </h1>
        <p className="text-blue-200 mt-2">
          Here's what's happening with your data visualizations today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{stat.name}</p>
                  <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-blue-400 text-xs mt-1">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload New File */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/upload"
              className="flex items-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <Upload className="w-6 h-6 text-white mr-3" />
              <div>
                <p className="font-semibold text-white">Upload Excel File</p>
                <p className="text-blue-100 text-sm">Start creating visualizations</p>
              </div>
            </Link>
            <Link
              to="/charts"
              className="flex items-center p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
            >
              <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
              <div>
                <p className="font-semibold text-white">View Charts</p>
                <p className="text-gray-300 text-sm">Browse your visualizations</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Files</h3>
          <div className="space-y-3">
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                <div>
                  <p className="font-medium text-white text-sm">{file.name}</p>
                  <p className="text-gray-400 text-xs">{file.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 text-sm">{file.charts} charts</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/charts"
            className="block text-center text-blue-400 hover:text-blue-300 text-sm mt-4 transition-colors"
          >
            View all files →
          </Link>
        </motion.div>
      </div>

      {/* Tips & Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">1. Upload</h4>
            <p className="text-gray-300 text-sm">Upload your Excel files (.xls/.xlsx)</p>
          </div>
          <div className="text-center p-4">
            <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">2. Visualize</h4>
            <p className="text-gray-300 text-sm">Create interactive 2D/3D charts</p>
          </div>
          <div className="text-center p-4">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">3. Analyze</h4>
            <p className="text-gray-300 text-sm">Get AI-powered insights</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
