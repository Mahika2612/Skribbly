import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";
import nonotecat from "../assets/nonotecat.png";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6 max-w-md mx-auto text-center bg-white rounded-2xl shadow-md border-4 border-yellow-300">
      <img
        src={nonotecat}
        alt="Confused Cat"
        className="w-28 h-28 object-contain animate-bounce"
      />

      <div className="bg-yellow-100 rounded-full p-4 border-2 border-yellow-300">
        <NotebookIcon className="size-8 text-yellow-500" />
      </div>

      <h3 className="text-2xl font-bold text-yellow-700">No notes yet</h3>

      <p className="text-yellow-600">
        That’s a lot of nothing... Wanna start scribbling?
      </p>

      <Link
        to="/create"
        className="btn bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-200"
      >
        📝 Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
