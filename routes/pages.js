const express = require('express')
const router = express.Router()
const User = require('../model/user')
const Profile = require('../model/fprofile_model')
//Account security
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'adjs0asfkjkoldmokjadjasopd'
/* Profile.findOne({classNumber: 21})
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
}) */

//ROUTES
router.get("/", (req,res) => {
    res.render('index', {title:'Fitness Tracking System'})
})
router.get('/adminAcctMgt', async (req, res) => {
    try {
      const users = await User.find()
      res.render('adminAcctMgt', {users})
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server error')
    }
  })
  
router.post("/adminAcctMgt", async(req,res) => {
    const {email, password: plainTextPassword} = req.body
   
   /*  const email = req.body.email;
       const plainTextPassword = req.body.password; (Long version of upper part)*/ 
    
    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error:"Password too short"})
    }

    const password = await bcrypt.hash(plainTextPassword, 3)

    try {
        const response = await User.create({
            email,
            password
        })
        console.log("User created successfully", response)
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error: "Email already in use"})
        }
        throw error
    }

    res.json({status: 'ok'})
})

router.get("/adminFlog", (req,res) => {
    res.render('adminFlog', {title:'Manage Fitness Log'})
})

router.get("/adminFprofile", (req,res) => {
    res.render('adminFprofile', {title:'Manage Fitness Profile'})
})

router.get("/adminSignedIn", (req,res) => {
    res.render('adminSignedIn', {title:'Account'})
})

  
router.get("/flog", (req,res) => {
    res.render('flog', {title:'Fitness Log'})
})


router.get("/fprofile", (req,res) => {
    res.render('fprofile', {title:'Fitness Profile'})
    console.log(newToken)
})

router.post("/fprofile", (req, res) => {
    

})

router.get("/report", (req,res) => {
    res.render('report', {title:'Report'})
})

router.get("/signedIn", (req,res) => {
    res.render('signedIn', {title:'Account'})
})

router.get("/signIn", (req,res) => {
    res.render('signIn', {title:'Sign In Your Account'})
})

router.post('/signIn', async(req, res) => {
    
    const {email, password} = req.body
    const user = await User.findOne({email}).lean()
    if(!user) {
        return res.json({status: 'error', error: "Invalid email/password"})
    }
    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, 
        JWT_SECRET
    )

        return res.json({status: 'ok', data: token,})
    
        return res.json({status: 'ok', data: token})

    }

    res.json({status: 'error', error: "Invalid email/passwords"})
})

router.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})


  
module.exports = router
