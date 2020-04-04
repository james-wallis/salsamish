const validateProcessEnvs = () => {
  const { DB_USERNAME, DB_PASSWORD, AUTH_SECRET } = process.env;
  if (!DB_USERNAME) throw new Error('Must provide DB_USERNAME to connect to database');
  if (!DB_PASSWORD) throw new Error('Must provide DB_PASSWORD to connect to database');
  if (!AUTH_SECRET) throw new Error('Must provide AUTH_SECRET for database validation');
};

module.exports = {
  validateProcessEnvs,
}