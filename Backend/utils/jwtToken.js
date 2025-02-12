// creating token and storing in cookies (not in local storage -->because that can be accessed)

const sendToken = (user,statusCode,res) =>{

    const token = user.getJWTtoken();

    //options for cookie -->
    const options = {
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    }

    // sending response
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}
module.exports = sendToken