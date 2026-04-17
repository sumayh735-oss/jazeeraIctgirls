import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogPosts from "../data/blogData";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.id === Number(id));

  const [showAllImages, setShowAllImages] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  if (!post) return <div className="p-10">Post not found</div>;

  const categories = [
    { name: "Gift Sets", icon: "🎁" },
    { name: "Decorations", icon: "🎈" },
    { name: "Jewelry", icon: "💎" },
    { name: "Candles", icon: "🕯️" }
  ];

  const categoryCovers = {
    "Gift Sets": post.images[0],
    "Decorations": post.images[1],
    "Jewelry": post.images[2],
    "Candles": post.images[3]
  };

  // 🔥 TEXT SUMMARY (first 150 chars)
  const shortText = post.content.slice(0, 150) + "...";

  // 🔥 LIMIT GALLERY (8 images first)
  const visibleImages = showAllImages
    ? post.images
    : post.images.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO */}
      <div className="relative h-[60vh]">
        <img src={post.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* 🔥 CONTENT (SUMMARY + READ MORE) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <p className="text-gray-700 leading-8 text-lg">
            {showFullText ? post.content : shortText}
          </p>

          <button
            onClick={() => setShowFullText(!showFullText)}
            className="mt-4 text-blue-600 font-semibold"
          >
            {showFullText ? "Show Less" : "Read More"}
          </button>
        </motion.div>

        {/* 🔥 GALLERY (SMALL + SEE MORE) */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleImages.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl h-36 w-full object-cover shadow-md"
              />
            ))}
          </div>

          {/* SEE MORE BUTTON */}
          {post.images.length > 8 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllImages(!showAllImages)}
                className="bg-primary-navy text-white px-6 py-2 rounded-xl shadow"
              >
                {showAllImages ? "Show Less" : "See More"}
              </button>
            </div>
          )}
        </div>

        {/* 🔥 CATEGORY CARDS */}
        {/* 🔥 DIRECT PRODUCTS (NO CATEGORY CLICK) */}
{/* 🔥 DYNAMIC PRODUCTS */}
{post.products && (
  <div>
    <h2 className="text-2xl font-bold mb-8">
      Our Products ✨
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {post.products.map(product => {

        const [activeIndex, setActiveIndex] = useState(0);
        const active = product.variations?.[activeIndex];

        if (!active) return null;

        return (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            {/* 🔥 MAIN IMAGE */}
            <img
              src={active.image}
              className="h-56 w-full object-cover"
            />

            {/* 🔥 THUMBNAILS */}
            <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">

              {product.variations.map((item, i) => (
                <img
                  key={i}
                  src={item.image}
                  onClick={() => setActiveIndex(i)}
                  className={`h-14 w-14 object-cover rounded cursor-pointer border-2 shrink-0
                    ${activeIndex === i
                      ? "border-green-500"
                      : "border-gray-200"
                    }`}
                />
              ))}

            </div>

            {/* 🔥 CONTENT (DYNAMIC) */}
            <div className="p-5 space-y-3">

              <h3 className="font-bold text-lg">
                {active.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {active.Description}
              </p>

              <p className="font-semibold text-lg">
                ${active.price}
              </p>
    
              {/* 🔥 WHATSAPP */}
           <a
  href={`https://wa.me/252617567934?text=${encodeURIComponent(
    `Hello Sukyna 💖

I want to order:
Product: ${active.name}
Price: $${active.price}`
  )}`}
  target="_blank"
  rel="noreferrer"
  className="block text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
>
  Order on WhatsApp 📦
</a>

            </div>

          </motion.div>
        );
      })}

    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default BlogDetails;