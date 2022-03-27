const jwt = require("jsonwebtoken");

interface userData {
  uid: string;
  username: string;
  email: string;
  gender: string;
  picture: string;
  isAdmin: boolean;
}

export const createJWT = (user: userData) => {
  return new Promise((resolve, reject) => {
    const payload = { user };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "24h",
      },
      (err: any, token: string) => {
        if (err) {
          reject("Cannot generate token");
        }

        resolve(token);
      }
    );
  });
};
