const User = require('../models/userModel')
const Errorhandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/jwtToken')

// creating a user --> 
exports.createUser = catchAsyncError(async(req,res) =>{

    const{name,email,password} = req.body;
    
    let user = await User.create({
        name,email,password,
    });
    const {password:pass, ...rest} = user._doc;  // for removing password field and sending rest 

    sendToken(user,201,res);   // generates and saves token in cookies
    res.status(200).json({
        success:true,
        rest
    });
})

// user login
exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const{email,password} = req.body;

    if(!email || !password){  // if entered empty email or password
        return next(new Errorhandler("Please Enter Email or Password",400))
    }

    let user = await User.findOne({email}).select("+password");
    
    if(!user){    // if user not found with this mail
        return next(new Errorhandler("Invalid Email Or Password !!!",401));
    }
    const passwordComp = await bcrypt.compare(password,user.password);
    console.log(passwordComp);
    if(!passwordComp){     // if password does not matches
        return next(new Errorhandler("Invalid Email Or Password !!!",401))
    }
    sendToken(user,200,res);   // generates and saves token in cookies
})

// user logout -->
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out Succeccfully"
    })
})

// get all users  -->
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    const totalResult = await User.countDocuments();
    if(!users){
        return next(new Errorhandler(`No User Exist`,404))
    }
    res.status(200).json({
        success:true,
        totalResult,
        users
    })
})

// get single user Details -->
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})


// Delete user -->
exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    await User.findByIdAndDelete(user.id)
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})

// update user password -->
exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const{oldPassword,newPassword,confirmPassword} = req.body;

    //finding the login user details
    const user = await User.findById(req.params.id).select('+password');

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }

    //comparing password entered -->
    const passComp = await bcrypt.compare(oldPassword,user.password);
    if(!passComp){
        return next(new Errorhandler("Old Password Entered is Incorrect",400));
    }
    if(newPassword != confirmPassword){
        return next(new Errorhandler("Password Mismatch",400))
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
    })
})

// update user profile except password -->
exports.updateUser = catchAsyncError(async(req,res,next)=>{

    const newUser = {
        name:req.body.name,
    }

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }

    await User.findByIdAndUpdate(req.params.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })
})
