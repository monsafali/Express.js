const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 5 * 60,
    },
  },
  { timestamps: true }
);

// Function to send emails

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification email from study Notion",
      otp
    );
    console.log("Email send successfuly", mailResponse);
  } catch (error) {
    console.log(`error occured while sending mail`, error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
