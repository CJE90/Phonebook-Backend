const express = require('express')
const app = express();
const morgan = require('morgan')
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);
morgan.token("data", (req, res) => {
    const { body } = req;

    return JSON.stringify(body);
});

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

let people = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Well, Where do you want to go?</h1>')
})

app.get('/api/people', (request, response) => {
    response.json(people)
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = people.find(person => person.id === id);
    if (person) {
        response.json(person)
    } else {
        response.status(404).end();
    }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    people = people.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    let min = 0;
    let max = 1000000;
    return Math.round(getRandomArbitrary(min, max));
}

app.post('/api/people', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (people.find(p => p.name === person.name)) {
        return response.status(400).json({
            error: 'Person Already Exists'
        })
    }

    const randId = generateId();

    person.id = randId;
    people = people.concat(person)
    console.log(people);
    response.json(people)
})

app.get('/api/info', (request, response) => {
    const date = new Date().toDateString();
    const time = new Date().toTimeString();

    response.write(`<p>Phonebook contains info for ${people.length} people</p>`)
    response.write(date + " " + time);
    response.send();

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})