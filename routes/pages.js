const express = require('express')
const router = express.Router()
const User = require('../model/user')
const Profile = require('../model/fprofile_model')
//Account security
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'adjs0asfkjkoldmokjadjasopd'

/* User.find({})
.then((data) => {
    for (let i = 0; i < data.length; i++)
    console.log(data[0].email)
})
.catch((error) => {
    console.log(error)
})
 */

//ROUTES
router.get("/", (req,res) => {
    res.render('index', {title:'Fitness Tracking System'})
})

router.get("/adminAcctMgt", async(req,res) => {
    try {
        const accounts = await User.find({}, 'email type');
        // Render template with accounts
        res.render('adminAcctMgt', {title:'Account Management', accounts: accounts});
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }

})

router.post("/adminAcctMgt", async(req,res) => {
    const {email, password: plainTextPassword, type} = req.body
   
   /*  const email = req.body.email;
       const plainTextPassword = req.body.password; (Long version of upper part)*/ 
    
    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error:"Password too short"})
    }

    const password = await bcrypt.hash(plainTextPassword, 3)

    try {
        const response = await User.create({
            email,
            password,
            type
        })
        console.log("User created successfully", response)
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error: "Email already in use"})
        }
        throw error
    }

    /* res.json({status: 'ok', userData: await User.find({})
    .then((data) => {
        for (let i = 0; i < data.length; i++)
        console.log(data[0].email)
    })
    .catch((error) => {
        console.log(error)
    })})
 */
    try {
        const userData = await User.find({});
        
        res.json({status: 'ok', userData: userData});
      } catch (error) {
        console.log(error);
        res.json({status: 'error', error: error});
      }

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
    res.render('fprofile', {title: 'Fitness Profile' });
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

        return res.json({status: 'ok', data: token})

    }

    res.json({status: 'error', error: "Invalid email/passwords"})
})

router.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})


  
module.exports = router
