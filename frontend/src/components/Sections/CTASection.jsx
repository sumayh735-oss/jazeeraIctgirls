import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const CTASection = () => {
  return (
 <section className="py-20 md:py-32 bg-gradient-to-br from-primary-navy to-primary-navy/90 text-center text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Join hundreds of Somali sisters learning, growing, and leading together.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-4 bg-white text-primary-navy px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
          >
            Register Now
            <HiArrowRight className="text-2xl" />
          </Link>
        </div>
      </section>
  );
};

export default CTASection;