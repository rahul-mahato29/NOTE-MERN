import { useEffect, useState } from "react"
import Form from "./Components/Form"
import Notes from "./Components/Notes"

//Define the type of array
type Note = {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [note, setNote] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  //fetching data from api
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getnotes").then((res) => res.json());
      // console.log("resonse : ", response);
      setNote(response);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  //add note
  function addNote(val: Note): void {
    setNote([...note, val])
  }

  //remove note
  async function removeNote(id: Number) {

    try{
      await fetch(`http://localhost:5000/api/deletenote/${id}`, 
        {
          method: "DELETE",
        }
      )
    }
    catch(e) {
      console.log(e);
    }

    const filteredNote = note.filter((info) => {
      if (info.id !== id) {
        return info;
      }
    });
    setNote(filteredNote);
  }

  //handleClick
  function handleNoteClick(notes: Note) {
    setSelectedNote(notes);
    setTitle(notes.title);               //This will updated form title
    setDescription(notes.description);   //This will updated form description
  }

  //Update note
  async function updateNote() {
    if (!selectedNote) return;

    //now no-need to use this commented updatedNote function, because now we are handling everything from backend
    // const updatedNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   description: description
    // }
    try {
      const updatedNote = await fetch(`http://localhost:5000/api/updatenote/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
          })
        }

      ).then((res) => res.json());

      const updatedNoteList = note.map((info) => {
        return info.id === selectedNote.id ? updatedNote : info
      })
      // console.log("Testing : ", updatedNoteList);

      setNote(updatedNoteList);
      setTitle("");
      setDescription("");
      setSelectedNote(null);
    }
    catch(e) {
      console.log(e);
      
    }
  }

  //handleCancel
  function handleCancel() {
    setTitle("");
    setDescription("");
    setSelectedNote(null);
  }


  return (
    <main className="flex">
      <Form title={title} description={description} setTitle={setTitle} setDescription={setDescription} addNote={addNote} selectedNote={selectedNote} updateNote={updateNote} handleCancel={handleCancel} />
      <Notes note={note} removeNote={removeNote} handleNoteClick={handleNoteClick} />
    </main>
  )
}

export default App
