const express = require('express')
const router = express.Router()
const User = require('../model/user')
//Account security
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//ROUTES
router.get("/", (req,res) => {
    res.render('index', {title:'Fitness Tracking System'})
})

router.get("/adminAcctMgt", (req,res) => {
    res.render('adminAcctMgt', {title:'Account Management'})
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

    res.json({status: 'error', error: "Invalid email/password"})
})

router.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})


module.exports = router