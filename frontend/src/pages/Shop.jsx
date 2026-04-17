import React, { useState } from "react";
import blogPosts from "../data/blogData";

const Shop = () => {
  const products = blogPosts[0].products || [];

  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sendToWhatsApp = (product) => {
    const phone = "25261XXXXXXX"; // 🔥 CHANGE THIS
    const message = `Hello Sukyna 💖

I want to order:
Product: ${product.name}
Price: $${product.price}

Please confirm availability.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#fafafa] min-h-screen">

      {/* ================= HERO ================= */}
      <div className="bg-black text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-wide">
          Sukyna Luxury Store
        </h1>
        <p className="mt-4 text-gray-300">
          Discover handmade beauty, gifts & elegance ✨
        </p>

        <a
          href="https://wa.me/25261XXXXXXX"
          target="_blank"
          className="inline-block mt-6 bg-green-500 px-6 py-3 rounded-xl font-semibold"
        >
          Chat on WhatsApp 💬
        </a>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={product.image}
                className="h-56 w-full object-cover"
              />

              {/* BADGE */}
              <span className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full">
                Seen in Blog
              </span>

              {/* WISHLIST */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 text-xl"
              >
                {wishlist.includes(product.id) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-lg">{product.name}</h3>

              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">
                  ${product.price}
                </p>

                {/* REVIEWS */}
                <div className="text-yellow-400 text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => sendToWhatsApp(product)}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-80"
              >
                Order on WhatsApp 📦
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Shop;