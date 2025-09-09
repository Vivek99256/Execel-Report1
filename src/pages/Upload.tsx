import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { ProcessedFile } from '../App';

interface UploadProps {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
  onFileProcessed: (file: ProcessedFile) => void;
}

interface UploadProgressFile {
  file: File;
  id: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  message?: string;
}

const Upload: React.FC<UploadProps> = ({ user, onFileProcessed }) => {
  const [uploadProgressFiles, setUploadProgressFiles] = useState<UploadProgressFile[]>([]);

  const processFile = async (file: File): Promise<{ data: any[][]; headers: string[] }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          
          if (jsonData.length < 2) {
            reject(new Error('File must contain a header row and at least one data row.'));
            return;
          }
          
          const headers = jsonData[0] as string[];
          const dataRows = jsonData.slice(1) as any[][];
          
          resolve({ data: dataRows, headers });
        } catch (error) {
          reject(new Error('Failed to parse the Excel file.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      const uploadFile: UploadProgressFile = {
        file,
        id: fileId,
        status: 'uploading',
        progress: 0,
      };
      
      setUploadProgressFiles(prev => [...prev, uploadFile]);
      
      const progressInterval = setInterval(() => {
        setUploadProgressFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(f.progress + 10, 90) } : f
        ));
      }, 100);
      
      setTimeout(async () => {
        clearInterval(progressInterval);
        
        try {
          setUploadProgressFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'processing', progress: 95 } : f
          ));
          
          const { data, headers } = await processFile(file);
          
          const processedFile: ProcessedFile = {
            id: fileId,
            name: file.name,
            headers,
            data
          };
          onFileProcessed(processedFile);

          setUploadProgressFiles(prev => prev.map(f => 
            f.id === fileId ? { 
              ...f, 
              status: 'completed', 
              progress: 100, 
              message: `${data.length} rows, ${headers.length} columns`
            } : f
          ));
        } catch (error) {
          setUploadProgressFiles(prev => prev.map(f => 
            f.id === fileId ? { 
              ...f, 
              status: 'error', 
              progress: 0, 
              message: error instanceof Error ? error.message : 'Unknown error'
            } : f
          ));
        }
      }, 1000);
    });
  }, [onFileProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileId: string) => {
    setUploadProgressFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Upload Excel Files</h1>
        <p className="text-blue-200 mt-2">
          Upload your Excel files (.xls/.xlsx) to start creating visualizations
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
      >
        <div
          {...getRootProps()}
          className={`p-8 text-center cursor-pointer transition-all ${
            isDragActive 
              ? 'bg-blue-500/20 border-blue-500/50' 
              : 'hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              isDragActive 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}>
              <UploadIcon className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isDragActive ? 'Drop files here' : 'Drag & drop Excel files here'}
              </h3>
              <p className="text-gray-300 mb-4">
                or click to browse your computer
              </p>
              <p className="text-sm text-gray-400">
                Supports .xls and .xlsx files up to 10MB
              </p>
            </div>
            
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
              Select Files
            </button>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      {uploadProgressFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Upload Progress</h3>
          
          <div className="space-y-4">
            {uploadProgressFiles.map((uploadFile) => (
              <motion.div
                key={uploadFile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <File className="w-8 h-8 text-blue-400" />
                  
                  <div className="flex-1">
                    <p className="font-medium text-white">{uploadFile.file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    
                    {uploadFile.status !== 'completed' && uploadFile.status !== 'error' && (
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadFile.progress}%` }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-1">
                      {uploadFile.status === 'uploading' && 'Uploading...'}
                      {uploadFile.status === 'processing' && 'Processing...'}
                      {uploadFile.message}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(uploadFile.status)}
                  
                  <button
                    onClick={() => removeFile(uploadFile.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {uploadProgressFiles.some(f => f.status === 'completed') && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 font-medium">Files processed successfully!</p>
              <p className="text-green-300 text-sm mt-1">
                You can now create charts from your data. Go to the Charts section to get started.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-3">Upload Tips</h3>
        <ul className="space-y-2 text-blue-200">
          <li>• Ensure your Excel file has headers in the first row</li>
          <li>• Remove any empty rows or columns for better processing</li>
          <li>• Supported formats: .xls and .xlsx files</li>
          <li>• Maximum file size: 10MB per file</li>
          <li>• For best results, use clean, structured data</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Upload;
