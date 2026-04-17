// src/components/Sections/ImpactStatsSection.jsx
import React from 'react';

const stats = [
  { number: '150+', label: 'Girls Trained' },
  { number: '10+', label: 'Workshops Completed' },
  { number: '95%', label: 'Satisfaction Rate' },
  { number: '1.2k+', label: 'Growing Community' },
];

const ImpactStatsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-gradient-to-b from-primary-tech/5 to-transparent rounded-2xl border border-primary-tech/10 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary-tech mb-2">
                {stat.number}
              </h3>
              <p className="text-primary-navy/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;