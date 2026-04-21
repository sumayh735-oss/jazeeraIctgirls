import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendar,
  HiClock,
  HiSearch,
  HiUser,
  HiArrowRight,
  HiFilter,
} from 'react-icons/hi';

/* ================= DATA ================= */
const blogPosts = [
  {
    id: 1,
    title: "How to Start Python as a Beginner?",
    excerpt:
      "A simple introduction to Python — the easiest language to kickstart your programming journey.",
    author: "Hodan Tech",
    date: "2025-12-15",
    readTime: "6 min read",
    category: "Python",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    views: 1245,
  },
  
  {
    id: 3,
    title: "Benefits of AI in Everyday Life for Women",
    excerpt:
      "How AI can change the way we work, learn, and live daily.",
    author: "LeyloDev",
    date: "2025-10-10",
    readTime: "5 min read",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    views: 1873,
  },
];

const categories = ['All', 'Featured', 'Python', 'AI', 'Inspiration'];

/* ================= COMPONENT ================= */
const Blog = ({
  showHero = true,
  showHeading = false,
  showFilters = true,
  showCTA = true,
  limit = null,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let list = [...blogPosts];

    if (activeCategory === 'Featured') {
      list = list.filter(p => p.featured);
    } else if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  }, [activeCategory, searchQuery, limit]);

  return (
    <div className="bg-gray-50">

      {/* ================= HERO (BLOG PAGE ONLY) ================= */}
      {showHero && (
        <section className="relative py-20 md:py-28 flex items-center justify-center px-6 md:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-tech/20 via-white to-primary-tech/20" />
          <div className="relative z-10 max-w-6xl w-full text-center space-y-6">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-tech/10 text-primary-tech font-semibold uppercase">
              Our Blog
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-navy">
              Jazeera ICT Girls Blog
            </h1>

            <p className="text-lg md:text-xl text-primary-navy/80 max-w-4xl mx-auto">
              Stories, tutorials, and inspiration from Somali women in technology.
            </p>
          </div>
        </section>
      )}

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto max-w-7xl px-4 py-16">

        {/* ================= SECTION HEADING (HOME PREVIEW) ================= */}
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-tech/10 text-primary-tech font-semibold uppercase tracking-wider mb-6">
              <span className="w-3 h-3 rounded-full bg-primary-tech animate-pulse" />
              From Our Blog
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-navy">
              Latest Articles
            </h2>

            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-primary-navy/80 max-w-3xl mx-auto">
              Learn, grow, and get inspired by stories from Somali women in tech.
            </p>
          </motion.div>
        )}

        {/* ================= FILTERS ================= */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-12 space-y-6">
            <div className="relative max-w-xl">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-tech outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <HiFilter className="text-gray-500" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium ${
                    activeCategory === cat
                      ? 'bg-primary-tech text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= GRID ================= */}
        <AnimatePresence>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <motion.article
                key={post.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <HiCalendar /> {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary-navy">
                    <Link to={`/blog/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-700 line-clamp-3">
                    {post.excerpt}
                    
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="flex items-center gap-2 text-sm">
                      <HiUser /> {post.author}
                    </span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ================= CTA ================= */}
        {showCTA && (
          <div className="mt-24 bg-primary-navy text-white rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join the community and publish your first article today.
            </p>
            <Link
              to="/community"
              className="inline-flex items-center gap-3 bg-white text-primary-navy px-10 py-4 rounded-xl font-bold shadow-lg"
            >
              Join & Write <HiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
