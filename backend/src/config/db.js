import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`.red.bold);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;