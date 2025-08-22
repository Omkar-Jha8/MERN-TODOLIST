import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios.js"
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast"

const NoteDetailPage = (props) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("Something Went Wrong")
      } finally {
        setLoading(false);
      }
    }
    fetchNote()

  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }
  const handleDelete = async () => { 
    if(!window.confirm("Are You Want to delete this note")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Deleted Successfully")
      navigate("/")
    } catch (error) {
      toast.error("Something Went Wrong")
    } finally {
      setSaving(false)
    }
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title or content");
      return;
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`,note)
      navigate("/")
      toast.success("Note Update Successfully")
    } catch (error) {
      toast.error("Something Went Wrong")
    } finally{
      setSaving(false)
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back To Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" id={id}>
              <Trash2Icon className="h-5 w-5" /> Delete This Note
            </button>
          </div>
          <div>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Edit Note</h2>
                <form>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Note Title"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) => setNote({...note, title:e.target.value})}
                    />

                    <label className="label mt-6">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Write Your Content here..."
                      className="textarea textarea-bordered h-32"
                      value={note.content}
                      onChange={(e) => setNote({...note, content:e.target.value})}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "Saving..." : "Save Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
