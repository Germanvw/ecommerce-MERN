const jwt = require("jsonwebtoken");

export const createJWT = (uid: string, username: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "24h",
      },
      (err: any, token: string) => {
        if (err) {
          console.log(err);
          reject("Cannot generate token");
        }

        resolve(token);
      }
    );
  });
};
