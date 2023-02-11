import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'

export default function OneNote(props) {
    
  const notes = useContext(NoteContext);

  const {note, updatenote} = props;
  return (
             <div className="card p-4 m-4 shadow">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{note.tag}, published on {note.date}</h6>
                  <p className="card-text">{note.description}</p>
                  <i className="fa-solid fa-calendar-xmark" onClick={()=>{notes.deletenote(note._id)}}></i>
                  <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{updatenote(note)}}></i>
                </div>
              </div>
  )
}
