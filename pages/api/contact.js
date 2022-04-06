export const sendEmail = async (req, res) => {
  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'yucatannorth.adm@gmail.com',
      pass: 'PB%Vb@6@o3bn',
    },
    secure: true,
  })

  const mailData = {
    from: 'contacto@yucatannorth.com',
    to: 'fdobfajardo@gmail.com',
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