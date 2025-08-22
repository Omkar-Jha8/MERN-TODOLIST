import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formateDate } from "../lib/utils.js"
import api from "../lib/axios.js"
import toast from "react-hot-toast"

const NoteCard = (props) => {
    const handleDelete = async (e, id , setNotes) => {
        e.preventDefault();
        if (!window.confirm("Are You Sure To Delete This Note")) return;

        try {
            console.log(id);
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note Deleted Successfully");
        } catch (error) {
            toast.error("Something Went Wrong");    
        }
    }
    return (

        <Link
            to={`/note/${props.note._id}`}
            className='card bg-black hover:shadow-lg transition-all duration-200 border-t-4 border-solid rounded-none border-[#ff8860]'
        >
            <div className='card-body'>
                <h3 className='card-title text-base-content'>{props.note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{props.note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>{formateDate(new Date(props.note.createdAt))}</span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, props.note._id , props.setNotes)}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard
