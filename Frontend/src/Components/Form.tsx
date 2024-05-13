const Form = ({ title, setTitle, description, setDescription, addNote, selectedNote, updateNote, handleCancel }: any) => {


    //handleSubmit
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !description) {
            alert("Required Both Field");
            return; 
        }

        try {
            const note = await fetch('http://localhost:5000/api/postnote',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        description
                    })
                }
            ).then((res) => res.json());

            addNote(note);
            setTitle("");
            setDescription("");
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <section className="border-2 border-black m-1 p-1">
            <form className="flex flex-col w-64" onSubmit={handleSubmit}>
                <input
                    className="m-2 border-2 border-black p-1 rounded"
                    type="text"
                    name=""
                    id=""
                    placeholder="Title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <textarea
                    className="m-2 border-2 border-black rounded p-1 resize-none"
                    name=""
                    id=""
                    rows={10}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                ></textarea>
                {selectedNote ? (
                    <div className="flex justify-between">
                        <button className="border-2 border-black m-2 mt-1 p-1 text-md bg-green-400 hover:bg-blue-500 rounded grow" type="submit" onClick={() => { updateNote() }}>Save</button>
                        <button className="border-2 border-black m-2 mt-1 p-1 text-md bg-red-400 hover:bg-red-500 rounded grow" type="submit" onClick={() => { handleCancel() }}>Cancle</button>
                    </div>
                ) : (
                    <button className="border-2 border-black m-2 mt-1 p-1 text-md bg-blue-400 hover:bg-blue-500 rounded" type="submit">Add Note</button>
                )}
            </form>
        </section>
    )
}

export default Form;