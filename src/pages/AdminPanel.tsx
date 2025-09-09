import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, BarChart3, Settings, Search, MoreVertical, Shield, Activity } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'files' | 'analytics'>('users');

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'files', name: 'Files', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  // Mock data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', files: 5, lastActive: '2 hours ago', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', files: 8, lastActive: '1 day ago', status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', files: 12, lastActive: '30 min ago', status: 'active' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user', files: 3, lastActive: '1 week ago', status: 'inactive' },
  ];

  const files = [
    { id: '1', name: 'Sales_Q4_2024.xlsx', user: 'John Doe', size: '2.4 MB', uploaded: '2 hours ago', charts: 3 },
    { id: '2', name: 'Marketing_Data.xlsx', user: 'Jane Smith', size: '1.8 MB', uploaded: '1 day ago', charts: 5 },
    { id: '3', name: 'Revenue_Report.xlsx', user: 'Mike Johnson', size: '3.2 MB', uploaded: '2 days ago', charts: 2 },
    { id: '4', name: 'Customer_Analytics.xlsx', user: 'Sarah Wilson', size: '1.5 MB', uploaded: '1 week ago', charts: 4 },
  ];

  const stats = [
    { name: 'Total Users', value: '248', change: '+12%', icon: Users },
    { name: 'Files Uploaded', value: '1,256', change: '+18%', icon: FileText },
    { name: 'Charts Created', value: '3,842', change: '+25%', icon: BarChart3 },
    { name: 'Storage Used', value: '24.8 GB', change: '+8%', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-blue-200 mt-2">Manage users, monitor activity, and system analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-purple-400" />
          <span className="text-purple-400 font-semibold">Admin Access</span>
        </div>
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
                  <p className="text-green-400 text-xs mt-1">{stat.change} from last month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs and Content */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">User Management</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Files</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Last Active</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{user.files}</td>
                        <td className="py-3 px-4 text-gray-300">{user.lastActive}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">File Management</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">File Name</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Size</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Uploaded</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Charts</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <p className="font-medium text-white">{file.name}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{file.user}</td>
                        <td className="py-3 px-4 text-gray-300">{file.size}</td>
                        <td className="py-3 px-4 text-gray-300">{file.uploaded}</td>
                        <td className="py-3 px-4 text-blue-400">{file.charts}</td>
                        <td className="py-3 px-4">
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white">System Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">User Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Daily Active Users</span>
                      <span className="text-blue-400">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Weekly Active Users</span>
                      <span className="text-blue-400">432</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Active Users</span>
                      <span className="text-blue-400">1,248</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">File Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Files Uploaded Today</span>
                      <span className="text-green-400">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Charts Generated Today</span>
                      <span className="text-green-400">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Average File Size</span>
                      <span className="text-green-400">2.1 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
