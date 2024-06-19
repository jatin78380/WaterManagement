const { Router } = require('express');
const router = Router();
const adminMiddleware = require('../middlewares/admin');
const {AdminModel} = require("../models/AdminModel");

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

module.exports = router;