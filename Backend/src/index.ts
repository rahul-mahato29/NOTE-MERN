import express from 'express';
import cors from 'cors';
import {PrismaClient} from "@prisma/client";
const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.get('/api/getnotes', async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
})

app.post('/api/postnote', async (req, res) => {
    const {title, description} = req.body;

    if(!title || !description){
        return res.status(400).send("title and description requried");
    }

    try{
        const note = await prisma.note.create({
            data: {title, description},
        });  
        res.json(note)
    }
    catch(e) {
        res.status(500).send("Something went wrong")
    }
})

app.put('/api/updatenote/:id', async (req, res) => {
    const {title, description} = req.body;
    const id = parseInt(req.params.id);

    if(!title || !description) {
        return res.status(400).send("title and description required")
    }

    if(!id || isNaN(id)){
        return res.status(400).send("ID must be a valid numbers")
    }

    try {
        const updateNote = await prisma.note.update({
            where: {id},
            data: {title, description},
        });

        res.json(updateNote);
    }
    catch(e) {
        res.status(500).send("Oops, Something went wrong");
    }
})

app.delete('/api/deletenote/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)){
        return res.status(400).send("Id must be valid integer");
    }

    try{
        await prisma.note.delete({
            where: {id},
        });
        res.status(204).send("Note Deleted");
    }
    catch(error) {
        res.status(500).send("Oops, Something went wrong");
    }
})

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})