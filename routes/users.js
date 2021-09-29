const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator')
const config = require('config');
const User = require('../models/User')


router.post('/',[
    body('name', 'Please Insert Name').not().isEmpty(),
    body('email', 'Please Enter Valid Email').isEmail(),
    body('password', 'Password Must Have 8 Or More Characters').isLength({min:8})
], 
    async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return  res.status(400).json({errors:errors.array()})
        }
        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({email})
            if(user){
                return res.status(400).json({msg:'user already exists'})
            }
            user = new User ({
            name,
            email,
            password
          })

          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(password, salt)
          await user.save();

          const payload = {
              user:{
                  id:user.id
              }
          }
          jwt.sign(payload, config.get('jwtSecret'),{
              expiresIn:360000
          }, (err, token)=>{
              if(err) throw(err);
              res.json({token})
          });

        }catch(err){
            console.error(err.message);
            res.status(500).send('server error')
        }

});


module.exports = router;