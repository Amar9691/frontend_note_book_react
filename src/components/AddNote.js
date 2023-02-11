import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = ()=> {

  const note = useContext(NoteContext);
  const [newnode,setNewNode] = useState({title:"",description:"",tag:""}); 
  const handleAdd = (e)=>{
     e.preventDefault();
    note.addnote(newnode.title,newnode.description,newnode.tag);
    setNewNode({title:"",description:"",tag:""});

  }

  const valuechange = (e)=>{
      setNewNode({...newnode, [e.target.name]: e.target.value});
  }
  return (
    <div className='container p-4 mt-4'>
    <h4 className='text-center text-primary'>Add New Note</h4>
    <form>
      <div className="mb-3">
        <label htmlFor="note-title" className="form-label">Title <span className="text-danger">*</span></label>
        <input type="text" onChange={valuechange} value={newnode.title} required minLength={5} name="title" className="form-control" id="title" aria-describedby="noteTitle" />
        <div id="title" className="form-text">Please give valid title to make best note </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description <span className='text-danger'>*</span></label>
        <textarea id="description" value={newnode.description} required minLength={25} onChange={valuechange} className='form-control' name="description" placeholder='Write Something About notes'></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="note-tag" className="form-label">Tag </label>
        <input type="text" value={newnode.tag} onChange={valuechange}  minLength={5} className="form-control" name="tag" id="tag" aria-describedby="noteTag" />
        <div id="tag" className="form-text">Please give valid tag to make note more searchable</div>
      </div>
      <button disabled={newnode.title.length < 5 || newnode.description.length < 25|| newnode.tag.length < 5 } type="submit" className="btn btn-primary" onClick={handleAdd}>Submit</button>
    </form>

  </div>
  )
}

export default AddNote