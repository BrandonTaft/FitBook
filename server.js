const express = require('express');
const app = express();
const path = require('path')
const sequelize = require('sequelize');
const models = require('./models');
const cors = require('cors');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FaceBookStrategy = require('passport-facebook').Strategy;
const authenticate = require('./middlewares/authMiddleware');
const salt = 10;
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(cors());
require('dotenv').config();
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

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
});

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize());
var session = require('express-session')
app.use(session({
    secret: 'SECRETKEY',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  }))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
passport.use(new GoogleStrategy({
    clientID: "167353375078-4l7svg4p1lb8gtoafo0nq874a6ca221o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/googleRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
))

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    console.log('done', )
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    console.log('I wont have jack shit')
    done(null, obj)
})

// OAuth Authentication, Just going to this URL will open OAuth screens
app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))

// Oauth user data comes to these redirectURLs
app.get('/googleRedirect', passport.authenticate('google'), async (req, res, next)=>{
    console.log('redirected', req.user)
    let googleUser = {
        name: req.user.displayName,
        email: req.user._json.email,
        profile_pic: req.user.photos[0].value,
        googleId: req.user.id,
        provider: req.user.provider }
    const existingUser = await models.Users.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', googleUser.name)
        )
    })
    if (existingUser == null) {
        bcrypt.hash(googleUser.googleId, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Something Went Wrong!!!" })
            } else {
                user = await models.Users.build({
                    name: googleUser.name,
                    password: hash,
                    profile_pic: googleUser.profile_pic,
                    isLoggedIn: true,
                })
                let savedUser = await user.save()
                if (savedUser != null) {
                    const token = jwt.sign({ id: user.id }, "SECRETKEY")
                //res.json({ success: true, token: token, user: user })
                res.cookie('name', user.name, {httpOnly: false});
                res.cookie('token', token, {httpOnly: false});
                res.cookie('user_Id', user.id, {httpOnly: false});
                res.cookie('profile_pic', user.profile_pic, {httpOnly: false});
                res.writeHead(302, {
                    'Location': 'http://localhost:3000/feed'
                  });
                res.end()
                }
            }
        })
    }else{
        models.Users.update(
            { isLoggedIn: true },
            { where: { id: existingUser.id } }
        )
        console.log("EXISTING", existingUser)
    const token = jwt.sign({ id: existingUser.id }, "SECRETKEY")
    res.cookie('name', existingUser.name, {httpOnly: false});
    res.cookie('token', token, {httpOnly: false});
    res.cookie('user_Id', existingUser.id, {httpOnly: false});
    res.cookie('profile_pic', existingUser.profile_pic, {httpOnly: false});
    res.writeHead(302, {
        'Location': 'http://localhost:3000/feed'
      });
    res.end()
    }
})

passport.use(new FaceBookStrategy({
    clientID: "707560370871888",
    clientSecret: "b4d29f94371876c8c1360d14bb813944",
    callbackURL: "https://localhost:8080/facebookRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("Facebook BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
))

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    console.log('I should have jack ')
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    console.log('I wont have jack shit')
    done(null, obj)
})

// OAuth Authentication, Just going to this URL will open OAuth screens
app.get('/auth/facebook',  passport.authenticate('facebook', { scope: ['profile','email'] }))

// Oauth user data comes to these redirectURLs
app.get('/facebookRedirect', passport.authenticate('facebook'), async (req, res, next)=>{
    console.log('redirected', req.user)
    let facebookUser = {
        name: req.user.displayName,
        email: req.user._json.email,
        facebookId: req.user.id,
        provider: req.user.provider }
    const existingUser = await models.Users.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', facebookUser.name)
        )
    })
    if (existingUser == null) {
        bcrypt.hash(facebookUser.facebookId, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Something Went Wrong!!!" })
            } else {
                user = await models.Users.build({
                    name: facebookeUser.name,
                    password: hash,
                    isLoggedIn: true,
                })
                let savedUser = await user.save()
                if (savedUser != null) {
                    const token = jwt.sign({ id: user.id }, "SECRETKEY")
                //res.json({ success: true, token: token, user: user })
                res.cookie('name', user.name, {httpOnly: false});
                res.cookie('token', token, {httpOnly: false});
                res.cookie('user_Id', user.id, {httpOnly: false});
                res.writeHead(302, {
                    'Location': 'http://localhost:3000/feed'
                  });
                res.end()
                }
            }
        })
    }else{
        models.Users.update(
            { isLoggedIn: true },
            { where: { id: existingUser.id } }
        )
        console.log("EXISTING", existingUser)
    const token = jwt.sign({ id: existingUser.id }, "SECRETKEY")
    res.cookie('name', existingUser.name, {httpOnly: false});
    res.cookie('token', token, {httpOnly: false});
    res.cookie('user_Id', existingUser.id, {httpOnly: false});
    res.cookie('profile_pic', existingUser.profile_pic, {httpOnly: false});
    res.writeHead(302, {
        'Location': 'http://localhost:3000/feed'
      });
    res.end()
    }
})


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

//***************************GET ALL USERS***************************//
app.get('/api/all-users', (req, res) => {
    console.log("iran")
    models.Users.findAll({})
        .then(users => {
            res.json(users)
        })
})

//***************************GET ALL USERNAMES***************************//
app.get('/api/all-usernames', authenticate, (req, res) => {
    models.Users.findAll({})
        .then(users => {
            let userNames = [];
            users.map((user) => {
                userNames.push(user.name)
            })
            res.json(userNames)
        })
})

//***************************GET LOGGED IN USERS***************************//
app.get('/api/logged-in-users', authenticate, (req, res) => {
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
                    res.clearCookie()
                    res.end()
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
            profile_pic: url
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
app.get('/api/myposts/:user_Id', authenticate, (req, res) => {
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
    const poster = req.body.poster
    const link = req.body.link
    const user_id = req.body.userId
    const title = req.body.title
    const thing = models.Things.build({
        name: name,
        link: link,
        description: description,
        poster: poster,
        score: 0,
        user_id: user_id,
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
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('sendTo')),
            sequelize.fn('lower', userName)
        )
    })
        .then(mail => {
            res.json(mail)
        })
})
//***************************ADD TO MAIL DATABASE***************************//

app.post('/api/addmail', (req, res) => {
    const name = req.body.name
    const duedate = req.body.duedate
    const message = req.body.message
    const sendTo = req.body.sendTo
    const link = req.body.link
    const sender = req.body.sender
    const contactNumber = req.body.contactNumber
    const user_id = req.body.userId

    const mail = models.Mail.build({
        name: name,
        duedate: duedate,
        message: message,
        sendTo: sendTo,
        link: link,
        sender: sender,
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

app.get('/api/getchats/:roomId', authenticate, (req, res) => {
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
//     const poster = req.body.poster
//     const link = req.body.link
//     const contact = req.body.contact
//     const contactNumber = req.body.contactNumber
//     const user_id = req.body.userId

//     const thing = models.PubliThings.build({
//         name: name,
//         duedate: duedate,
//         description: description,
//         poster: poster,
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
httpServer.listen(process.env.PORT || 8080);