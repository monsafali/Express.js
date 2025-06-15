import Razorpay from "razorpay";
import crypto from "crypto"; // for signature verification

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
