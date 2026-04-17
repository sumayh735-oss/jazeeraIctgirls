import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import blogPosts from "../data/blogData";

const Blog = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* 🔥 HERO */}
      <div className="relative py-24 text-center overflow-hidden">

        {/* LIGHT BLUR BG */}
        <div className="absolute inset-0 bg-blue-200/30 backdrop-blur-3xl pointer-events-none" />

        <h1 className="relative text-5xl md:text-6xl font-black text-blue-900">
          Jazeera ICT Girls Blog
        </h1>

        <p className="relative mt-4 text-blue-700 max-w-2xl mx-auto">
          Stories, inspiration & digital journeys from women in tech ✨
        </p>
      </div>

      {/* 🔍 SEARCH */}
      <div className="max-w-4xl mx-auto px-4">
        <input
          type="text"
          placeholder="Search blog..."
          className="w-full px-6 py-4 rounded-2xl border border-blue-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

   {filtered.map((post) => (
  <Link to={`/blog/${post.id}`} key={post.id}>
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-blue-100 cursor-pointer"
    >

      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={post.image}
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">

        <h2 className="font-bold text-lg group-hover:text-blue-600">
          {post.title}
        </h2>

        <p className="text-blue-700 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex justify-between text-sm text-blue-500 pt-3 border-t">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>

      </div>
    </motion.div>
  </Link>
))}

      </div>
    </div>
  );
};

export default Blog;