import { useState } from "react";

const SingleNote = ({id, title, description, removeNote, handleNoteClick} : any) => {

    const [option, setOption] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>("");

    function addOption(){
        if(selectedOption === "" || selectedOption === "...")
            setSelectedOption("📌")
        else    
            setSelectedOption("...")

        setOption(false);
    }

    return (
        <article className="border-2 border-black m-1 bg-white w-72 h-64 rounded p-1 cursor-pointer" onClick={() => handleNoteClick({id, title, description})}>
            <div className="flex justify-between">
                <h2 className="font-bold text-xl m-2">{title}</h2>
                <div>
                    <span className="font-extrabold p-1 pr-2 cursor-pointer" onClick={(e : React.MouseEvent) => {e.stopPropagation(), setOption(!option)}}>{selectedOption === "" ? "..." : selectedOption}</span>
                    {option && <div className="absolute flex gap-1 bg-white border-2 border-black rounded cursor-pointer mt-1">
                        <ul className="text-md border-r-2 border-gray-400 pr-1 pl-1 hover:text-xl hover:p-0 hover:pr-1" onClick={(e : React.MouseEvent) => {e.stopPropagation(), addOption()}}>📌</ul>
                        <ul className="text-sm p-1 hover:text-xl hover:p-0" onClick={(e : React.MouseEvent) => {e.stopPropagation(), removeNote(id)}}>❌</ul>
                    </div>}
                </div>
            </div>
            <p className="m-2 text-gray-600">{description}</p>
        </article>
    )
}

export default SingleNote;