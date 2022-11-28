const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (req, res) => {
    const { email, subject, text, periodoBaneo, motivoBaneo, publicacion } = req.body;
    const token = process.env.PW;
    const user = process.env.USUARIO;

    if (!token) {
        return res.status(400).send({ message: "No se ha definido la contraseña" })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: token
        }
    })

    const mailOptions = {
        from: `Admin <${user}>`,
        to: email,
        subject: subject,
        text: text,
        html: `
        <p>Querido usuario se le informa que usted ha sido baneado del sistema, los detalles los puede encontrar a acontinuación.</p>
        <p>Periodo ${periodoBaneo}</p>
        <p>Motivo: ${motivoBaneo}</p>
        <br>
        <p>Publicación: </p>
        <p>${publicacion}</p>`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            return res.status(400).send({ message: "Error al enviar el correo" })
        }
        return res.status(200).send({ message: "Correo enviado" })
    })

    transporter.verify().then(() => {
        console.log('Servidor de correos habilitado');
    }).catch((err) => {
        console.log(err);
    })
}

module.exports =sendMail;