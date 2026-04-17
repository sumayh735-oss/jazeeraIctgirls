import React from 'react';
import { motion } from 'framer-motion';
import {
  HiCode,
  HiChartBar,
  HiDeviceMobile,
  HiSparkles,
  HiArrowRight,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const paths = [
  {
    icon: HiCode,
    title: 'Web Development',
    desc: 'Build modern websites and full-stack apps using HTML, CSS, JavaScript, and React.',
    status: 'Coming Soon',
  },
  {
    icon: HiChartBar,
    title: 'Data Science & Analytics',
    desc: 'Learn Python, SQL, and data visualization to turn data into meaningful insights.',
    status: 'Coming Soon',
  },
  {
    icon: HiDeviceMobile,
    title: 'Mobile App Development',
    desc: 'Create Android & iOS apps using Flutter or React Native.',
    status: 'Coming Soon',
  },
  
];

const LearningPathsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-tech/10 text-primary-tech font-semibold uppercase tracking-wider mb-6">
            <span className="w-3 h-3 rounded-full bg-primary-tech animate-pulse" />
            Future-Ready Skills
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-primary-navy">
            Our Learning Paths
          </h2>

          <p className="mt-6 text-xl text-primary-navy/80 max-w-3xl mx-auto">
            Choose your journey — structured paths built to help every sister grow.
          </p>
        </motion.div>

        {/* ✅ 3-COLUMN GRID (WIDE CARDS) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {paths.map((path, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="
                group bg-white/95 backdrop-blur-sm
                rounded-3xl
                p-10 md:p-12
                border border-primary-navy/10
                shadow-md hover:shadow-xl
                hover:border-primary-tech/40
                transition-all duration-300
                flex flex-col items-center text-center
              "
            >
              {/* Icon */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-tech/15 to-primary-navy/15 flex items-center justify-center mb-8">
                <path.icon className="text-5xl text-primary-tech" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4 group-hover:text-primary-tech transition-colors">
                {path.title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-primary-navy/80 mb-6 leading-relaxed">
                {path.desc}
              </p>

              {/* Status */}
              <span className="px-6 py-2 bg-primary-tech/10 text-primary-tech font-medium rounded-full text-sm md:text-base">
                {path.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/community"
            className="group inline-flex items-center gap-3 bg-primary-tech text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-primary-tech/90 hover:shadow-xl transition-all"
          >
            Join the Community & Get Ready
            <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default LearningPathsSection;
