import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API);

async function sendEmail(req, res) {
  
  try {
    const { name, lastName, email, phone, message, location } = req.body
    const response = await sendgrid.send({
      to: `asesor.fernandoberzunza@gmail.com`,
      from: "yucatannorth.adm@gmail.com", // your website email address here
      subject: `Nuevo mensaje de Yucatán North Web`,
      html: `
        <div>
          <p>Nuevo mensaje de: ${name} ${lastName} <${email}> </p>
          <p>${phone}</p>
          <p>Enviado desde: ${location}</p>
          <br />
          <p>Mensaje: </p>
          <p>${message}</p>
        </div>
      `,
    });
    res.status(200).json(response)
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export default sendEmail;