const { Router } = require('express');
const router = Router();
const adminMiddleware = require('../middlewares/admin');
const {AdminModel} = require("../models/AdminModel");
const { ConfigurationModel } = require('../models/Configuration');

router.post('/signup',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password; 
    AdminModel.create({
        email,
        password
    })
    res.json({
        message: "Admin created successfully"
    })
   
})
router.post("/configuration",(req,res)=>{

    const tankname= req.body.tankname;
    const tankcapacity= req.body.tankcapacity;
    const tanklocation= req.body.tanklocation;
    const threshold = req.body.threshold;
    ConfigurationModel.create({
        tankname,
        tankcapacity,
        tanklocation,
        threshold
    })
    res.json({
        message: "Configuration details saved successfully"
    })
})

module.exports = router;