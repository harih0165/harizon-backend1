const mailer = require("nodemailer")

const sendEmail = async option =>{
    const transport ={
        host : process.env.SMTP_HOST,
        port :process.env.SMTP_PORT,
        auth :{
            user:process.env.SMTP_AUTH_USER,
            pass:process.env.SMTP_AUTH_PASS
        }
    }
   const transporter = mailer.createTransport(transport)
   const message ={
    from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: option.email,
    subject:option.subject,
    text:option.message

   }

    await transporter.sendMail(message)
}

module.exports = sendEmail