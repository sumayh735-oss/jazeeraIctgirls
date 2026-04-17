import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../data/blogData";
import { motion } from "framer-motion";

const Categories = () => {
  const { name } = useParams();

  const fixedName = name.replace("-", " ");

  const products = blogPosts[0].products.filter(
    p => p.category.toLowerCase() === fixedName.toLowerCase()
  );

  const [activeItems, setActiveItems] = useState({});

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-10 text-center">
        {fixedName} ✨
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {products.map(product => {

          if (!product.variations || product.variations.length === 0) {
            return null;
          }

          const activeIndex = activeItems[product.id] || 0;
          const active = product.variations[activeIndex];

          // 🔥 scroll ref per product
          const scrollRef = useRef(null);

          const scroll = (dir) => {
            scrollRef.current.scrollBy({
              left: dir === "left" ? -150 : 150,
              behavior: "smooth"
            });
          };

          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              {/* 🔥 MAIN IMAGE */}
              <img
                src={active.image}
                className="h-56 w-full object-cover"
              />

              {/* 🔥 MODERN THUMBNAILS */}
              <div className="relative">

                {/* LEFT */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
                >
                  ←
                </button>

                {/* RIGHT */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
                >
                  →
                </button>

                {/* SCROLL */}
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scroll-smooth px-10 py-3"
                >
                  {product.variations.map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      onClick={() =>
                        setActiveItems(prev => ({
                          ...prev,
                          [product.id]: i
                        }))
                      }
                      className={`h-14 w-14 object-cover rounded-xl cursor-pointer border-2 transition shrink-0 ${
                        activeIndex === i
                          ? "border-green-500 scale-110"
                          : "border-gray-200 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>

                {/* GRADIENTS */}
                <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

              </div>

              {/* 🔥 CONTENT */}
              <div className="p-5 space-y-3">

                <h3 className="font-bold text-lg">
                  {active.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {active.description}
                </p>

                <p className="text-gray-800 font-semibold">
                  ${active.price}
                </p>

                <a
                  href={`https://wa.me/25261XXXXXXX?text=${encodeURIComponent(
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

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category
        </p>
      )}

    </div>
  );
};

export default Categories;