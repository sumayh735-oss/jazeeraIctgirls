// frontend/src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import image from '../assets/images/ayada1.jpg';
import image2 from '../assets/images/kuli1.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } }
};

const About = () => {
  const stats = [
    { value: '95%', label: 'Participant Satisfaction' },
    { value: '10+', label: 'Programs & Workshops' },
    { value: '150+', label: 'Active Girls' },
  ];

  const whyList = [
    'Measurable Real-World Results',
    'Practical, Hands-On Skill Training',
    'Ongoing Professional Mentorship',
    'Safe & Truly Inspiring Sisterhood',
  ];

  return (
    <div className="min-h-screen bg-white">

<section className="relative py-14 md:py-18 flex items-center justify-center px-6 md:px-12 overflow-hidden">

  {/* Light background color + gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary-tech/20 via-white to-primary-tech/20" />

  {/* Content */}
  <div className="relative z-10 max-w-6xl w-full text-center space-y-5 md:space-y-7">
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-tech/10 text-primary-tech font-semibold uppercase"
    >
      <span className="w-3 h-3 rounded-full bg-primary-tech animate-pulse" />
      Our Story
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-navy leading-tight"
    >
      Jazeera ICT Girls
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="text-lg md:text-xl lg:text-2xl text-primary-navy/80 max-w-4xl mx-auto"
    >
      Empowering Somali female students to lead in technology through world-class education, lifelong mentorship, and unbreakable sisterhood.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="flex flex-col sm:flex-row gap-5 justify-center pt-3"
    >
      <Link
        to="/register"
        className="group inline-flex items-center justify-center gap-4 bg-primary-tech text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-primary-tech/90 hover:scale-[1.02] transition-all"
      >
        Join the Movement
        <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
      </Link>

      <Link
        to="/contact"
        className="group inline-flex items-center justify-center gap-4 border-2 border-primary-tech text-primary-tech px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-tech/5 transition-all"
      >
        Get in Touch
      </Link>
    </motion.div>
  </div>
</section>



      {/* IMPACT STATS - Clean & powerful */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-7xl md:text-8xl font-black text-primary-tech">
                  {stat.value}
                </div>
                <p className="text-2xl text-primary-navy/80 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE MATTER - Elegant & emotional */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-12 order-2 lg:order-1"
            >
              <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary-tech/10 text-primary-tech font-semibold text-lg">
                <span className="w-4 h-4 rounded-full bg-primary-tech animate-pulse" />
                OUR MISSION
              </span>

              <h2 className="text-5xl md:text-6xl font-extrabold text-primary-navy leading-tight">
                Empowering Girls to Thrive in ICT
              </h2>

              <p className="text-2xl text-primary-navy/90 leading-relaxed">
                We exist to give Somali girls real skills, unbreakable confidence, and genuine opportunities to lead and succeed in the world of technology.
              </p>

              <ul className="space-y-8">
                {whyList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-6 text-xl text-primary-navy/90"
                  >
                    <HiCheckCircle className="text-primary-tech text-3xl flex-shrink-0 mt-1" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/30 order-1 lg:order-2"
            >
              <img
                src={image2}
                alt="Somali girls learning and growing together"
                className="w-full h-[700px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;