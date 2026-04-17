// src/components/Sections/MissionSection.jsx
import React from 'react';
import missionImage from '../../assets/images/kuli1.jpg'; // Add a real photo here!

const MissionSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-blue-50/50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-primary-navy/80 leading-relaxed mb-6">
              Jazeera ICT Girls is dedicated to empowering Somali female students through high-quality technology education, mentorship, and a supportive community.
            </p>
            <p className="text-lg text-primary-navy/80 leading-relaxed">
              We believe every girl deserves the opportunity to lead in the digital world — and we're building the bridge together.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={missionImage} 
              alt="Somali girls coding together" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;