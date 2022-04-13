export const sendEmail = async (req, res) => {
  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
    secure: true,
  })

  const mailData = {
    from: process.env.NEXT_PUBLIC_SMTP_FROM,
    to: process.env.NEXT_PUBLIC_SMTP_TO,
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }

  transporter.sendMail(mailData, (err, info) => {
    console.log({info, err});
    if (err) {
      res.status(500).json({ name: 'John Doe' })
    } else {
      res.send(info)
    }
  })
}

export default sendEmail