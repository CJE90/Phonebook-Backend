const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
else {
    const password = process.argv[2]

    const url =
        `mongodb+srv://fullstack:${password}@cluster0.yjhfi.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose.connect(url)
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)
    console.log(`length of arguments`, process.argv.length)
    if (process.argv.length == 3) {
        Person.find({}).then(result => {
            console.log(`phonebook:`)
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
    }
    else {
        const name = process.argv[3];
        const number = process.argv[4];

        const person = new Person({
            name: name,
            number: number
        })

        person.save().then(result => {
            console.log('person saved!')
            mongoose.connection.close()
        })
    }

}