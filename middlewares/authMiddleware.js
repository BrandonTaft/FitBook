const models = require('../models')
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    // validate the token 
    // let headers = req.headers['authorization']
    // if (headers) {
    //     try {
    //         const token = headers.split(' ')[1]
    //         const decoded = jwt.verify(token, "SECRETKEY")
    //         if (decoded) {
    //             const id = decoded.id
    //             const authUser = models.Users.findOne({
    //                 where: {
    //                     id: id,
    //                 }
    //             })
    //             if (authUser) {
    //                 req.authUser = id
    //                 console.log("User Is Authenticated")
    //                 next() 
    //             } else {
    //                 res.json({  success: false, error: 'Unable to authenticate' })
    //                 res.redirect('/')
    //             }
    //         } else {
    //             res.json({  success: false, error: 'Unable to authenticate' })
    //             res.redirect('/')
    //         }
    //     } catch { res.json({ success: false, message: 'Not Authenticated' }) }
    // } else {
    //     res.json({  success: false, error: 'Required headers are missing...' })
    //     res.redirect('/')
    // }
    next()
}

module.exports = authenticate