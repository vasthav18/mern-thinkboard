import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-md py-16 mx-auto space-y-6 text-center">
      <div className="p-8 rounded-full bg-primary/10">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to="/create" className="btn btn-primary">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;