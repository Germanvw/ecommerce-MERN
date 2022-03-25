import mongoose, { ConnectOptions } from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("DB online");
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectarse con la DB");
  }
};
