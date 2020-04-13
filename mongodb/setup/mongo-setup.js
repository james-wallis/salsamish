const { DB_USERNAME, DB_PASSWORD } = process.env;

db.createUser(
  {
    user: DB_USERNAME,
    pwd: DB_PASSWORD,
    roles: [
      {
        role: "readWrite",
        db: "salsamish"
      }
    ]
  }
);

