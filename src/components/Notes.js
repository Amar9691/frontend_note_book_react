import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import OneNote from './OneNote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {

  const navigate  = useNavigate();

  const note = useContext(NoteContext);
  const [newnode,setNewNode] = useState({etitle:"",edescription:"",etag:"",id:""}); 
  const { notes, getallnotes } = note;
  
 

  useEffect(() => {
    
    if(localStorage.getItem('token'))
    { 
      getallnotes();

    }
    else
    {
      navigate('/login');
    }
   
  }, []);

  const ref = useRef(null);
  const cM = useRef(null);


  const handleUpdate = (e)=>{
    e.preventDefault();

    cM.current.click();
    note.updatenote(newnode.etitle,newnode.edescription,newnode.etag,newnode.id);
    props.showAlert("Note updated Successfully","success");
  };
   
  const changehandle = (e)=>{

          setNewNode({...newnode,[e.target.name]: e.target.value});
  };

   const updatenote = (currentNote)=>{
           
          ref.current.click();
          setNewNode({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag,id:currentNote._id}); 

   };


  return (
    <>
      <AddNote />

   <button  style={{display:'none'}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Open modal
  </button>
   <div className="modal" id="myModal">
   <div className="modal-dialog">
   <div className="modal-content">
   <div className="modal-header">
        <h4 className="modal-title">Edit Note Information</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
    </div>

      <div className="modal-body">
      <form>
      <div className="mb-3">
        <label htmlFor="note-title" className="form-label">Title <span className="text-danger">*</span></label>
        <input type="text" onChange={changehandle} value={newnode.etitle}  name="etitle" className="form-control" id="title" aria-describedby="noteTitle" />
        <div id="etitle" className="form-text">Please give valid title to make best note </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description <span className='text-danger'>*</span></label>
        <textarea id="edescription"  onChange={changehandle}  value={newnode.edescription} className='form-control' name="edescription" placeholder='Write Something About notes'></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="note-tag" className="form-label">Tag </label>
        <input type="text"  onChange={changehandle} value={newnode.etag} className="form-control" name="etag" id="etag" aria-describedby="noteTag" />
        <div id="tag" className="form-text">Please give valid tag to make note more searchable</div>
      </div>
      <button disabled={newnode.etitle.length < 5 || newnode.edescription.length < 25|| newnode.etag.length < 5 } type="submit" className="btn btn-primary" onClick={handleUpdate}>Submit</button>
    </form>
      </div>

      <div className="modal-footer">
        <button type="button"  ref={cM} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
      <div className="container p-4 mt-4">
        <div className="card card-muted shadow">
          <div className="card-header">
            <h4 className="text-primary text-left">Your Notes List</h4>
          </div>
          <div className="card-body">
            {notes && notes.length === 0  && "No records found"}
            {notes.map((element) => {
              return (<OneNote key={element._id} note={element} updatenote={updatenote} />);
            })}

          </div>
        </div>
      </div>
    </>
  )
}
