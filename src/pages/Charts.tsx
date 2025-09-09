import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, ScatterChart as ScatterIcon, Download, Settings, Sparkles, FileWarning } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie, Scatter as ScatterChart } from 'react-chartjs-2';
import { ProcessedFile } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
  processedFiles: ProcessedFile[];
}

const Charts: React.FC<ChartsProps> = ({ user, processedFiles }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'scatter'>('bar');
  const [xAxis, setXAxis] =useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');

  const selectedFile = processedFiles.find(f => f.id === selectedFileId);

  useEffect(() => {
    if (processedFiles.length > 0 && !selectedFileId) {
      setSelectedFileId(processedFiles[0].id);
    }
  }, [processedFiles, selectedFileId]);

  useEffect(() => {
    if (selectedFile) {
      setXAxis(selectedFile.headers[0] || '');
      setYAxis(selectedFile.headers[1] || '');
    } else {
      setXAxis('');
      setYAxis('');
    }
  }, [selectedFile]);

  const chartTypes = [
    { type: 'bar', name: 'Bar Chart', icon: BarChart3 },
    { type: 'line', name: 'Line Chart', icon: LineChart },
    { type: 'pie', name: 'Pie Chart', icon: PieChart },
    { type: 'scatter', name: 'Scatter Plot', icon: ScatterIcon },
  ];

  const generateChartData = () => {
    if (!selectedFile || xAxis === '' || yAxis === '') return { labels: [], datasets: [] };

    const xIndex = selectedFile.headers.indexOf(xAxis);
    const yIndex = selectedFile.headers.indexOf(yAxis);

    if (xIndex === -1 || yIndex === -1) return { labels: [], datasets: [] };

    const labels = selectedFile.data.map(row => row[xIndex]);
    const dataset = selectedFile.data.map(row => row[yIndex]);
    
    if (chartType === 'pie') {
      return {
        labels,
        datasets: [{
          data: dataset,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(236, 72, 153, 0.8)',
          ],
          borderColor: 'rgba(0,0,0,0.2)',
          borderWidth: 2,
        }]
      };
    }

    if (chartType === 'scatter') {
      return {
        datasets: [{
          label: `${yAxis} vs ${xAxis}`,
          data: selectedFile.data.map(row => ({ x: row[xIndex], y: row[yIndex] })),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
        }]
      };
    }
    
    return {
      labels,
      datasets: [{
        label: yAxis,
        data: dataset,
        backgroundColor: chartType === 'line' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'rgba(255, 255, 255, 0.8)' } },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: 'white', bodyColor: 'white' }
    },
    scales: chartType !== 'pie' ? {
      x: { ticks: { color: 'rgba(255, 255, 255, 0.6)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: 'rgba(255, 255, 255, 0.6)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
    } : {}
  };

  const renderChart = () => {
    const data = generateChartData();
    if (!selectedFile) return null;
    
    switch (chartType) {
      case 'bar': return <Bar data={data} options={chartOptions} />;
      case 'line': return <Line data={data} options={chartOptions} />;
      case 'pie': return <Pie data={data} options={chartOptions} />;
      case 'scatter': return <ScatterChart data={data} options={chartOptions} />;
      default: return <Bar data={data} options={chartOptions} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Charts & Visualizations</h1>
        <p className="text-blue-200 mt-2">
          Create interactive charts from your uploaded data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Select Data Source</h3>
            <select
              value={selectedFileId || ''}
              onChange={(e) => setSelectedFileId(e.target.value)}
              disabled={processedFiles.length === 0}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processedFiles.length === 0 ? (
                <option>No files uploaded</option>
              ) : (
                processedFiles.map((file) => (
                  <option key={file.id} value={file.id} className="bg-gray-800">
                    {file.name}
                  </option>
                ))
              )}
            </select>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Chart Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {chartTypes.map((chart) => {
                const Icon = chart.icon;
                return (
                  <button key={chart.type} onClick={() => setChartType(chart.type as any)} disabled={!selectedFile}
                    className={`p-3 rounded-lg border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      chartType === chart.type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-xs">{chart.name}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Data Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">X-Axis</label>
                <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} disabled={!selectedFile}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedFile?.headers.map((header) => (
                    <option key={header} value={header} className="bg-gray-800">{header}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Y-Axis</label>
                <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} disabled={!selectedFile}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedFile?.headers.filter(h => h !== xAxis).map((header) => (
                    <option key={header} value={header} className="bg-gray-800">{header}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 min-h-[28rem]">
            {selectedFile ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">{chartTypes.find(c => c.type === chartType)?.name}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"><Settings className="w-4 h-4 text-gray-300" /></button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"><Download className="w-4 h-4 text-gray-300" /></button>
                  </div>
                </div>
                <div className="h-80">{renderChart()}</div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FileWarning className="w-16 h-16 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white">No Data to Display</h3>
                <p className="text-gray-300 mt-2">Please upload an Excel file on the 'Upload Data' page to get started.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
