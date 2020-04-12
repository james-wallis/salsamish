const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const validateProcessEnvs = () => {
  const { DB_USERNAME, DB_PASSWORD, AUTH_SECRET, EMAIL_USERNAME, EMAIL_PASSWORD, REDIRECT_URL } = process.env;
  if (!DB_USERNAME) throw new Error('Must provide DB_USERNAME to connect to database');
  if (!DB_PASSWORD) throw new Error('Must provide DB_PASSWORD to connect to database');
  if (!AUTH_SECRET) throw new Error('Must provide AUTH_SECRET for database validation');
  if (!EMAIL_USERNAME) throw new Error('Must provide EMAIL_USERNAME for sending emails');
  if (!EMAIL_PASSWORD) throw new Error('Must provide EMAIL_PASSWORD for sending emails');
  if (!REDIRECT_URL) throw new Error('Must provide REDIRECT_URL for redirecting back to the application');
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