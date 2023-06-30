const asyncHandler  = require('express-async-handler') 
const Subject = require('../models/subjectModel')

const getSubject = asyncHandler( async (req,res) => {
    const subject = await Subject.find()
    res.json(subject)
})


const postSubject = asyncHandler( async (req, res) =>{
    if(!req.body.name){
        res.status(400)
        throw new Error('please add text in input')
    } 

    const subject = await Subject.create({name: req.body.name})
    res.json(`Subject setted ${subject}`) 
})

const updateSubject = asyncHandler( async (req, res) =>{ 
    const subject = await Subject.findById(req.params.id)

    if(!subject){
        res.status(400)
        throw new Error('Subject doesn\'t exist')
    }

    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json(`update ${req.params.id}, ${updated}`) })

const deleteSubject = asyncHandler( async (req, res) =>{ 
    const subject = await Subject.findById(req.params.id)

    if(!subject){
        res.status(400)
        throw new Error('Subject doesn\'t exist')
    }

    const deleted = await Subject.findByIdAndDelete(req.params.id)


    res.send(`delete ${deleted} `) })



    const sortedSubjects = asyncHandler( async (req,res)=> {
        const sorted = await Subject.aggregate([
        {$lookup: {from:"homeworks",localField:"name", foreignField:"subject", as: "homework"}}
    ]).sort({"subject":1})

        res.send(sorted)
    })
   

module.exports = {
    getSubject,
    postSubject,
    updateSubject,
    deleteSubject,
    sortedSubjects
}
