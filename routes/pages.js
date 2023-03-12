const express = require('express')
const router = express.Router()
const User = require('../model/User')
const FProfile = require('../model/FProfile')
//Account security
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'adjs0asfkjkoldmokjadjasopd'



/* User.findByIdAndDelete('64089880693fe1020b6c1038')
.then((data) => {

    console.log(data)
})
.catch((error) => {
    console.log(error)
})
 */



//ROUTES
router.get("/", (req,res) => {
    res.render('index', {title:'Fitness Tracking System'})
})


router.get('/adminAcctMgt', async (req, res) => {
    try {
      const users = await User.find({})
      res.render('adminAcctMgt', {users, title: "Account Management System"})
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server error')
    }
})

router.post("/adminAcctMgt", async(req,res) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    const type = req.body.type;
    
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
    res.json({status: 'ok'})
})


router.delete('/adminAcctMgt/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.json({status: 'error', error: 'User not found'});
      }
      await user.deleteOne();
      console.log('User deleted successfully', user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }   
    res.json({status: 'ok'});
});
  
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

router.get("/fprofile", async (req, res) => {
    let decodedID = req.query.decodedID;
  
    try {
      let fprofile = await FProfile.findOne({ idFromUser: decodedID });
      if (fprofile) {
        res.render('fprofile', { title: "Fitness Profile SUCCESS", fprofile });
      } else {
        res.render('fprofile', { title: "Fitness Profile", fprofile });
      }
    } catch(error) {
      console.log(error);
      res.json({status: 'error', error: "An error occurred"});
    }
  });

  
router.post("/fprofile", async (req, res) => {
    const fullname = req.body.fullname
    const decodedID = req.body.decodedID

   
    try {
        const fprofile = await FProfile.findOneAndUpdate(
          { idFromUser: decodedID },
          { fullname },
          { upsert: true, new: true }
        );
        console.log("Fprofile data sent", fprofile);
        const data = await FProfile.find().populate('idFromUser', 'email');
        console.log(data)
        res.json({ status: 'ok', data });
    } catch(error) {
        if (error.code === 11000) {
            res.json({status: 'error', error: "Already have data"})
        } else {
            console.log(error);
            res.json({status: 'error', error: "An error occurred"});
        }
    }   
    
})

router.get("/report", (req,res) => {
    res.render('report', {title:'Report'})
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
            email: user.email,
            type: user.type
        }, 
        JWT_SECRET
    )

        return res.json({status: 'ok', data: token})

    }

    res.json({status: 'error', error: "Invalid email/password"})
})

router.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})


  
module.exports = router
