import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import catImg from "../assets/createpagecat.png";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required 🐱");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });

      toast.success("Note created successfully! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Whoa there! Too fast 🐾", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note 😿");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-yellow-100 shadow-xl relative">
            {/* Cat image in top right */}
            <img
              src={catImg}
              alt="Sleeping Cat"
              className="absolute top-4 right-4 w-24 h-24 object-contain opacity-90 pointer-events-none"
            />

            <div className="card-body">
              <h2 className="card-title text-3xl mb-4 font-bold text-orange-700">
                Create a New Note 📝
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium text-orange-800">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cat Thoughts of the Day"
                    className="input input-bordered bg-white text-orange-900"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium text-orange-800">Content</span>
                  </label>
                  <textarea
                    placeholder="Start scribbling your whisker-worthy ideas..."
                    className="textarea textarea-bordered bg-white text-orange-900 h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end mt-2">
                  <button
                    type="submit"
                    className="btn bg-orange-300 hover:bg-orange-400 text-orange-900 font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Creating... 🐾" : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
