const asyncHandler  = require('express-async-handler') 
const Homework = require('../models/homeworkModel')

const getHomework = asyncHandler( async (req,res) => {
    const homework = await Homework.find()
    res.json(homework)
})

const getOneHomework = asyncHandler( async (req, res) =>{ 
    const homework = await Homework.findById(req.params.id)

    if(!homework){
        res.status(400)
        throw new Error('Homework doesn\'t exist')
    }

    const getHomework = await Homework.findById(req.params.id)

    res.send(`get 1: ${getHomework} `) })

const postHomework = asyncHandler( async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text in input')
    } 

    const homework = await Homework.create({text: req.body.text, subject: req.body.subject})
    res.json(`homework setted ${req.body.subject}`) 
})

const updateHomework = asyncHandler( async (req, res) =>{ 
    const homework = await Homework.findById(req.params.id)

    if(!homework){
        res.status(400)
        throw new Error('Homework doesn\'t exist')
    }

    const updated = await Homework.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json(`update ${req.params.id}, ${updated}`) })

const deleteHomework = asyncHandler( async (req, res) =>{ 
    const homework = await Homework.findById(req.params.id)

    if(!homework){
        res.status(400)
        throw new Error('Homework doesn\'t exist')
    }

    const deleted = await Homework.findByIdAndDelete(req.params.id)


    res.send(`delete ${deleted} `) })

    const sortedHomework = asyncHandler( async (req,res)=> {
        const sorted = await Homework.find({}).sort({"subject":1})

        res.send(sorted)
    })

    // const sortedHomework = asyncHandler( async (req,res)=> {
    //         const sorted = await Homework.aggregate([{$lookup:{
    //             from:'subjects',
    //             localField:'subject',
    //             foreignField: 'id'
    //         }}])
    
    //         res.send(sorted)
    //     })

module.exports = {
    getHomework,
    postHomework,
    updateHomework,
    deleteHomework,
    sortedHomework
}
