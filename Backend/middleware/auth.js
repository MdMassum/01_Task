const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandler("Please Login to access this resources",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})