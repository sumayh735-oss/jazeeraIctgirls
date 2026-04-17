// src/components/Sections/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import HeroImage from '../../assets/images/waa1.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="Somali sisters coding together and smiling"
          className="w-full h-full object-cover brightness-[0.82] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/85 via-primary-navy/50 to-transparent" />
      </div>

      {/* Subtle floating glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary-tech/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[50%] h-[50%] bg-primary-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 max-w-7xl z-10">
        <div className="text-center space-y-10 md:space-y-16">
          {/* Pulse badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-base uppercase tracking-wider mx-auto"
          >
            <span className="w-4 h-4 rounded-full bg-primary-tech animate-pulse" />
            Somali Girls in Tech
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight"
          >
            Empowering Somali Girls
            <br className="hidden sm:block" />
            <span className="text-primary-tech block mt-4 md:mt-6">
              in Technology
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
          >
            A safe, supportive space where Somali girls learn ICT skills, receive real mentorship, 
            and build bright futures — together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-6 md:pt-10"
          >
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-4 bg-primary-tech text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl shadow-2xl hover:bg-primary-tech/90 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
            >
              Join Now
              <HiArrowRight className="text-xl md:text-2xl group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              to="/community"
              className="group inline-flex items-center justify-center gap-4 border-2 border-white text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Explore Community
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;