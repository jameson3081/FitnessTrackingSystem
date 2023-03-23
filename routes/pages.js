const express = require('express')
const router = express.Router()
const User = require("./User")
const FProfile = require("./FProfile")
const FLog = require("./FLog")
//Account security
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
/* const { findById, findByIdAndUpdate } = require('../model/FLog') */
const JWT_SECRET = 'adjs0asfkjkoldmokjadjasopd'


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

    // Delete all documents with idFromUser = userId from FProfile collection
    await FProfile.deleteOne({idFromUser: userId});

    // Delete all documents with idFromUser = userId from FLog collection
    await FLog.deleteOne({idFromUser: userId});

    // Delete the user with userId from User collection
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

router.post("/submit", async (req, res) => {
  const flogId = req.body.flogId;
  const grade = req.body.grade;
  const feedback = req.body.feedback;

  try {
    const result = await FLog.findOneAndUpdate(
      { idFromUser: flogId },
      { $set: { grade, feedback } },
      { upsert: true, new: true }
    );
    console.log(result);
    res.json({ status: "ok", data: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "An error occurred" });
  }
});

router.get("/flog", async(req,res) => {
  let decodedID = req.query.decodedID;
  let data = [];

  try {
    const fprofiles = await FProfile.find().select("idFromUser fullname section").populate('idFromUser', 'type')

    data = await Promise.all(fprofiles.map(async (fprofile) => {
      let flog = await FLog.findOne({ idFromUser: fprofile.idFromUser._id });
      return { 
        idFromUser: fprofile.idFromUser, 
        fullname: fprofile.fullname,
        section: fprofile.section, 
        type: fprofile.idFromUser.type,
        grade: flog ? flog.grade: "",
        feedback: flog ? flog.feedback : "" // add feedback property to data object
      };
    }));

    const uniqueSections = [...new Set(data.map(fprofile => fprofile.section))];

    let filteredData = data;
    const section = req.query.section;
    if (section) {
      filteredData = data.filter(item => item.section === section);
    }

    let flog = await FLog.findOne({ idFromUser: decodedID });
    if (flog) {
      res.render("flog", { title: "Fitness Log With Data", flog, data: filteredData, uniqueSections });
    } else {
      res.render("flog", { title: "Fitness Log", flog, data: filteredData, uniqueSections });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "An error occurred" });
  }
});


