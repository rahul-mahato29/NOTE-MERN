import SingleNote from "./SingleNote";

const Notes = ({note, removeNote, handleNoteClick} : any) => {
    return (
        <section className="border-2 border-black grow m-1 pt-2 flex justify-center gap-4 flex-wrap">
            {note.map((task : any) => {
               return <SingleNote key={task.id} {...task} removeNote={removeNote} handleNoteClick={handleNoteClick} />
            })}
        </section>
    )
}

export default Notes;