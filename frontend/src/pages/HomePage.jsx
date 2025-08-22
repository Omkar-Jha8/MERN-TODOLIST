import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitUI from "../components/RateLimitUI"
import api from "../lib/axios.js"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard.jsx"
import NoteNotFound from "../components/NoteNotFound.jsx"
import { LoaderIcon } from "lucide-react"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Something went wrong")
        if (error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed To Load notes")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
          </div>
        )}
      </div>
      {!loading && notes.length == 0 && !isRateLimited && <NoteNotFound />}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {notes.map(note => (
            <div>
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
