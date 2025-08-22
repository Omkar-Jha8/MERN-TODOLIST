import Note from '../models/notes.js'

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getOneNote(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.json({ message: "Note Not Found" })
        }
        res.status(200).json(note)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content })

        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function editNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) {
            return res.status(404).json({ message: "Note Not Found" })
        }
        res.status(201).json(updatedNote)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) {
            return res.status(404).json({ message: "Note Not Found" })
        }
        res.status(201).json({ message: "Post Deleted Succussfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}