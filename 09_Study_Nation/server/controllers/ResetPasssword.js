const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")

// Reset Password Token
exports.resetPasswordToken = async (req, res) => {
 try {
     // get email from req body
     const email = req.body.email,
     // Check user for this email, email validation
     const user = await User.findOne({email: email})
     if(!user){
       return res.json({
           success: false,
           message: "Your email is not registerd with us"
       })
     }
     //generate Token
     const token = crypto.randomUUID();
     //   update user by addint token and expiration time
     const updatedDetails = await User.findByIdAndUpdate({email: email},{
       token: token,
       resetPasswordExpires: Date.now()+5*60*1000
     })
     // Create url
      const url = `http://localhost:3000/update-password/${token}`;
     // Send a mail containin the url
     await mailSender(email, "password Reset Link",`Password Reset Link ${url}`)
     // Return url
     return res.json({
       success: true,
       message: "Email SEnd successfuly please check email and change password"
     })
   
 } catch (error) {
    console.log(error)
      return res.status(500).json({
       success: true,
       message: "Somethign went wrong whilt reset pwd main"
     })
 }
 
};

// ResetPassword

exports.resetPassword = async(req, res)=>{
try {
    // fetch Data
    const {password, confirmPassword} = req.body

    

    // Validation 
    if(password !== confirmPassword){
        return res.json({
            success: false,
            message: "passwod jnto match"
        })
    }
    // Get userdeetails from db usign token 
    const userDetails = await user.findOne({token: token})

    // If no entry -invlaid token
    if(!userDetails){
        return res.json({
            success: false,
            message: "Token is invalid"
        })
    }
    // Token time check
    if(userDetails.resetPasswordExpires > Date.now()){
        return res.json({
            success: false,
            message: "Token is expired, please regenerate your token"
        })

    }
    // hash Pwd
    const hashedpassword = await bcrypt.hash(password,10)
    await User.findOneAndUpdate(
        {
            token: token
        },
        {
            password: hashedpassword
        },
        {
            new: true
        }
    )
    // password update
    // return respone
    return res.status(200).json({
        succes: true,
        message: "Password reset successuly"
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({
        success: false,
        message: "Somethign went wrong while reseting password "
    })
}
}