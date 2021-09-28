
const express = require('express')
const models = require('./models')
const cors = require('cors')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = 10

app.use(express.json())
app.use(cors())

//***************************Registration Page*******************************//

app.post('/api/register', async( req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const name = req.body.name
    const password = req.body.password
    const token = req.body.token

    const persistedUser = await models.Users.findOne({
        where: {
            name: name
        }
    })

    if (persistedUser == null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            console.log(hash)
            if (error) {
                res.json({ message: "Something Went Wrong!!!" })
            } else {
                const user = models.Users.build({
                    name: name,
                    password: hash,
                    first_name: firstName,
                    last_name: lastName,
                    token: token
                })

                let savedUser = await user.save()
                if (savedUser != null) {
                    res.json({ success: true })
                }
            }
        })
    } else {
        res.json({ message: " Sorry This UserName Already Exists." })

    }
})

//*************************************Login Page****************************//

app.post('/api/login', async (req, res) => {

    const name = req.body.name
    const password = req.body.password

    let user = await models.Users.findOne({
        where: {
            name: name,

        }
    })
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                const token = jwt.sign({ name: user.name }, "SECRET KEY")
                res.json({ success: true, token: token })
            }else {
                res.json({ success: false, message: 'Not Authenticated' })
            }
        })
        }else {
            res.json({message: "Username Incorrect"})
        }
    
})

//*******************************Profile Page********************************//

//**************Get User Info***************//

app.get('/api/user/:userId',(req, res) => {
    
    const userId = parseInt(req.params.userId)

     models.Users.findOne({ 
         where: { 
             id : userId
            }
        }).then(user =>{
        res.json(user)
    })
})


//*****************Delete User*********************//

app.delete('/api/user/:userId', (req, res) => {

    const userId = parseInt(req.params.userId)

    models.Users.destroy({
        where: {
            id: userId
        }
    }).then(_ => {
        res.json({ message: "THEY GONE" })
    })
})



//*********************************Home Page*********************************//

//Retrieve All things From DataBase
app.get('/api/things',(req,res) =>{
    models.Things.findAll({})
    .then(things =>{
        res.json(things)
    })
})

//Add Things To DataBase
app.post('/api/things',(req, res) => {
    const name = req.body.name
    const duedate = req.body.duedate
    const description = req.body.description
    const priority = req.body.priority
    const link = req.body.link

    const thing = models.Things.build({
        name: name,
        duedate: duedate,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        description: description,
        priority: priority
    })

    thing.save()
    .then(savedThing =>{
        res.json({success: true, thingId: savedThing.id})
    })
    
})

//Delete Based On Id In Primary Key In DataBase
app.delete('/api/things/:thingId', (req, res) => {

    const thingId = parseInt(req.params.thingId)

    models.Things.destroy({
        where: {
            id: thingId
        }
    }).then(_ => {
        res.json({ message: "IT GONE" })
    })
})

app.listen(8080,(req,res) =>{
    console.log('Server Is Running....')
})
