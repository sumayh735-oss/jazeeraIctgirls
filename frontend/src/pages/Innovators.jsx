import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import blogPosts from "../data/blogData";
import axios from "axios";

export default function Innovators() {
  const navigate = useNavigate();

  // 🔥 STATES
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // 🔥 LOCAL DATA (Sukyna from blog)
  const sukyna = blogPosts.find((p) => p.id === 1);

  // 🔥 LOAD DATA (API + fallback)
  useEffect(() => {
    axios
      .get("/api/innovators")
      .then((res) => setData(res.data))
      .catch(() => {
        // fallback haddii backend ma jiro
        setData([
          {
            id: sukyna?.id,
            title: sukyna?.title,
            image: sukyna?.image,
            excerpt: sukyna?.excerpt,
            category: "Others",
          },
        ]);
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  // 🔥 CATEGORIES
  const categories = [
    "All",
    "Web Development",
    "AI",
    "Mobile App Development",
    "Others",
  ];

  // 🔥 FILTER + SEARCH
  const finalData = useMemo(() => {
    const filtered =
      activeTab === "All"
        ? data
        : data.filter((item) => item.category === activeTab);

    return filtered.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeTab, search, data]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition">

        {/* 🔥 HERO HEADER */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-900 dark:to-black py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white">
            Innovators Hub
          </h1>

          <p className="text-blue-600 dark:text-gray-300 mt-3">
            Stories, innovation & digital journeys 🚀
          </p>

          {/* SEARCH */}
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search innovators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[90%] md:w-[500px] px-5 py-3 rounded-full border shadow-sm 
              dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DARK TOGGLE */}
          <div className="mt-6">
           <button
  onClick={() => setDark(!dark)}
  className="fixed top-6 right-6 px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg z-50"
>
  {dark ? "☀️" : "🌙"}
</button>
          </div>
        </div>

        {/* 🔥 FILTER TABS */}
        <div className="max-w-7xl mx-auto px-6 py-8 overflow-x-auto">
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap transition
                  ${
                    activeTab === cat
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 dark:bg-gray-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 CONTENT */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {loading ? (
            // 🔥 SKELETON
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 dark:bg-gray-800 h-80 rounded-3xl"
                />
              ))}
            </div>
          ) : finalData.length === 0 ? (
            <div className="text-center py-20 opacity-70">
              No innovators found
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {finalData.map((item) => (
                  <Tilt
                    key={item.id}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    scale={1.05}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -10 }}
                      className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 cursor-pointer bg-white dark:bg-gray-900"
                      onClick={() => navigate(`/innovators/${item.id}`)}
                    >
                      {/* IMAGE */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>

                      {/* CONTENT */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold">
                          {item.title}
                        </h3>

                        <p className="text-sm opacity-80 line-clamp-2">
                          {item.excerpt}
                        </p>

                        <div className="flex justify-between items-center pt-3">
                          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {item.category}
                          </span>

                          <span className="text-blue-600 font-semibold">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}