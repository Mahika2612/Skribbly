import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import React from "react";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect is running");
    const fetchNotes = async () => {
 fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => console.log('Dummy fetch successful', response)).catch(error => console.error('Dummy fetch failed', error));
 console.log(api);
      try {
        console.log("fetchNotes is running");
 console.log("Attempting to fetch notes...");
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
 console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
        console.log("fetchNotes finished");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading your scribbles...
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
