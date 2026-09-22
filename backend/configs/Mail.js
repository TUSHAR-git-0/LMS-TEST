import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const baseOptions = {
  from: process.env.EMAIL,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
}

const configs = [
  { host: "smtp.gmail.com", port: 465, secure: true },
  { host: "smtp.gmail.com", port: 587, secure: false, requireTLS: true },
]

const sendMail = async (to, otp) => {
  let lastError
  for (const config of configs) {
    const transporter = nodemailer.createTransport({ ...baseOptions, ...config })
    try {
      return await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password",
        html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>`
      })
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

export default sendMail