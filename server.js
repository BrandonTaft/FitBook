const express = require('express');
const models = require('./models');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('./middlewares/authMiddleware');
const salt = 10;
app.use(express.json());
app.use(cors());
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const sequelize = require('sequelize');
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dxbieon3u',
    api_key: '868885289639448',
    api_secret: "OV5DS6dPJBRw2Zmqbx6MwlYNEUA"
})

require('dotenv').config();
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));

//***************************REGISTRATION PAGE***************************//

app.post('/api/register', async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const title = req.body.title
    const persistedUser = await models.Users.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', name)
        )
    })
    console.log(persistedUser)
    if (persistedUser == null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Something Went Wrong!!!" })
            } else {
                const user = models.Users.build({
                    name: name,
                    password: hash,
                    title: title,
                    isLoggedIn: false,
                })

                let savedUser = await user.save()
                if (savedUser != null) {
                    res.json({ success: true })
                }
            }
        })
    } else {
        res.json({ message: " Sorry This UserName Already Exists" })
    }
})

//***************************LOGIN PAGE***************************//

app.post('/api/login', async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    let user = await models.Users.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', name)
        )
    })
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                models.Users.update(
                    { isLoggedIn: true },
                    { where: { id: user.id } }
                )
                const token = jwt.sign({ id: user.id }, "SECRETKEY")
                res.json({ success: true, token: token, user: user })
            } else {
                res.json({ success: false, message: 'Not Authenticated' })
            }
        })
    } else {
        res.json({ message: "Username Incorrect" })
    }
})

//***************************GET CURRENT USERS***************************//
app.get('/api/current-users', authenticate, (req, res) => {
    models.Users.findAll({
        where: {
            isLoggedIn : "true"
        }
    })
        .then(users => {
            res.json(users)
        })
})


//*********************** LOGOUT **********************//
app.put('/api/logout', (req, res) => {
    // const id = parseInt(req.params.id)
    let headers = req.headers['authorization']
    if (headers) {
        try {
            const token = headers.split(' ')[1]
            const decoded = jwt.verify(token, "SECRETKEY")
            if (decoded) {
                const id = decoded.id
                const authUser = models.Users.findOne({
                    where: {
                        id: id,
                    }
                })
                if (authUser) {
                    models.Users.update(
                        { isLoggedIn: false },
                        { where: { id: id } }
                    )
                } else {
                    res.json({ error: 'Unable to authenticate' })
                    res.redirect('/')
                }
            } else {
                res.json({ error: 'Unable to authenticate' })
                res.redirect('/')
            }

        } catch { res.json({ success: false, message: 'Not Authenticated' }) }
    } else {
        res.json({ error: 'Required headers are missing...' })
        res.redirect('/')
    }
})

//***************************DELETE USER***************************//
app.delete('/api/delete-profile', (req, res) => {
    let headers = req.headers['authorization']
    if (headers) {
            const token = headers.split(' ')[1]
            const decoded = jwt.verify(token, "SECRETKEY")
            if (decoded) {
                const id = decoded.id
                models.Users.destroy({
                    where: {
                        id: id
                    }
                }).then(_ => {
                    res.json({ message: "THEY GONE" })
                })
                }
            }else {
                res.json({ error: 'Required headers are missing...' })
                res.redirect('/')
            }
})


//***************************ADD PROFILE PIC***************************//
app.put('/api/add-image', async (req, res) => {
    try {
        const fileStr = req.body.data
        const id = req.body.userId
        const uploadResponse = await cloudinary.uploader.upload(fileStr,
            {
                resource_type: "image",
                public_id: id,
                overwrite: true,
                invalidate: true,
                notification_url: "https://127.0.0.1:3000/upload-image"
            }
        )
        let secureURL = uploadResponse.secure_url
        res.json({ success: true, url: secureURL })
    } catch (error) {
        res.json({ message: error })
    }
})

//***************************GET PROFILE PIC***************************//
app.get('/api/get-image/:id', (req, res) => {
    const id = parseInt(req.params.id)
    cloudinary.search
        .expression(`public_id =${id}`)
        .execute()
        .then(result => res.json(result));
})

//***************************GET A USER***************************//
app.get('/api/users:id', (req, res) => {
    const id = parseInt(req.params.id)
    models.Users.findOne({
        where: {
            id: id
        }
    })
        .then(users => {
            res.json(users)
        })
})


