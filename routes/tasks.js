const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const {body, validationResult} = require('express-validator')



router.get('/', auth, async (req, res)=>{
    try {
        console.log(req.user.id);
        
        const tasks = await Task.find({user:req.user.id})
        res.json(tasks)
       
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
} ) 

router.post('/',[auth, 
        [body('name','enter valid task').not().isEmpty()]], 
    async (req, res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {name} = req.body
        try {
            const newTask = new Task({
                name,
                user:req.user.id
            })
            const task = await newTask.save()

            
            res.status(201).json(task)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    
}) 

router.put('/:id', async(req,res)=>{
    try {
        console.log(req.params);
        console.log(req.body);
        const taskField = {}
        const{id, name} = req.body

        if(name) taskField.name = name;
        if(id) taskField.id = id;
        const task = await Task.findByIdAndUpdate(req.params.id, {$set:taskField},{new:true})
        res.json(task)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
    
}) 

router.delete('/:id',async(req, res)=>{
    try {
        await Task.findByIdAndRemove(req.params.id)
        res.json({msg:'task removed'})
    } catch (err) {
        console.log(req.params);
        
        console.error(err.message);
        res.status(500).json('server error')
    }
    
} ) 



module.exports = router