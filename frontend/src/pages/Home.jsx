// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiUsers, HiAcademicCap, HiHeart, HiSparkles } from 'react-icons/hi';
import LearningPathsSection from '../components/Sections/LearningPathsSection.jsx';
import HeroSection from '../components/Sections/HeroSection.jsx';
import CTASection from '../components/Sections/CTASection.jsx';
import CommunityTeaserSection from '../components/Sections/CommunityTeaserSection.jsx';
import Blog from './Blog.jsx';
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* 1. Hero – Large photo + empowering headline + 2 big CTAs */}
     
<HeroSection />
{/* Section Heading – Global Style */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className="text-center mb-16 md:mb-20"
>


 

 
</motion.div>


<Blog
  showHero={false}
  showHeading={true}
  showFilters={false}
  showCTA={false}
  limit={3}
/>

    
      {/* 4. Learning Paths – Card Grid */}
     
<LearningPathsSection />
      {/* 5. Community/Mentorship Teaser */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-navy/5 to-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
            Join 1,200+ Somali Sisters in Tech
          </h2>
          <p className="text-xl text-primary-navy/80 mb-10 max-w-3xl mx-auto">
            Share knowledge, ask questions, celebrate wins, and grow together in our safe, supportive community.
          </p>
          <Link
            to="/community"
            className="inline-flex items-center gap-3 bg-primary-navy text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:bg-primary-navy/90 hover:shadow-xl transition-all"
          >
            Go to Community
            <HiArrowRight className="text-xl" />
          </Link>
        </div>
      </section>

      <CommunityTeaserSection />

      {/* 7. Final Big CTA */}
      <CTASection />
    </div>
  );
};

export default Home;