//***********************UPDATE USER IMAGE**********************//
app.put('/api/update-user/:userId/:url', (req, res) => {
    const id = parseInt(req.params.userId)
    const url = req.params.url
    models.Users.update(
        {
            isLoggedIn: 'true',
            email: url
        },
        { where: { id: id } }
    )
})

//***************************ADD COMMENTS TO DATABASE***************************//
app.post('/api/addcomment:thingId', (req, res) => {
    const thingId = parseInt(req.params.thingId)
    const comment = req.body.comment
    const userId = req.body.userId
    const spare = req.body.spare
    const pic = req.body.pic
    const comments = models.Comments.build({
        comment: comment,
        userId: userId,
        spare: spare,
        postId: thingId,
        pic: pic,
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
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then(comments => {
            res.json(comments)
        })
})

//**************************DELETE COMMENTS***************************//
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
    models.Things.increment('score', { by: 1, where: { id: id } });
})

//**************************SHOW ALL POSTS**************************//
//Retrieve All From DataBase
app.get('/api/things', authenticate, (req, res) => {
    models.Things.findAll({
        order: [
            ['id', 'DESC']
        ],
    })
        .then(things => {
            res.json(things)
        })
})

//**********Retrieve All From DataBase With Specific user_Id***********//
app.get('/api/mythings/:user_Id', authenticate, (req, res) => {
    const user_Id = parseInt(req.params.user_Id)
    models.Things.findAll({
        where: {
            user_id: user_Id
        },
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
    const user_id = req.body.userId
    const title = req.body.title
    const thing = models.Things.build({
        name: name,
        link: link,
        contact: contact,
        description: description,
        priority: priority,
        score: 0,
        user_id: user_id,
        contactNumber: title
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

//***************************GET MAIL***************************//
app.get('/api/getmail/:name', authenticate, (req, res) => {
    const userName = (req.params.name)
    models.Mail.findAll({
        where: {
            priority: userName
        }
    })
        .then(mail => {
            res.json(mail)
        })
})
//***************************ADD TO MAIL DATABASE***************************//

app.post('/api/addmail', (req, res) => {
    const name = req.body.name
    const duedate = req.body.duedate
    const description = req.body.description
    const priority = req.body.priority
    const link = req.body.link
    const contact = req.body.contact
    const contactNumber = req.body.contactNumber
    const user_id = req.body.userId

    const mail = models.Mail.build({
        name: name,
        duedate: duedate,
        description: description,
        priority: priority,
        link: link,
        contact: contact,
        contactNumber: contactNumber,
        user_id: user_id
    })

    mail.save()
        .then(savedThing => {
            res.json({ success: true })
        })
})

//***************************DELETE Mail FROM DATABASE***************************//

app.delete('/api/deletemail/:mailId', (req, res) => {

    const mailId = parseInt(req.params.mailId)

    models.Mail.destroy({
        where: {
            id: mailId
        }

    }).then(_ => {
        res.json({ message: "IT GONE" })
    })

})

/******************* CHAT *******************/
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

//***************************ADD CHAT TO DATABASE***************************//
app.post('/api/savechat', (req, res) => {
    const roomId = req.body.roomId
    const body = req.body.body
    const senderId = req.body.senderId
    const name = req.body.name
    const pic = req.body.pic
    const description = req.body.description
    const chats = models.Chat.build({
        roomId: roomId,
        body: body,
        senderId: senderId,
        name: name,
        pic: pic,
        description: description,
    })
    chats.save()
        .then(savedChats => {
            res.json({ success: true })
        })
})


//***************************GET ALL CHATS***************************//

app.get('/api/getchats/:roomId', (req, res) => {
    const roomId = req.params.roomId
    models.Chat.findAll({
        where: {
            roomId: roomId
        }
    })
        .then(chats => {
            res.json(chats)
        })
})


//***********************DELETE ALL CHATS***********************//
app.delete('/api/delete-chats/:roomId', (req, res) => {
    const roomId = req.params.roomId
    models.Chat.destroy({
        where: {
            roomId: roomId
        }
    }).then(_ => {
        res.json({ deleted: true })
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


//
//***************************SET PORT***************************//


// app.listen(8080, (req, res) => {
//     console.log('Server Is Running....')
// })
httpServer.listen(8080);