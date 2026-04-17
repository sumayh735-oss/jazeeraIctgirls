// src/components/Sections/CommunityTeaserSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';          // ← added this
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';    // ← added for arrow icon

const CommunityTeaserSection = () => {
  const testimonials = [
    {
      quote: "This community gave me the confidence to start coding — now I'm building my first app!",
      name: "Amina, 2nd Year Student",
    },
    {
      quote: "The mentorship here changed my life — I got my first tech internship!",
      name: "Fatima, Graduate",
    },
    {
      quote: "Safe space, real support, and sisters who cheer you on — this is home.",
      name: "Maryam, Mentor",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-tech/10 text-primary-tech font-semibold text-base uppercase tracking-wider mb-6">
            <span className="w-3 h-3 rounded-full bg-primary-tech animate-pulse" />
            Sisterhood Stories
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-navy leading-tight">
            What Our Sisters Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-primary-navy/10 shadow-sm hover:shadow-xl hover:border-primary-tech/30 transition-all duration-300"
            >
              <div className="text-5xl text-primary-tech/20 mb-6 font-serif">“</div>

              <p className="text-xl md:text-2xl text-primary-navy/90 leading-relaxed mb-8 italic">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-tech/20 to-primary-navy/20 flex items-center justify-center text-primary-navy font-bold text-lg border-2 border-white">
                  {testimonial.name.charAt(0)}
                </div>
                <p className="font-medium text-primary-navy">
                  — {testimonial.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/community"
            className="group inline-flex items-center gap-3 bg-primary-tech text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-primary-tech/90 hover:shadow-xl transition-all duration-300"
          >
            Join the Sisterhood
            <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityTeaserSection;