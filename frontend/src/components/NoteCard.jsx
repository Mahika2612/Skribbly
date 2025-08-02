import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import noteCat from "../assets/notecat.png"; // 🐱 Import your cat image
import React from "react";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="relative card bg-[#FEF9C3] text-[#2E1A47] hover:shadow-xl border-2 border-[#FDE68A] transition-transform hover:scale-[1.02] rounded-xl overflow-hidden"
    >
      {/* 🐱 Decorative corner cats */}
      <img src={noteCat} alt="cat" className="absolute top-1 left-1 w-6 h-6" />
      <img src={noteCat} alt="cat" className="absolute top-1 right-1 w-6 h-6 rotate-90" />
      <img src={noteCat} alt="cat" className="absolute bottom-1 left-1 w-6 h-6 -rotate-90" />
      <img src={noteCat} alt="cat" className="absolute bottom-1 right-1 w-6 h-6 rotate-180" />

      <div className="card-body p-4">
        <h3 className="card-title text-lg font-bold">{note.title}</h3>
        <p className="text-sm text-black/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-black/50">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-primary" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
