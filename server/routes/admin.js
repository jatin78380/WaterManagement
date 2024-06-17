const { Router } = require('express');
const router = Router();
const adminMiddleware = require('../middlewares/admin');
const {Admin} = require("../models/admin");
router.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password; 
    Admin.create({
        username,
        password
    })
    res.json({
        msg: "Admin created successfully"
    })
})
module.exports = router;