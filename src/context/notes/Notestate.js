import React, { useState }  from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
      
      const host = 'http://localhost:5000/api/notes';
      const noteinital = [];

      const getallnotes = async(req,res)=>{
                
        const response = await fetch(`${host}/getallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
        });

          const json  = await response.json();
          setNotes(json);
            
      }
      
    


      const [notes,setNotes] = useState(noteinital);

      const addnote = async(title,description,tag)=>{
      
       await fetch(`${host}/storenotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          body: JSON.stringify({title,description,tag}), 
        
        });

        getallnotes();
       
         
       

      };

      const deletenote  = async (id)=>{
                
        const response = await fetch(`${host}/delete_notes/${id}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
        
        });
       
         console.log(response.json());

         getallnotes();
         
   
      };
      
      const editnote = async (id)=>{

        const response = await fetch(`${host}/editnoteinfo/${id}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
        
        });
       
         console.log(response.json());

      };

      const updatenote  = async (title,description,tag,id)=>{
  
        const response = await fetch(`${host}/updatenotes/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({title,description,tag}), 
        
        
        });
       
         console.log(response.json());
         getallnotes();

      }

      return ( <NoteContext.Provider value={{notes, setNotes,addnote,deletenote,editnote,getallnotes,updatenote}}>
                        {props.children}
             </NoteContext.Provider>);


};

export default NoteState;