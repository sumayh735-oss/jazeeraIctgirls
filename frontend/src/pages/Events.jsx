import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import eventsData from "../data/eventsData";

export default function Events() {
  const navigate = useNavigate();

  const [year, setYear] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // years
  const years = ["All", ...new Set(eventsData.map(e => e.year))];

  // filter
  const finalData = useMemo(() => {
    const filtered =
      year === "All"
        ? eventsData
        : eventsData.filter(e => e.year === year);

    return filtered.filter(e =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [year, search]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-900 dark:to-black py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white">
          Events Hub
        </h1>

        <p className="text-blue-600 dark:text-gray-300 mt-3">
          Explore events by year 📅
        </p>

        {/* SEARCH */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90%] md:w-[500px] px-5 py-3 rounded-full border shadow-sm 
            dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 🔥 YEARS */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 flex-wrap">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-5 py-2 rounded-full transition
              ${
                year === y
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : finalData.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            No events found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalData.map(event => (
              <Tilt key={event.id} glareEnable glareMaxOpacity={0.2}>
                <motion.div
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="cursor-pointer bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src={event.image}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold">
                      {event.title}
                    </h3>

                    <p className="text-sm opacity-80">
                      {event.excerpt}
                    </p>

                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full dark:bg-blue-900">
                      {event.year}
                    </span>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}