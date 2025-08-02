import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Note not found or failed to fetch!");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note? 🗑️")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted 💨");
      navigate("/");
    } catch (error) {
      console.error("Error deleting the note:", error);
      toast.error("Failed to delete the note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please enter both title and content!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated! ✨");
      navigate("/");
    } catch (error) {
      console.error("Error saving the note:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-lemon flex items-center justify-center text-yellow-600">
        <LoaderIcon className="animate-spin size-10" />
        <span className="ml-2 text-lg font-semibold">Fetching your cute note...</span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-lemon flex items-center justify-center text-pink-600">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Oops! 🐾 No note found.</p>
          <Link to="/" className="btn btn-outline btn-warning">
            Go back to your notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-6 font-[Poppins]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost text-yellow-700 hover:bg-yellow-100">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Notes
          </Link>

          <button onClick={handleDelete} className="btn btn-outline btn-error">
            <Trash2Icon className="h-5 w-5 mr-1" />
            Delete Note
          </button>
        </div>

        <div className="card bg-white shadow-xl border-2 border-yellow-300">
          <div className="card-body space-y-4 animate-fade-in">
            <div className="form-control">
              <label className="label text-yellow-800 font-semibold">
                Title ✍️
              </label>
              <input
                type="text"
                className="input input-bordered border-yellow-400 focus:border-yellow-600"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label text-yellow-800 font-semibold">
                Content 📝
              </label>
              <textarea
                className="textarea textarea-bordered border-yellow-400 focus:border-yellow-600 h-40"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-success bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes 💾"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
