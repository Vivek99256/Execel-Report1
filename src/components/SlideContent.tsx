import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../data/slidesData';

interface SlideContentProps {
  slide: Slide;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Icon and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-lg text-blue-200 mt-1">{slide.subtitle}</p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {slide.content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-200 text-lg leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats/Metrics if available */}
          {slide.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {slide.metrics.map((metric, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-300">{metric.value}</div>
                  <div className="text-sm text-gray-300">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            {slide.visual && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{slide.visual.title}</h3>
                <p className="text-gray-300">{slide.visual.description}</p>
              </div>
            )}
            
            {slide.chart && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">{slide.chart.title}</h3>
                <div className="space-y-3">
                  {slide.chart.data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          />
                        </div>
                        <span className="text-blue-300 font-semibold">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      {slide.cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105">
            {slide.cta}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SlideContent;
