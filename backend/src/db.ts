import mongoose, { ConnectOptions } from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("DB online");
  } catch (err) {
    console.log(err);
    throw new Error("Error trying to connect to the DB");
  }
};
