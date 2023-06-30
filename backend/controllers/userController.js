const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: email,
            type: user.type,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid data')
    }

})

const registerUser = asyncHandler(async(req, res) => {
    const {name, surname, email, password,type } = req.body

    if(!name || !surname || !email || !password || !type){
        res.status(400)
        throw new Error('Add everyting')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User exist with this email')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        surname,
        email,
        password: hashPass,
        type
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: email,
            type: type,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user')
    }

})



const meUser =asyncHandler(async (req, res) => {
    const {_id, name, surname, type, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        surname,
        email,
        type
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    meUser
}