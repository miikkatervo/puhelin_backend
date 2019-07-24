const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
const tinyLogger = app.use(morgan('tiny'))
app.use(cors())

let persons = [

 {
   "name": "Miikka Tervo",
   "number": "0451224951",
   "id": 1
    },
    {
    "name": "Jarmo Tervo",
    "number": "06043211",
    "id": 2
    },
    {
        "name": "Snoop Dogg",
        "number": "009993211",
        "id": 3
    },{
        "name": "Johannes Tervo",
        "number": "06043987",
        "id": 4
    }
    
]

app.get('/api/persons', (req, res) => {
    tinyLogger
    res.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
  tinyLogger
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(p)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
    tinyLogger
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

  const generateId = () => {
    min = Math.ceil(1);
    max = Math.floor(100);
    return Math.floor(Math.random() * (max - min)) + min
  }
  
  app.post('/api/persons', (request, response) => {
    tinyLogger
    const body = request.body
    const old = persons.map(p => p.name).includes(body.name)
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    } else if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    } else if (old) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

app.get('/api/info', (req, res) => {
  res.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</div>`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
