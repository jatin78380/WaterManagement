// const express = require('express')
// const bcrypt = require ('bcrypt')
// const router = express.Router();
// import {User} from '../models/User.js'
// import jwt from 'jsonwebtoken'
// router.post('/register',async(req,res)=>{
//     const{email,password} = req.body;
//     const user = await User.findOne({email})
//     if(user){
//         return res.json({message: "User already exists"})
//     }
//     const hashedPassword = await bcrypt.hash(password,10)
//     const newUser = new User({
//         email,
//         password:hashedPassword,
//     })
//     await newUser.save()
//     return res.json({status: true, message:"record registered"})
// })

// router.post('/login', async (req,res)=>{
//     const {email,password} = req.body;
//     const user = await User.findOne({email})
//     if(!user) {
//         return res.json({message:"User is not registered"})
//     }
//     const validPassword = await bcrypt.compare(password,user.password)
//     if(!validPassword){
//         return res.json({message:"Invalid password"})
//     }
//     const token = jwt.sign({username: user.username},process.env.KEY,{expiresIn: '1h'})
//     res.cookie('token',token,{httpOnly: true, maxAge: 360000})
//     return res.json({status: true, message:"login successful"})
// })
// const verifyUser =async (req,res,next)=>{
//     try{
//         const token = req.cookies.token;
//         if(!token){
//             return res.json({status: false, message: "Not authorized"})
//         }
//     const decoded =  jwt.verify(token,process.env.KEY)
//     next()
//     }
//     catch(err) {
//         return res.json(err)
//     }
    

// }
// router.get('/verify',(req,res)=>{
//     return res.json({status: true, message:"authorized"})
   
// })


// export {router as UserRouter}