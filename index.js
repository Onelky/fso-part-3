const express = require('express')
const service = require('./services')
const cors = require('cors')
const morgan = require('morgan');
const app = express();
morgan.token('content', (req, res) =>  JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
app.use(express.json());
app.use(cors())

app.get('/api/persons', async(req, res) => {
    res.json(await service.getPersons());
})

app.post('/api/persons', async(req, res) => {
    try {
        res.json(await service.addPerson(req.body));
    }
    catch (e) {
        res.status(400).json(e);
    }
})

app.get('/api/persons/:id', async (req, res) => {
    const {id} = req.params;
    const person = await service.getPerson(id)
    if(!person){
        res.status(404).send(
            "<h2>Person not found.</h2>")
    }
    res.json(person);

})


app.delete('/api/persons/:id', async (req, res) => {
    const {id} = req.params;
    const person = await service.getPerson(id)
    if(!person){
        res.status(404).send(
            "<h2>Person not found.</h2>")
    }
    try{
        await service.deletePerson(id)
        res.json(person);
    }
    catch (error) {
        res.status(400).send(
            "<h2>Something went wrong.</h2>")
    }

})


app.get('/info', (req, res) => {
    res.set('Content-Type', 'text/html');
    const html = `<p>Phonebook has info of ${service.getTotalPersons()} people</p>
              <p>${new Date()}</p>`;
    res.send(Buffer.from(html));
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