router.post("/flog", async (req, res) => {
    const sleepTime = req.body.sleepTime
    const wakeTime = req.body.wakeTime
    const sleepHours = req.body.sleepHours
    const wakeAmt = req.body.wakeAmt
    const moodOptions = req.body.moodOptions
    const typeOfPa1 = req.body.typeOfPa1
    const typeOfPa2 = req.body.typeOfPa2
    const typeOfPa3 = req.body.typeOfPa3
    const typeOfPa4 = req.body.typeOfPa4
    const typeOfPa5 = req.body.typeOfPa5
    const intensity1 = req.body.intensity1
    const intensity2 = req.body.intensity2
    const intensity3 = req.body.intensity3
    const intensity4 = req.body.intensity4
    const intensity5 = req.body.intensity5
    const physicalAct1 = req.body.physicalAct1
    const physicalAct2 = req.body.physicalAct2
    const physicalAct3 = req.body.physicalAct3
    const physicalAct4 = req.body.physicalAct4
    const physicalAct5 = req.body.physicalAct5
    const duration1 = req.body.duration1
    const duration2 = req.body.duration2
    const duration3 = req.body.duration3
    const duration4 = req.body.duration4
    const duration5 = req.body.duration5
    const calorieBurned1 = req.body.calorieBurned1
    const calorieBurned2 = req.body.calorieBurned2
    const calorieBurned3 = req.body.calorieBurned3
    const calorieBurned4 = req.body.calorieBurned4
    const calorieBurned5 = req.body.calorieBurned5
    const numSteps = req.body.numSteps
    const totalCaloriesBurned = req.body.totalCaloriesBurned
    const foodTime1 = req.body.foodTime1
    const foodTime2 = req.body.foodTime2
    const foodTime3 = req.body.foodTime3
    const foodTime4 = req.body.foodTime4
    const foodTime5 = req.body.foodTime5
    const meal1 = req.body.meal1
    const meal2 = req.body.meal2
    const meal3 = req.body.meal3
    const meal4 = req.body.meal4
    const meal5 = req.body.meal5
    const beverage1 = req.body.beverage1
    const beverage2 = req.body.beverage2
    const beverage3 = req.body.beverage3
    const beverage4 = req.body.beverage4
    const beverage5 = req.body.beverage5
    const totalCalories1 = req.body.totalCalories1
    const totalCalories2 = req.body.totalCalories2
    const totalCalories3 = req.body.totalCalories3
    const totalCalories4 = req.body.totalCalories4
    const totalCalories5 = req.body.totalCalories5
    const overallFoodCalories = req.body.overallFoodCalories
    const deficitOrSurplus = req.body.deficitOrSurplus
    const decodedID = req.body.decodedID

    try {
        const flog = await FLog.findOneAndUpdate(
          { idFromUser: decodedID },
          { sleepTime, wakeTime, sleepHours, wakeAmt, moodOptions, typeOfPa1, typeOfPa2, typeOfPa3, typeOfPa4, typeOfPa5, intensity1, intensity2, intensity3, intensity4, intensity5, physicalAct1, physicalAct2, physicalAct3, physicalAct4, physicalAct5, duration1, duration2, duration3, duration4, duration5, calorieBurned1, calorieBurned2, calorieBurned3, calorieBurned4, calorieBurned5, numSteps, totalCaloriesBurned, foodTime1, foodTime2, foodTime3, foodTime4, foodTime5, meal1, meal2, meal3, meal4, meal5, beverage1, beverage2, beverage3, beverage4, beverage5, totalCalories1, totalCalories2, totalCalories3, totalCalories4, totalCalories5, overallFoodCalories, deficitOrSurplus  },
          { upsert: true, new: true }
        );
        console.log("Flog data sent", flog);
        const data = await FLog.find().populate('idFromUser', 'email');
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


router.get("/fprofile", async (req, res) => {
    let decodedID = req.query.decodedID;
    let data = [];

    try {
      const fprofiles = await FProfile.find().select("idFromUser fullname").populate('idFromUser', 'type')

      data = fprofiles.map((fprofile) => {
        return { idFromUser: fprofile.idFromUser, fullname: fprofile.fullname, type: fprofile.idFromUser.type};
      });
      //RENDERING PAGE WITH DECODED ID IN URL
      let fprofile = await FProfile.findOne({ idFromUser: decodedID });
      if (fprofile) {
        res.render("fprofile", { title: "Fitness Profile With Data", fprofile, data });
      } else {
        res.render("fprofile", { title: "Fitness Profile", fprofile, data });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "An error occurred" });
    }
  });

  
router.post("/fprofile", async (req, res) => {
    const classNumber = req.body.classNumber
    const fullname = req.body.fullname
    const section = req.body.section
    const sex = req.body.sex
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight
    const bmi = req.body.bmi
    const bmr = req.body.bmr
    const act = req.body.act
    const goal = req.body.goal
    const time = req.body.time
    const kg = req.body.kg
    const goalKcal = req.body.goalKcal
    const decodedID = req.body.decodedID

   
    try {
        const fprofile = await FProfile.findOneAndUpdate(
          { idFromUser: decodedID },
          { classNumber, fullname, section, sex, age, height, weight, bmi, bmr, act, goal, time, kg, goalKcal },
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

router.get("/report", async (req, res) => {
  const selectedSection = req.query.section;
  let reportData = [];
  
  try {
    // Fetch the data from the database
    reportData = await FProfile.find({ section: selectedSection });
    let logSection = await FLog.find({});

    
    // Render the report template with the filtered data
    res.render("report", { title: "Report with Data", section: selectedSection, reportData, logSection });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "An error occurred" });
  }
});

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
