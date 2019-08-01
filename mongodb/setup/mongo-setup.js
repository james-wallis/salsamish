db.createUser(
  {
    user: "salsa",
    pwd: "example",
    roles: [
      {
        role: "readWrite",
        db: "salsamish"
      }
    ]
  }
);