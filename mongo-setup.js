const { MONGO_NON_ROOT_USERNAME, MONGO_NON_ROOT_PASSWORD } = process.env;

// db.createUser(
//   {
//     user: MONGO_NON_ROOT_USERNAME,
//     pwd: MONGO_NON_ROOT_PASSWORD,
//     roles: [
//       {
//         role: "readWrite",
//         db: "salsamish"
//       }
//     ]
//   }
// );

// db.auth('admin-user', 'admin-password')

// db = db.getSiblingDB('salsamish')

// db.createUser({
//   user: MONGO_NON_ROOT_USERNAME,
//   pwd: MONGO_NON_ROOT_PASSWORD,
//   roles: [
//     {
//       role: 'root',
//       db: 'salsamish',
//     },
//   ],
// });
