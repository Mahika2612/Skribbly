import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import React from "react";
import homepageCat from "../assets/homepagecat.png";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-yellow-50 via-orange-50 to-yellow-100 transition-all duration-300">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      {/* 🐱 Animated Cat Image */}
      <img
        src={homepageCat}
        alt="Snoozing cat"
        className="absolute bottom-4 right-4 w-[260px] z-0 opacity-90 animate-float pointer-events-none drop-shadow-md"
      />

      <div className="max-w-7xl mx-auto p-4 mt-6 relative z-10">
        {loading && (
          <div className="text-center text-primary py-10 text-lg animate-pulse">
            Loading your scribbles...
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
            </div>

      <footer className="w-full text-center py-6 text-sm text-gray-600 z-10 relative">
        © {new Date().getFullYear()} Skribbly by Mahika Das. All rights reserved.
      </footer>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>

  );
};

export default HomePage;
