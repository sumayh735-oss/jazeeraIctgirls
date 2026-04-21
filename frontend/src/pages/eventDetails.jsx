import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../data/eventsData";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find(e => e.id === Number(id));

  if (!event) return <div className="p-10">Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">

      {/* HERO */}
      <div className="relative h-[60vh]">
        <img src={event.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold text-center px-4">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">

        <button
          onClick={() => navigate(-1)}
          className="text-blue-600"
        >
          ← Back
        </button>

        <p className="text-lg leading-8">
          {event.content}
        </p>

        {/* GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {event.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}