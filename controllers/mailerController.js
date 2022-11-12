const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (req, res) => {
    const { message } = req.body;
    const token = process.env.PW;
    const user = process.env.USER;
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
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text,
        html: `<h1>${message}</h1>`
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