require('dotenv').config()
const express = require('express')
const models = require('./models')
const cors = require('cors')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('./middlewares/authMiddleware')
const salt = 10


app.use(express.json())
app.use(cors())

//***************************REGISTRATION PAGE***************************//

app.post('/api/register', async (req, res) => {

    
    const name = req.body.name
    const password = req.body.password
    const title = req.body.title
    const bio = req.body.bio
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
                    title: title,
                    bio: bio,
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

//***************************LOGIN PAGE***************************//

app.post('/api/login', async (req, res) => {

    const name = req.body.name
    const password = req.body.password

    let user = await models.Users.findOne({
        where: {
            name : name,
        }
    })

    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                const token = jwt.sign({ name: name }, "SECRETKEY")
                res.json({ success: true, token: token, name:name, user_id: user.id, title: user.title, bio: user.bio})
            } else {
                res.json({ success: false, message: 'Not Authenticated' })
            }
        })

    } else {
        res.json({ message: "Username Incorrect" })
    }
})


//***************************GET ALL USERS***************************//
app.get('/api/users',(req, res) => {
    models.Users.findAll({})
        .then(users => {
            res.json(users)
        })
})




//***************************ADD COMMENTS TO DATABASE***************************//

app.post('/api/addcomment:thingId', (req, res) => {
    const thingId = parseInt(req.params.thingId)
    const comment = req.body.comment
    const comments = models.Comments.build({
        comment: comment,
        postId: thingId,
    })

    comments.save()
        .then(savedComment => {
            res.json({ success: true })
        })
})


//***************************SHOW ALL COMMENTS***************************//

//Retrieve All Comments From DataBase

app.get('/api/comments', (req, res) => {
     models.Comments.findAll({
     })
        .then(comments => {
            res.json(comments)
        })
})

//***************************DELETE COMMENTS***************************//

app.delete('/api/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId)
    models.Comments.destroy({
        where: {
            id: commentId
        }
    }).then(_ => {
        res.json({ deleted: true })
    })
})


//***********************UPDATE LIKES**********************//

app.put('/api/update/:id', (req, res) => {
    const id = parseInt(req.params.id)
    models.Things.increment('score', { by: 1, where: { id: id }});
})



 //**************************SHOW ALL POSTS**************************//

//Retrieve All From DataBase

app.get('/api/things', async(req, res) => {
    await models.Things.findAll({})
        .then(things => {
            res.json(things)
        })
})


//**********Retrieve All From DataBase With Specific user_Id***********//

app.get('/api/mythings/:user_Id', authenticate,(req, res) => {
    const user_Id = parseInt(req.params.user_Id)
    models.Things.findAll({
        where: {
            user_id: user_Id
        }
    })
        .then(things => {
            res.json(things)
        })
})

//*****************ADD POSTS TO DATABASE********************//

app.post('/api/addpost', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const priority = req.body.priority
    const link = req.body.link
    const contact = req.body.contact
    const contactNumber = req.body.contactNumber
    const user_id = req.body.userId

    const thing = models.Things.build({
        name: name,
        link: link,
        contact: contact,
        description: description,
        priority: priority,
        user_id: user_id
    })

    thing.save()
        .then(savedThing => {
            res.json({ success: true, thingId: savedThing.id, user_ID: savedThing.user_id })
        })
})



//***************************DELETE POST FROM DATABASE***************************//

app.delete('/api/mythings/:thingId', (req, res) => {

    const thingId = parseInt(req.params.thingId)

    models.Things.destroy({
        where: {
            id: thingId
        }

    }).then(_ => {
        res.json({ message: "IT GONE" })
    })
})

//***************************DELETE USER***************************//

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

//***************************PUBLIC HOME PAGE (SHOW ALL PUBLIC THINGS)***************************//

//Retrieve All things From DataBase

// app.get('/api/publicthings', authenticate, async(req, res) => {
//     await models.PubliThings.findAll({})
//         .then(things => {
//             res.json(things)
//         })
// })

// //***************************ADD PUBLIC THINGS TO DATABASE***************************//

// app.post('/api/addpublicthings', (req, res) => {
//     const name = req.body.name
//     const duedate = req.body.duedate
//     const description = req.body.description
//     const priority = req.body.priority
//     const link = req.body.link
//     const contact = req.body.contact
//     const contactNumber = req.body.contactNumber
//     const user_id = req.body.userId

