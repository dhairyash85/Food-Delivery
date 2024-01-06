const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body, validationResult}=require('express-validator')
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret="abasddsfhdfjadkjnsdfhqrtyyughjm"
router.post('/createuser',  body("email").isEmail(), body("password").isLength({min:8}),  async (req, res)=>{
   const error=validationResult(req)
   if(!error.isEmpty()){
      return res.status(400).json({errors:  error.array()})
   }

   const salt = await bcrypt.genSalt(10)
   let secPassword= await bcrypt.hash(req.body.password, salt)
     try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email: req.body.email,
            location:req.body.location
        })
        res.json({success: true})
     }catch(err){
        console.log(err)
        res.json({success: false})
     }
})

router.post('/login', body("email").isEmail(), body("password").isLength({min:8}),async (req, res)=>{
   try{
      const error=validationResult(req)
      if(!error.isEmpty()){
         return res.status(400).json({errors:  error.array()})
      }  
      let email=req.body.email;
      let userData = await User.findOne({"email":email});
      if(!userData) return res.status(400).json({errors:  "User does not exist"})
      const pwdCompare=await bcrypt.compare(req.body.password, userData.password)
      if(!pwdCompare) return res.json({errors:  "Incorrect Password"})
      const data={
         user:{
            id:userData.id
         }
      }
      const authToken=jwt.sign(data, jwtSecret)
      res.json({success: true, authToken: authToken})
   }catch(err){
      console.log(err)
      res.json({success: false})
   }
})

module.exports=router;