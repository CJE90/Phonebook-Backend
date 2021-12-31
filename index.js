require('dotenv').config()
const express = require('express')
const app = express();
const morgan = require('morgan')
const People = require('./models/person')

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


app.get('/', (request, response) => {
    response.send('<h1>Well, Where do you want to go?</h1>')
})

app.get('/api/people', (request, response) => {
    People.find({}).then(people => {
        response.json(people)
    })
})


app.get('/api/people/:id', (request, response) => {
    People.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
    People.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/people', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new People({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson);
    })
})

app.put('/api/people/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    People.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    People.countDocuments({}).then(result => {
        const date = new Date().toDateString();
        const time = new Date().toTimeString();

        response.write(`<p>Phonebook contains info for ${result} people</p>`)
        response.write(date + " " + time);
        response.send();
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)