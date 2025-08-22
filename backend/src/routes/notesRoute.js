import express from "express"
import {getAllNotes} from "../controllers/notesController.js"
import {createNote} from "../controllers/notesController.js"
import {editNote} from "../controllers/notesController.js"
import {deleteNote} from "../controllers/notesController.js"
import {getOneNote} from "../controllers/notesController.js"



const router = express.Router();

router.get('/',getAllNotes)
router.get('/:id',getOneNote)
router.post('/',createNote)
router.put('/:id',editNote)
router.delete('/:id',deleteNote)

export default router;



