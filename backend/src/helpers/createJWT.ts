const jwt = require("jsonwebtoken");

export const createJWT = (uid: string, username: string, isAdmin: boolean) => {
  console.log("createJWT");
  return new Promise((resolve, reject) => {
    const payload = { uid, username, isAdmin };
    console.log(payload);
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
