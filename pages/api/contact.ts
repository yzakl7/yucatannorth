import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(`${process.env.NEXT_PUBLIC_SENDGRID_API}`);

async function sendEmail(req:any, res:any) {
  
  try {
    console.log("REQ.BODY", req.body);
    const { name, lastName, email, phone, message, location } = req.body
    const response = await sendgrid.send({
      to: `refaccionessolis@gmail.com`,
      from: "refaccionessolisweb@noreply.com", // your website email address here
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
  } catch (error:any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export default sendEmail;