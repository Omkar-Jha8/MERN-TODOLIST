import { Link } from 'react-router'
import React from 'react'

const NoteNotFound = () => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold text-gray-700">
                    No Note Created
                </h2>
                <p className="text-gray-500">You haven’t created any notes yet.</p>
                <div className="card-actions mt-4">
                    <Link to="/create">
                        <button
                            className="btn btn-primary px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
                            Create Note
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default NoteNotFound
