const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const validateProcessEnvs = () => {
  const requiredEnvs = ['DB_USERNAME', 'DB_PASSWORD', 'AUTH_SECRET', 'EMAIL_USERNAME', 'EMAIL_PASSWORD', 'REDIRECT_URL', 'AWS_ACCESS_KEY', 'AWS_SECRET_KEY'];
  const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
  if (missingEnvs.length > 0) throw new Error(`Missing required environment variables: ${missingEnvs}`);
};

const usePasswordHashToMakeToken = (user) => {
  const { _id: userID, name, password } = user;
  const secret = password + "-" + name;
  const token = jwt.sign({ userID }, secret, {
    expiresIn: 3600 // 1 hour
  })
  return token
}

const decodeUserIDFromToken = (user, token) => {
  const { name, password } = user;
  const secret = password + "-" + name;
  return jwt.verify(token, secret);
}

const getPasswordResetURL = (protocol, user, token) => {
  const { REDIRECT_URL } = process.env;
  return `${protocol}://${REDIRECT_URL}/reset-password/${user._id}/${token}`;
}

const sendEmail = (emailTemplate) => {
  const { EMAIL_USERNAME: user, EMAIL_PASSWORD: pass } = process.env;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    }
  });
  return transporter.sendMail(emailTemplate);
}

const sendResetPasswordEmail = (user, url) => {
  const { EMAIL_USERNAME } = process.env;
  const { name, email } = user;
  const from = `Salsa Mish Admin <${EMAIL_USERNAME}>`
  const to = `${name} <${email}>`
  const subject = "Salsa Mish Admin password reset"
  const html = `
  <p>Hey ${name},</p>
  <p>You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  `
  return sendEmail({ from, to, subject, html });
}

module.exports = {
  validateProcessEnvs,
  usePasswordHashToMakeToken,
  decodeUserIDFromToken,
  getPasswordResetURL,
  sendResetPasswordEmail,
}