//     const thing = models.PubliThings.build({
//         name: name,
//         duedate: duedate,
//         description: description,
//         priority: priority,
//         link: link,
//         contact: contact,
//         contactNumber: contactNumber,
//         user_id: user_id
//     })

//     thing.save()
//         .then(savedThing => {
//             res.json({ success: true, thingId: savedThing.id, user_ID: savedThing.user_id })
//         })
// })

// //**********************DELETE THING FROM PUBLIC DATABASE***********************//

// app.delete('/api/publicthings/:thingId', (req, res) => {

//     const thingId = parseInt(req.params.thingId)

//     models.PubliThings.destroy({
//         where: {
//             id: thingId
//         }

//     }).then(_ => {
//         res.json({ message: "DELETED" })
//     })
// })

// //***************************ACCESS PROFILE PAGE***************************//

// const accounts = [
//     { accountType: 'checking', name: 'test' },
//     { accountType: 'checking', name: 'bob' },
//     { accountType: 'savings', name: 'mary' }
// ]

// app.get('/api/profile', authenticate,(req, res) => {

//     const authHeader = req.headers['authorization']
//     if (authHeader) {
//         //Seperate Token From Bearer
//         let token = authHeader.split(' ')[1]
//         console.log(authHeader)
//         console.log(token)

//         // Verify The Token and SECRET KEY
//         try {
//             const decoded = jwt.verify(token, "SECRETKEY")
//             console.log(decoded)

//             //If Token Is Decoded Takt Out Name That Was Put In the Token In Login Function
//             //Checks DB for Extracted Name

//             if (decoded) {
//                 console.log(decoded)
//                 const name = decoded.name

//                 let persistedUser = models.Users.findOne({
//                     where: {
//                         name: name,
//                     }
//                 })
//                     .then(persistedUser => {
//                         console.log(persistedUser)
//                         res.json(persistedUser)
//                     })

//                 // If decoding fails
//             } else {
//                 res.status(401).json({ success: false, message: 'No Authorization Headers Found!!!' })
//             }

//             // Error with token
//         } catch (error) {
//             res.status(401).json({ success: false, message: 'Token Has Been Tampered With!!!' })
//         }

//         // not authenticated
//     } else {
//         res.status(401).json({ success: false, message: 'No Authorization Headers Found!!!' })
//     }
// })

// //***************************GET USER INFO***************************//

// app.get('/api/user/:userId',authenticate,(req, res) => {

//     const userId = parseInt(req.params.userId)

//     models.Users.findOne({
//         where: {
//             id: userId
//         }

//     }).then(user => {
//         res.json(user)
//     })
// })


// //***************************GET MAIL***************************//
// app.get('/api/getmail/:name', authenticate,(req, res) => {
//     const userName = (req.params.name)
//     models.Mail.findAll({
//         where: {
//             priority: userName
//         }
//     })
//         .then(mail => {
//             res.json(mail)
//         })
// })
// //***************************ADD TO MAIL DATABASE***************************//

// app.post('/api/addmail', (req, res) => {
//     const name = req.body.name
//     const duedate = req.body.duedate
//     const description = req.body.description
//     const priority = req.body.priority
//     const link = req.body.link
//     const contact = req.body.contact
//     const contactNumber = req.body.contactNumber
//     const user_id = req.body.userId

//     const mail = models.Mail.build({
//         name: name,
//         duedate: duedate,
//         description: description,
//         priority: priority,
//         link: link,
//         contact: contact,
//         contactNumber: contactNumber,
//         user_id: user_id
//     })

//     mail.save()
//         .then(savedThing => {
//             res.json({ success: true})
//         })
// })

// //***************************DELETE Mail FROM DATABASE***************************//

// app.delete('/api/deletemail/:mailId',(req, res) => {

//     const mailId = parseInt(req.params.mailId)

//     models.Mail.destroy({
//         where: {
//             id: mailId
//         }

//     }).then(_ => {
//         res.json({ message: "IT GONE" })
//     })

// })
//***************************SET PORT***************************//

app.listen( process.env.PORT);
// app.listen(8080, (req, res) => {
//     console.log('Server Is Running....')